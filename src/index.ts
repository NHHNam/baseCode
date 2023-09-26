import express from 'express';
import connectDB from './config/mongoose.connect';
import routes from './route/loadRouter';
import redisUtil from './util/redis.util';
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
redisUtil.start()
connectDB()
routes(app)
app.listen(3001,()=>console.log('hello world'))