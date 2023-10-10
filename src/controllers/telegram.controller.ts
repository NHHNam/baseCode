import { OK } from "../core/success.response";
import { TelegramService } from "../services";
import { Request, Response } from "express";

export default class TelegramController {
  static async handlerMessage(req: Request, res: Response) {
    new OK({
      message: "Handler message successfully",
      metadata: await TelegramService.handlerMessage(req, res),
    }).send(res);
  }
}
