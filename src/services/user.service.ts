import { Request, Response } from "express";
import { NotFoundError } from "../core/error.response";
import { UserRepository } from "../repositories";

export default class UserService {
  static async getUser(req: Request, res: Response) {
    const user = await UserRepository.getUser(req.app.locals.user.userId);
    if (!user) throw new NotFoundError("Không tìm thấy thông tin user");
    return user;
  }

  static async updateUser(req: Request, res: Response) {
    const payload = req.body;
    const userUpdated = await UserRepository.updateUser(
      req.app.locals.user.userId,
      payload
    );
    if (!userUpdated)
      throw new NotFoundError("Không tìm thấy user cho việc update");
    return userUpdated;
  }
}

// module.exports = UserService;
