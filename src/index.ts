import express from 'express';
import connectDB from './config/mongoose.connect';
import routes from './route/loadRouter';
import redisUtil from './util/redis.util';
import BotTelegram from './botTelegram/botTelegram';
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
redisUtil.start()
connectDB()
routes(app)
BotTelegram.start("hello")
app.listen(8080,()=>console.log('hello world'))