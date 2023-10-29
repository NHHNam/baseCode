import express from 'express';
import connectDB from './config/mongoose.connect';
import routes from './route/loadRouter';
import redisUtil from './util/redis.util';
import BotTelegram from './botTelegram/botTelegram';
import ElasticSearch from './util/elasticsearch.util';
import SocketServer from './socket/socker.io';
import { createServer } from 'http';
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
routes(app)
BotTelegram.start("hello")
ElasticSearch.connect()
let server = createServer(app)
SocketServer.start(server)
app.use('/',(req,res)=>{
    res.sendFile(__dirname + '/chatrealtime.html')
})
server.listen(3000,()=>console.log(`port 8080`))