import amqp from 'amqplib/callback_api.js';
import dotenv from 'dotenv';
import bot from '../config/bot-telegram.config.js';
dotenv.config();

const chatId = 5947151301;

export const SendInfo = (exchange, data) => {
    try {
        amqp.connect('amqp://localhost:5672', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                const msg = data;

                channel.assertExchange(exchange, 'fanout', {
                    durable: false,
                });
                channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
                console.log(' [x] Sent %s', msg);
            });

            setTimeout(function () {
                connection.close();
                process.exit(0);
            }, 500);
        });
    } catch (error) {
        throw error;
    }
};

export const SendInfoToTelegramUsingRabittmq = (exchange) => {
    try {
        amqp.connect('amqp://localhost:5672', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertExchange(exchange, 'fanout', {
                    durable: false,
                });

                channel.assertQueue(
                    '',
                    {
                        exclusive: true,
                    },
                    function (error2, q) {
                        if (error2) {
                            throw error2;
                        }
                        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);
                        channel.bindQueue(q.queue, exchange, '');

                        channel.consume(
                            q.queue,
                            function (msg) {
                                if (msg.content) {
                                    console.log(msg);
                                    bot.sendMessage(chatId, msg);
                                }
                            },
                            {
                                noAck: true,
                            },
                        );
                    },
                );
            });
        });
    } catch (error) {
        throw error;
    }
};
