import { io } from '../app.js';
import Message from '../models/message.model.js';
import { roomIdGlobal } from '../controllers/sites.controller.js';
export default function CallSocket() {
    io.on('connection', (socket) => {
        console.log('A client connected to socket.io');

        socket.on(`message_${roomIdGlobal}`, async (response) => {
            const messageData = JSON.parse(response.toString());
            delete messageData.fullName;
            const message = new Message(messageData);
            await message.save();
            io.emit('send-data', response);
        });
        const count = io.engine.clientsCount;
        console.log(`Number client current: ${count}`);

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected socket.io`); // undefined
        });
    });
}
