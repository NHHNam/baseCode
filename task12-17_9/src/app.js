import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import { Server } from 'socket.io';
import log4js from 'log4js';
import route from './routes/index.router.js';
import connectMongoose from './databases/mongoose.int.js';
import CallBotTelegram from './services/bot-telegram.service.js';
import { ChatRealTime } from './services/socket.io.js';
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// logger log4js
log4js.configure('log4js.json');
const logger = log4js.getLogger();
// app.use(log4js.connectLogger(logger.express, { level: 'auto', format: ':status :method :url' }));
// app.use(log4js.connectLogger(logger));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// connect websocket
const wss = new WebSocketServer({ port: 3001 });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log('A new client connected ws');
});

// call bot telegram
CallBotTelegram();

// cors
const corOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corOptions));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'api',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'Bearer',
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
const server = http.createServer(app);

// connect socket.io
const io = new Server(server, { cors: { origin: '*' } });
export default server;
export { wss, io, logger };

ChatRealTime();
