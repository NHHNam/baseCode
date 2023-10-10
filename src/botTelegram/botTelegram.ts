import axios from 'axios'
import {Bot} from 'grammy'
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
    static start = (msg:String)=>{
        const introductionMessage = `Hello! I'm Chau.
        I'm just a little boy with warm heart
        
        <b>Commands</b>
        /hi - greeting
        /question [text] - I can answer every freaking question
        /get [text] - show response of apis I've done. Syntax is Document pageNumber , example /get User 0
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
        bot.command("get",  async(ctx) => {
            if (ctx.message?.text != null) {
                let input = ctx.message?.text.split(" ")
                let result = await this.sendApi(input[1],Number(input[2]))
                ctx.reply(`get ${JSON.stringify(result)} `)
            } else {
                ctx.reply(`Not found `)
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
