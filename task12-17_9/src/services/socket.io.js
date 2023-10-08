import { io } from '../app.js';

export default function CallSocket() {
    io.on('connection', (socket) => {
        console.log('A client connected to socket.io');
        socket.on('message', (response) => {
            console.log(response);
            io.emit('send-data', response);
        });
        const count = io.engine.clientsCount;
        console.log(`Number client current: ${count}`);

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected socket.io`); // undefined
        });
    });
}
