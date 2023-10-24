import jwt from 'jsonwebtoken'
import redisUtil from './redis.util';
require('dotenv').config
const secretKey = process.env.secretKey||"asdsadsadsads";
const expires = new Date(Date.now() + 1000 * 60 * 60*24*30)
const expiresRefresh = new Date(Date.now() + 1000 * 60 * 60*24*30*3000)
const secretKeyRefresh = process.env.secretKeyRefresh ||"dasdsadsa";

export default class JwtTokenUtils {
    static generateToken = async function (Username:string,role:string,id:String,lock:Boolean) {
        const payload = {
            role,
            username: Username,
            id,
            expires,
            lock
        };
        return jwt.sign(payload,secretKey)
    }
    static generateRefreshToken = async(Username:string,role:string,id:string)=>{
        const payload = {
            role,
            username: Username,
            id,
            expiresRefresh
        };
        const refreshToken = jwt.sign(payload,secretKeyRefresh)
        await redisUtil.hSet(id,refreshToken)
        return refreshToken
    }
    static validate =async (token:string) => {
        const verify = jwt.verify(token,secretKey)
        if (!verify) {
            return false
        }
        const user =  jwt.decode(token)
        return user
    }
    static validateRefresh =async (token:string) => {
        const verify = jwt.verify(token,secretKeyRefresh)
        if (!verify) {
            return false
        }
        const user =  jwt.decode(token)
        return user
    }
}