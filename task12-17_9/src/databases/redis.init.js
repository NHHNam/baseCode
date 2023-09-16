import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();
const client = createClient({
    url: process.env.REDIS_URI,
});
// client.ping(function (err, result) {
//     if (err) console.log(`err:::::::${err}`);
//     console.log(result);
// });
// client.on('connect', () => {
//     console.log('Redis client connected');
// });

// client.on('error', (error) => {
//     console.error(`error :::::::::::${error}`);
// });

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export default client;
