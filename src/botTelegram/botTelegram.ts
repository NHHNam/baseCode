import axios from 'axios'
import {Bot} from 'grammy'
import UserUtils from "../util/user.util";
import Payment from "../model/Payment.model"
import Post from "../model/Post.model";
import db from "../model/db";
import User from "../model/User.model";
require('dotenv').config
const bot = new Bot("6309682066:AAEilRroIZNPvGQ45a7ivE5BfkugdbR18Uk")
export default class BotTelegram {
    static sendApi = async (document:String,page:Number)=>{
        return new Promise(async(resolve,rejects)=>{
            try {
                let result = await axios.post("http://localhost:8080/user/getDocument",{
                    document,page
                })
                resolve(result.data)
            } catch(err) {
                rejects(err)
            }
        })
    }
    static createNewUser = async( 
        Username:any ,
        Email:any,
        Payment:any,
        Password:any,
        FullName:any,
        Point:any,) =>{
        return new Promise(async(resolve,rejects)=>{
            try {
                const isUserExisted = await UserUtils.isUserExisted(Username);
                if (isUserExisted) {
                    rejects('user has existed')
                }
                const password = await UserUtils.hashpassword(Password)
                let newUser = new User({
                    Username ,
                    Email,
                    Payment ,
                    Password : password,
                    FullName,
                    Point:parseInt(Point),
                    Role:"User",
                    CreatedAt: new Date(),
                    UpdateAt: new Date(),
                    isLock:false
                });
                await newUser.save()
                resolve(newUser)
            } catch(err) {
                rejects(err)
            }
        })
    }
    static updateUser = async( 
        Username:any ,
        Email:any,
        Payment:any,
        FullName:any,
        Point:any,) =>{
        return new Promise(async(resolve,rejects)=>{
            try {
               
                const query = {Username}
                const updateInfo = {
                    Payment ,
                    Email,
                    FullName,
                    Point:parseInt(Point),
                    UpdateAt: new Date()
                }
                const result = await db.user.findOneAndUpdate(query,updateInfo)
                resolve(result)
            } catch(err) {
                rejects(err)
            }
        })
    }
    static createPayment = async(
        CardId:any,
        FullName:any,
        NameCard:any
    ) =>{
        return new Promise(async(resolve,rejects)=>{
            try {
                let payment = new Payment({
                    CardId,FullName,NameCard
                })
                await payment.save()
                resolve(payment)
            } catch(err) {
                console.log(err)
                rejects(err)
            }
        })
    }
    static createPost = async (
        UserId:any,
        Description:any,
        Title:any,
    )=>{
        return new Promise(async(resolve,rejects)=>{
            try {
                let post = new Post({
                    UserId,
                    Description,
                    Title
                })
                await post.save()
                resolve(post)
            } catch(err) {
                console.log("create post "+err)
                rejects(err)
            }
        })
    }
    static updatePayment = (
        CardId:any,
        FullName:any,
        NameCard:any,
    )=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const query = {CardId}
                const updateInfo ={
                    FullName,
                    NameCard,
                    UpdateAt: new Date()
                }
                const result = await db.pay.findOneAndUpdate(query,updateInfo)
                resolve(result)
            } catch(err) {
                console.log("update payment")
                reject(err)
            }
        })
    }
    static updatePost = (
        PostID:any,
        UserId:any ,
        Description:any,
        Title:any,
    )=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const query = {_id:PostID}
                const updateInfo ={
                    UserId ,
                    Description,
                    Title,
                    UpdateAt: new Date()
                }
                const result = await db.post.findOneAndUpdate(query,updateInfo)
                resolve(result)
            } catch(err) {
                console.log("update payment")
                reject(err)
            }
        })
    }
    static start = (msg:String)=>{
        const introductionMessage = `
        <div>Hello! I'm Chau.
        I'm just a little boy with warm heart</div>
        
        <b>Commands</b>
        /hi - greeting
        /get [document],[page]
        /question [text] - I can answer every freaking question
        /create new_[object];... example : /create new_user;username;password;.....
        /update [object];...parameters example : /update payment;123(CardId),Chaudeptrai(FullName),123(NameCard)
        /delete [object]_[id] example : /delete user_12312312321
        `;
        
        const replyWithIntro = (ctx: any) => {
            ctx.reply(introductionMessage, {
            parse_mode: "HTML",
            })
        };
        bot.command("start", replyWithIntro);
        bot.command("hi", (ctx) => {
            ctx.reply(`hi ${ctx.from?.first_name} ${ctx.from?.last_name} `)
        })
        /*
        Username:any ,
        Email:any,
        Payment:any,
        Password:any,
        FullName:any,
        Point:any,
        
        */
        bot.command("create_user" , async(ctx)=>{
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")[1].split(";")
                let user = await this.createNewUser(input[0],input[1],input[2],input[3],input[4],input[5])
                ctx.reply(`new User : ${JSON.stringify(user)} `)
            } else {
                ctx.reply(`Not found `)
            }
        })
        bot.command("create_payment" , async(ctx)=>{
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")[1].split(";")
                let payment = await this.createPayment(input[0],input[1],input[2])
                ctx.reply(`new payment : ${JSON.stringify(payment)} `)
            } else {
                ctx.reply(`Not found `)
            }
        })
        bot.command("create_post" , async(ctx)=>{
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")[1].split(";")
                let post = await this.createPost(input[0],input[1],input[2])
                ctx.reply(`new post : ${JSON.stringify(post)} `)
            } else {
                ctx.reply(`Not found `)
            }
        })
        bot.command("update_user" , async(ctx)=>{
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")[1].split(";")
                let user = await this.createNewUser(input[0],input[1],input[2],input[3],input[4],input[5])
                ctx.reply(`user's updated :  ${JSON.stringify(user)} `)
            } else {
                ctx.reply(`Not found `)
            }
        })
        bot.command("update_payment" , async(ctx)=>{
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")[1].split(";")
                let payment = await this.updatePayment(input[0],input[1],input[2])
                ctx.reply(`payment's updated ${JSON.stringify(payment)} `)
            } else {
                ctx.reply(`Not found `)
            }
        })
        bot.command("update_post" , async(ctx)=>{
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")[1].split(";")
                let post = await this.updatePost(input[0],input[1],input[2],input[3])
                ctx.reply(`post's updated ${JSON.stringify(post)} `)
            } else {
                ctx.reply(`Not found `)
            }
        })
        bot.command("delete" , async(ctx)=>{
            try {
                if (ctx.message?.text != null) {
                    let input = ctx.message?.text.split(" ")[1].split("_")
                    switch(input[0]) {
                        case "user": {
                            let result = await db.user.findByIdAndRemove({_id:input[1]})
                            ctx.reply(`delete ${JSON.stringify(result)} `)
                        }
                        case "payment":{
                            let result = await db.pay.findByIdAndRemove({_id:input[1]})
                            ctx.reply(`delete ${JSON.stringify(result)} `)
                        }
                        case "post":{
                            let result = await db.post.findByIdAndRemove({_id:input[1]})
                            ctx.reply(`delete ${JSON.stringify(result)} `)
                        }
    
                    }
                } else {
                    ctx.reply(`Not found `)
                }
            }catch(err) {
                console.log("delete in bot telegram " + err)
            }
        })
        bot.command("get",async(ctx)=>{
            try {
                let input = ctx.message?.text.split(" ")
                if (input != null) {
                    let result = await UserUtils.getDocument(input[1],parseInt(input[2]))
                    ctx.reply(`get ${JSON.stringify(result)} `)   
                }else {
                    ctx.reply(`Ooop `)   
                }
                
            }catch(err){
                console.log("get telegram " + err)
            }
        })        
        bot.on("message", (ctx) => {
                console.log(ctx.message)
                ctx.reply("Got another message!")
            
            }
        );
        bot.start();
    }
}
