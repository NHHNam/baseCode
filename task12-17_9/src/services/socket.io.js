import { io } from '../app.js';
import Message from '../models/message.model.js';
export const ChatRealTime = () => {
    io.on('connection', (socket) => {
        console.log('A client connected to socket.io');
        socket.on('message', async (response) => {
            const messageData = JSON.parse(response.toString());
            delete messageData.fullName;
            console.log('resroomid', response);
            const message = new Message(messageData);
            await message.save();
            const { roomId } = messageData;
            io.emit(`send-data_${roomId}`, response);
        });

        const count = io.engine.clientsCount;
        console.log(`Number client current: ${count}`);

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected socket.io`); // undefined
        });
    });
};
