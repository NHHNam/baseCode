import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
const server = http.createServer();

const PORT = 1234;
server.listen(PORT, () => {
    console.log(`The server rabbitmq is running on PORT = ${PORT}`);
});
