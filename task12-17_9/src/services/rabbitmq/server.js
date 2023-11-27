import amqp from 'amqplib/callback_api.js';
import TelegramBot from 'node-telegram-bot-api';
const token = '6763241222:AAGBGxWk88W787gZzHlrub4YshGXJkNeALo';
const bot = new TelegramBot(token, { polling: true });

const chatId = 5947151301;

const SendInfoToTelegramUsingRabittmq = (exchange) => {
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
                                    console.log(JSON.parse(msg.content).toString());
                                    bot.sendMessage(chatId, JSON.parse(msg.content));
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
SendInfoToTelegramUsingRabittmq('logs_order');
