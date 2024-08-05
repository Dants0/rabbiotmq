import fastify from 'fastify';
import amqp from'amqplib';

const app = fastify({ logger: true });

// Conexão RabbitMQ
const amqpUrl = 'amqp://user:password@localhost'; // Atualize com suas credenciais
const queueName = 'Hello';

app.get('/messages', async (request, reply) => {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    
    // Certifique-se de que a fila existe
    await channel.assertQueue(queueName, { durable: false });

    const messages = [];
    await channel.consume(queueName, (msg:any) => {
      if (msg !== null) {
        messages.push(msg.content.toString());
        channel.ack(msg);
      }
    }, { noAck: false });

    // Aguarde um tempo para consumir todas as mensagens
    setTimeout(async () => {
      await channel.close();
      await connection.close();
      reply.send({ messages });
    }, 5000); // Ajuste o tempo conforme necessário para consumir todas as mensagens

  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

const start = async () => {
  try {
    await app.listen(3000);
    console.log(`Server running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
