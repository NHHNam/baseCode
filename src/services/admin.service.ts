import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../core/error.response";
import { AdminRepository } from "../repositories";
import { IQuery, IUser } from "../interface";

export default class AdminService {
  static async getUser(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await AdminRepository.getUser(userId);
    if (!user)
      throw new NotFoundError("Người dùng không tồn tại trong hệ thống");
    return user;
  }

  static async geAllUsers(req: Request, res: Response) {
    const { limit, page } = req.query as unknown as IQuery;
    const users = await AdminRepository.getAllUsers(limit, page);
    console.log(users);
    return users;
  }

  static async updateUser(req: Request, res: Response) {
    const payload = req.body as IUser;
    const userUpdated = await AdminRepository.updateUser(payload._id, payload);
    if (!userUpdated)
      throw new BadRequestError(
        "Người dùng không tồn tại để cập nhật thông tin"
      );
    return userUpdated;
  }

  static async blockUser(req: Request, res: Response) {
    const { _id: userId } = req.body as Pick<IUser, "_id">;
    const userBlocked = await AdminRepository.blockUser(userId);
    if (!userBlocked)
      throw new BadRequestError("Người dùng không tồn tại để block");
    return userBlocked;
  }

  static async deleteUser(req: Request, res: Response) {
    const { _id: userId } = req.body as Pick<IUser, "_id">;
    const userDeleted = await AdminRepository.deleteUser(userId);
    if (!userDeleted)
      throw new BadRequestError(
        "Người dùng không tồn tại để xóa khỏi hệ thống"
      );
    return userDeleted;
  }
}
