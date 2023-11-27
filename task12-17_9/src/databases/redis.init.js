import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const client = createClient({
    url: process.env.REDIS_URI,
});

client.on('error', (err) => {
    console.log('Redis Client Error', err);
});
await client.connect();

export default client;
