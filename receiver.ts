import amqp from 'amqplib/callback_api';

export const am = amqp.connect('amqp://user:password@localhost', (error0: any, connection: any) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1: any, channel: any) => {
    if (error1) {
      throw error1;
    }

    let q = 'Hello';

    channel.assertQueue(q, {
      durable: false
    });

    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", q);

    channel.consume(q, (msg: any) => {
      if (msg !== null) {
        // console.log("[X] Received %s", msg.content.toString());
        return msg.content.toString();
      }
    }, {
      noAck: true
    });

  });
});
