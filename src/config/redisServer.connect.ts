import { createClient } from 'redis';
const redisServer =  createClient({
   url:`redis://localhost:6379`
   // url:`redis://${host}:${port}`
})
export default redisServer
