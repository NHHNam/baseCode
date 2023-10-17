import express from 'express';
import connectDB from './config/mongoose.connect';
import routes from './route/loadRouter';
import redisUtil from './util/redis.util';
import BotTelegram from './botTelegram/botTelegram';
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from 'swagger-jsdoc';
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
redisUtil.start()
connectDB()
app.use(
    express.urlencoded({
        extended: true,
    }),
);
BotTelegram.start("hello")
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
);
routes(app)

app.listen(8080,()=>console.log('hello world'))