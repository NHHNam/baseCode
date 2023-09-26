import db from "../model/db"
import bcrypt from 'bcrypt'
import EmailUtils from "../util/email.utils";
import redisUtil from "./redis.util";
import {v4 as uuidv4} from 'uuid';
const salt = 10
export default class UserUtils{
    static hashpassword = async function (password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }
    static isUserExisted = async  function(userName:String){
        let check = await db.user.findOne({UserName:userName})
        return check ? true : false
    }
    static comparePassword = async function (password:string,hashPassword:string) :Promise<boolean> {
        const isPasswordValid = await bcrypt.compare(password, hashPassword);
        return isPasswordValid;
    }
    static convertImgtoBase64 = async function (a:any) {
        return Buffer.from(a.path).toString('base64')
    }
    static refreshPassword = async function(email:string) {
      const refreshPassword = uuidv4()
      await EmailUtils.sendEmail(email,refreshPassword,"Refresh Password")
      return refreshPassword
    }
    static sendOpt = async function name(email:string) {
        const opt = uuidv4()
        await EmailUtils.sendEmail(email,opt,"opt for request password")
        await redisUtil.hsetTTLOpt(email,opt)
        return opt
    }
    static isOptValid = async function name(opt:string,email:string) {
        const optRedis = await redisUtil.hGet(email,"opt")
        if (optRedis == opt) {
            return true
        }  
        return false
        
    }
}