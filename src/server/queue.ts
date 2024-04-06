import amqp from "amqplib";

async function sendToQueue(queue, message: string) {
  const connection = await amqp.connect("amqp://146.190.145.149:5672", {
    credentials: amqp.credentials.amqplain("test", "test"),
  });

  const channel = await connection.createChannel();

  await channel.assertQueue("jobs", { durable: true });

  channel.sendToQueue("jobs", Buffer.from(message), {
    persistent: true,
  });
}


