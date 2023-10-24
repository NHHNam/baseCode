import { createClient } from 'redis';
require('dotenv').config()
const port  = process.env.portRedis || "6379"
const host = process.env.hostRedis || "localhost"
const redisServer =  createClient({
   url:`redis://localhost:6379`   
   // url:`redis://${host}:${port}`
})
export default redisServer
