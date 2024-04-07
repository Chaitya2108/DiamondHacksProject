import amqp from "amqplib";
import { exec } from "child_process";
import path from "path";

import { z } from "zod";

import "dotenv/config";

const url = process.env.AMQP_URL;
const user = process.env.AMQP_USER;
const pass = process.env.AMQP_PASS;

main();

async function main() {
  if (url === undefined || user === undefined || pass === undefined) {
    throw new Error("AMQP_URL, AMQP_USER, AMQP_PASS must be set");
  }

  const connection = await amqp.connect(url, {
    credentials: amqp.credentials.plain(user, pass),
  });

  const channel = await connection.createChannel();

  await channel.assertQueue("jobs", { durable: false });

  channel.prefetch(1);

  console.log(" [*] Waiting for messages jobs");

  let active = 0;

  channel.consume("jobs", async (msg) => {
    if (!msg) {
      return;
    }

    if (active >= 10) {
      return;
    }

    const res = await handle(JSON.parse(msg.content.toString()));

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(res)),
      {
        correlationId: msg.properties.correlationId,
      },
    );

    channel.ack(msg);
  });
}

const jsonSchema = z.object({
  id: z.string(),
  lang: z.enum(["js", "py"]),
  boilerplate: z.string(),
  tests: z.array(
    z.object({
      expected: z.string(),
      actual: z.string(),
    }),
  ),
  submission: z.string(),
});

async function handle(json: z.infer<typeof jsonSchema>) {
  console.log(" [*] Received %s", json.id);

  return new Promise((resolve, reject) => {
    resolve({ id: json.id, result: "ok" });
  });

  // exec(
  //   `docker run --rm -v ${folder}:/app/test runner node /app/run.cjs ${lang}`,
  //   (err, stdout, stderr) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //
  //     console.log(stdout);
  //     console.error(stderr);
  //
  //     active--;
  //   },
  // );
  // active++;
}
