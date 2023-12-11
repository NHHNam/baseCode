import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://localhost:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'direct_logs';
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'Hello World!';
        var severity = args.length > 0 ? args[0] : 'info';

        channel.assertExchange(exchange, 'direct', {
            durable: false,
        });
        channel.publish(exchange, severity, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});