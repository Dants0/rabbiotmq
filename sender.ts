import amqp from 'amqplib/callback_api'

amqp.connect('amqp://user:password@localhost', (error0: any, connection: any) => {
  if (error0) {
    throw error0
  }


  connection.createChannel((error1: any, channel: any) => {
    if (error1) {
      throw error1
    }

    let q = "Hello"
    let msg = "Hello world!"

    channel.assertQueue(q, {
      durable: false
    })

    channel.sendToQueue(q, Buffer.from(msg))

    console.log("[X] Sent %s", msg)



  })

  setTimeout(function () {
    connection.close();
    process.exit(0)
  }, 500);

})
