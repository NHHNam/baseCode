import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import swaggerJsDoc from 'swagger-jsdoc';
import { Server } from 'socket.io';
import route from './routes/index.router.js';
import connectMongoose from './databases/mongoose.int.js';
import CallSocket from './services/socket.io.js';
const app = express();
const server = http.createServer(app);
// connect websocket
const wss = new WebSocketServer({ port: 3001 });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log('A new client connected ws');
});

// connect socket.io
const io = new Server(server, { cors: { origin: '*' } });
CallSocket();
// cors
const corOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corOptions));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'api',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['src/swagger/index.swagger.js'],
};

const specs = swaggerJsDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

// connect to mongoose
connectMongoose();

// route
route(app);

export default server;
export { wss, io };
