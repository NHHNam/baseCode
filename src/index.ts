import express from 'express';
import connectDB from './config/mongoose.connect';
import routes from './route/loadRouter';
import redisUtil from './util/redis.util';
import BotTelegram from './botTelegram/botTelegram';
import ElasticSearch from './util/elasticsearch.util';
require('dotenv').config
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
routes(app)
ElasticSearch.connect()
app.listen(process.env.port,()=>console.log(`port ${process.env.port}`))