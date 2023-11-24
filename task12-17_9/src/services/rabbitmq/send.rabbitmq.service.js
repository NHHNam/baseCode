import amqp from 'amqplib/callback_api.js';
amqp.connect('amqp://localhost:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello worldddđdddssss';

        channel.assertQueue(queue, {
            durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log(' [x] Sent %s', msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
