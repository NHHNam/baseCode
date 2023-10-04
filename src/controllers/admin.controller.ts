import { Request, Response } from "express";
import { OK } from "../core/success.response";
import { AdminService } from "../services";

export default class AdminController {
  static async getUser(req: Request, res: Response) {
    new OK({
      message: "Get user successfully",
      metadata: await AdminService.getUser(req, res),
    }).send(res);
  }
  static async geAllUsers(req: Request, res: Response) {
    new OK({
      message: "Get all users successfully",
      metadata: await AdminService.geAllUsers(req, res),
    }).send(res);
  }
  static async updateUser(req: Request, res: Response) {
    new OK({
      message: "Update user successfully",
      metadata: await AdminService.updateUser(req, res),
    }).send(res);
  }
  static async blockUser(req: Request, res: Response) {
    new OK({
      message: "Block user successfully",
      metadata: await AdminService.blockUser(req, res),
    }).send(res);
  }
  static async deleteUser(req: Request, res: Response) {
    new OK({
      message: "Delete user successfully",
      metadata: await AdminService.deleteUser(req, res),
    }).send(res);
  }
}

// module.exports = UserController;
