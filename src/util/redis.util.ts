import redisServer from "../config/redisServer.connect";

export default class redisUtil {
    static start = async()=>{
        await redisServer.connect().then(()=>console.log("server connects to redis")).catch((err)=>console.log(err))
    }
    static hSet = async(userId:string,refreshToken:string)=>{
        const result = await redisServer.hSet(userId, {
            refreshToken
        })
        return result
    }
    static hGet = async(userId:string,property:string)=>{
        const result = await redisServer.hGet(userId,property)
        return result
    } 
    static del = async(userId:string)=>{
        await redisServer.DEL(userId)
    }
    static hsetTTLOpt = async(email:string,opt:string)=>{
        await redisServer.del(email)
        const result = await redisServer.hSet(email, {
            opt
        })
        await redisServer.EXPIRE(email,3600)
        return result
    }
}