import { Request, Response } from "express";
import { OK } from "../core/success.response";
import { UserService } from "../services";

export default class UserController {
  static async getUser(req: Request, res: Response) {
    new OK({
      message: "Get user successfully",
      metadata: await UserService.getUser(req, res),
    }).send(res);
  }
  static async updateUser(req: Request, res: Response) {
    new OK({
      message: "Update user successfully",
      metadata: await UserService.updateUser(req, res),
    }).send(res);
  }
}

// module.exports = UserController;
