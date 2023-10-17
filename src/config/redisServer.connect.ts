import { createClient } from 'redis';
require('dotenv').config()
const redisServer =  createClient({
   // url:`redis://redis:6379`
   url:`redis://localhost:6379`
})

export default redisServer
