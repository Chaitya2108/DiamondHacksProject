import amqp from "amqplib";

const connection = await amqp.connect("amqp://146.190.145.149:5672", {
  credentials: amqp.credentials.amqplain("test", "test"),
});

const channel = await connection.createChannel();

await channel.assertQueue("jobs", { durable: true });

console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", "jobs");

channel.consume("jobs", (msg) => {
  if (!msg) {
    return;
  }

  console.log(" [x] Received %s", msg.content.toString());
}, {
  noAck: true,
});
