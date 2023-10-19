import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

import * as userService from './user.service.js';
import * as paymentService from './payment.service.js';
import * as postService from './post.service.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const CallBotTelegram = () => {
    bot.on('message', async (msg) => {
        console.log(msg);

        const parts = msg.text.toString().split(';');
        if (parts.length > 0) {
            const command = parts[0].trim().split('_')[0];
            const object = parts[0].trim().split('_')[1];

            const parameters = {};

            for (let i = 1; i < parts.length; i++) {
                const [key, value] = parts[i].split('=');
                parameters[key] = value;
            }
            console.log(`command: ${command}`);
            console.log(`object: ${object}`);
            console.log(parameters);

            switch (object) {
                case 'user':
                    if (command === 'new') {
                        await userService.create(parameters);
                        bot.sendMessage(msg.chat.id, 'add user successfully');
                    } else if (command === 'update') {
                        const _id = parameters.id;
                        const updateInfo = parameters;
                        delete updateInfo.id;
                        await userService.update(_id, updateInfo);
                        bot.sendMessage(msg.chat.id, 'update user successfully');
                    } else if (command === 'delete') {
                        const _id = parameters.id;
                        await userService.destroy(_id);
                        bot.sendMessage(msg.chat.id, 'delete user successfully');
                    }
                    break;
                case 'payment':
                    if (command === 'new') {
                        const userId = parameters.id || parameters.userId;
                        const field = parameters;
                        if (field.id) delete field.id;
                        else delete field.userId;
                        await paymentService.create(userId, field);
                        bot.sendMessage(msg.chat.id, 'add payment successfully');
                    } else if (command === 'update') {
                        const userId = parameters.id || parameters.userId;
                        const field = parameters;
                        if (field.id) delete field.id;
                        else delete field.userId;
                        await paymentService.update(userId, field);
                        bot.sendMessage(msg.chat.id, 'update payment successfully');
                    } else if (command === 'delete') {
                        const _id = parameters.id;
                        await paymentService.destroy(_id);
                        bot.sendMessage(msg.chat.id, 'delete payment successfully');
                    }
                    break;
                case 'post':
                    if (command === 'new') {
                        const { thumnail, userId, id } = parameters;
                        const _id = userId || id;
                        const field = parameters;
                        if (field.id) delete field.id;
                        else delete field.userId;
                        delete field.thumnail;
                        await postService.create(thumnail, field, _id);
                        bot.sendMessage(msg.chat.id, 'add post successfully');
                    } else if (command === 'update') {
                        const { thumnail, postId, id } = parameters;
                        const _id = postId || id;
                        const field = parameters;
                        if (field.id) delete field.id;
                        else delete field.postId;
                        delete field.thumnail;
                        await postService.update(_id, field, thumnail);
                        bot.sendMessage(msg.chat.id, 'update post successfully');
                    } else if (command === 'delete') {
                        const { id, postId } = parameters;
                        const _id = postId || id;
                        await paymentService.destroy(_id);
                        bot.sendMessage(msg.chat.id, 'delete post successfully');
                    }
                    break;
            }
        }
    });
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Welcome');
    });
    bot.onText(/\/sendpic/, (msg) => {
        bot.sendPhoto(msg.chat.id, 'https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg', {
            caption: 'Here we go ! \nThis is just a caption ',
        });
    });
    bot.onText(/\/ssstartt/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Welcome', {
            reply_markup: {
                keyboard: [['Sample text', 'Second sample'], ['Keyboard'], ["I'm robot"]],
            },
        });
    });

    bot.onText(/\/getphotos/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        try {
            const photos = await bot.getUserProfilePhotos(userId);
            const totalPhotos = photos.total_count;
            const photoArray = photos.photos;

            if (totalPhotos > 0) {
                const photo = photoArray[0].slice(-1)[0]; // Lấy ảnh cuối cùng
                const fileId = photo.file_id;

                // Gửi ảnh cho người dùng
                await bot.sendPhoto(chatId, fileId);
            } else {
                await bot.sendMessage(chatId, 'Người dùng này chưa có ảnh hồ sơ.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            await bot.sendMessage(chatId, 'Có lỗi xảy ra khi lấy ảnh hồ sơ.');
        }
    });
};
export default CallBotTelegram;
