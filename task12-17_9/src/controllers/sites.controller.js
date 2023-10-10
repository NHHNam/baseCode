import WebSocket from 'ws';
import { Types } from 'mongoose';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { wss, io } from '../app.js';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';

import fs from 'fs';
const clients = new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let roomIdGlobal;
class SitesController {
    async ChatRealTimeSocketIo(req, res) {
        try {
            const { _id } = req.payload;
            const user = await User.findById(_id);
            const filePath = join(__dirname, '..', 'views', 'chatRealTimeSocketIo.html');

            // Đọc nội dung trang HTML
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Lỗi trong quá trình đọc trang HTML.');
                }

                // Thay thế một chuỗi trong trang HTML với dữ liệu JSON của biến user
                const htmlWithUser = data.replace('<!-- USER_DATA -->', JSON.stringify(user));

                // Gửi trang HTML đã được thay thế
                res.send(htmlWithUser);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async Room(req, res) {
        try {
            const { roomId } = req.body;
            if (!Types.ObjectId.isValid(roomId)) {
                return res.status(400).json({
                    message: 'Invalid id format',
                });
            }
            roomIdGlobal = roomId;

            const options = {
                sort: {
                    createdAt: -1,
                },
                limit: 5,
                populate: {
                    path: 'userId',
                    model: 'user',
                    select: {
                        fullName: 1,
                    },
                },
            };
            const messages = await Message.find({ roomId }, null, options);
            // const messages = await Message.find({ roomId }).sort({ createdAt: -1 }).limit(5).exec();
            messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            return res.status(200).json(messages);
        } catch (error) {
            console.log(error);
        }
    }
}
export { roomIdGlobal };
export default new SitesController();
