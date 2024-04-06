import amqp from "amqplib";
import { exec } from "child_process";
import path from "path";

const connection = await amqp.connect("amqp://146.190.145.149:5672", {
  credentials: amqp.credentials.amqplain("test", "test"),
});

const channel = await connection.createChannel();

await channel.assertQueue("jobs", { durable: true });

console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", "jobs");

let active = 0;

channel.consume("jobs", (msg) => {
  if (!msg) {
    return;
  }

  if (active >= 10) {
    return;
  }

  // ack the message
  channel.ack(msg);

  const json = JSON.parse(msg.content.toString());

  if (id === undefined || lang === undefined) {
    console.error("Invalid message received: %s", msg.content.toString());
    return;
  }

  if (!["js", "py"].includes(lang)) {
    console.error("Invalid lang: %s", lang);
    return;
  }

  console.log(` [x] Received ${id} ${lang}`);

  const folder = path.join(__dirname, "jobs", id);

  exec(
    `docker run --rm -v ${folder}:/app/test runner node /app/run.cjs ${lang}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      }

      console.log(stdout);
      console.error(stderr);

      active--;
    },
  );
  active++;
});
