import db from "../model/db"
import bcrypt from 'bcrypt'
import EmailUtils from "../util/email.utils";
import redisUtil from "./redis.util";
import {v4 as uuidv4} from 'uuid';
import { rejects } from "assert";

const salt = 10
const pageLimits = 5


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
      let a =  await EmailUtils.sendEmail(email,refreshPassword,"Refresh Password")
      console.log("refresh password " + a)
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
    static searchService = async function(property:any,query:any) {
        return new Promise(async(resolve,reject)=>{
            try {
                switch(property){
                    case("FullName") :
                        await db.user
                        .find({FullName:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("UserName") :
                        await db.user
                        .find({Username:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("Email") :
                        await db.user
                        .find({Email:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("Point") :
                        await db.user
                        .find({Point:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("Role") :
                        await db.user
                        .find({Role:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("Payment") :
                        await db.user
                        .find({Payment:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("CardId") :
                        await db.pay
                        .find({CardId:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    // case("UserId_Payment") :
                    //     await db.pay
                    //     .find({UserId:query}).lean()
                    //     .then((result:any)=>{
                    //         resolve(result)
                    //     })    
                    //     .catch(err=>{
                    //         console.log(err)
                    //         rejects(err)
                    //     })
                    //     break    
                    case("FullName_Payment") :
                        await db.pay
                        .find({FullName:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("NameCard") :
                        await db.pay
                        .find({NameCard:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("Title") :
                        await db.post
                        .find({Title:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("Description") :
                        await db.post
                        .find({Description:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                    case("UserId_Post") :
                        await db.post
                        .find({UserId:query}).lean()
                        .then((result:any)=>{
                            resolve(result)
                        })    
                        .catch(err=>{
                            console.log(err)
                            rejects(err)
                        })
                        break
                }
                
            } catch(err) {
                reject(err)
            }
        })
    }
    static getDocument  = async function (document:any,page:number) {
        return new Promise(async(resolve,reject)=>{
            try {
                switch(document) {
                    case("User") :
                    await db.user
                    .find()
                    .limit(pageLimits)
                    .skip(page * pageLimits)
                    .then(
                        (result:any)=> {
                            resolve(result)
                        }
                    )
                    .catch(err=>reject(err))
                    break;
                    case("Payment"):
                        await db.pay
                        .find()
                        .limit(pageLimits)
                        .skip(page * pageLimits)
                        .then(
                        (result:any)=> {
                            resolve(result)
                            }
                        )
                        .catch(err=>reject(err))
                        break;
                    case("Post"):
                        await db.post
                        .find()
                        .limit(pageLimits)
                        .skip(page * pageLimits)
                        .then(
                            (result:any)=> {
                                resolve(result)
                            }
                        )
                        .catch(err=>reject(err))
                        break;
                }
                
            } catch(err) {
                reject(err)
            }
        })
    }
}