import amqp from "amqplib";
import { z } from "zod";
import { env } from "~/env";

const connection = await amqp.connect(env.AMQP_URL, {
  credentials: amqp.credentials.plain(env.AMQP_USER, env.AMQP_PASS),
});

// this is copy pasted from queueRunner.ts
// make sure it stays synced
const jsonSchema = z.object({
  id: z.string(),
  lang: z.enum(["js", "py"]),
  tests: z.array(
    z.object({
      input: z.array(z.union([z.string(), z.number()])),
      expected: z.union([z.string(), z.number()]),
    }),
  ),
  submission: z.string(),
});

const resultSchema = z.array(
  z
    .object({
      name: z.string().min(1),
      passed: z.boolean(),
      // msg if not passed
      msg: z.string().optional(),
    })
    .refine((val) => val.passed || val.msg !== undefined, {
      message: "msg is required if passed is false",
    }),
);

type testInput = z.infer<typeof jsonSchema>;

export async function runTests(data: testInput) {
  const body = JSON.stringify(data);

  const channel = await connection.createChannel();

  const q = await channel.assertQueue("", { exclusive: true });

  return new Promise((resolve, reject) => {
    channel.consume(
      q.queue,
      (msg) => {
        if (msg !== null && msg.properties.correlationId === data.id) {
          resolve(resultSchema.parse(JSON.parse(msg.content.toString())));
        }
      },
      { noAck: true },
    );

    setTimeout(() => {
      reject(new Error("timeout"));
    }, 5000);

    channel.sendToQueue("jobs", Buffer.from(body), {
      persistent: true,
      correlationId: data.id,
      replyTo: q.queue,
    });
  });
}
