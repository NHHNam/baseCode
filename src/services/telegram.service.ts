import { Request, Response } from "express";
import BotTelegram from "../utils/BotTelegram";
import { Message } from "node-telegram-bot-api";

export default class TelegramService {
  static async handlerMessage(req: Request, res: Response) {
    console.log("Post message telegram")
    BotTelegram.on("message", async (msg: Message) => {
      const chatId = msg.chat.id;
      let message: string = "Message của bot nè";
      console.log("msg:::", msg);
      console.log("msg.text:::", msg.text);
      if (msg.text?.charAt(0) === "/")
        switch (msg.text) {
          case "/start":
            message = "Chúng ta bắt đầu nào!!";
            break;
          case "/end":
            message = "Chào tạm biệt bạn!!";
            break;
          case "/study":
            message = "Chúng ta học thôi!!";
            break;
          case "/fucking":
            message = "Chúng ta bắt đầu...!!";
            break;
          default:
            message = "Tôi không hiểu những gì bạn nói!!";
            break;
        }
      else message = msg.text || "";
      await BotTelegram.sendMessage(chatId, message);
    });
  }
}
