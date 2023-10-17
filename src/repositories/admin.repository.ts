import { skipPage } from "../utils";
import { userModel } from "../models";

export default class AdminRepository {
  static async getUser(userId: string) {
    return await userModel.findById(userId).lean().exec();
  }
  static async getAllUsers(limit: number, page: number) {
    return await userModel
      .find()
      .limit(limit)
      .skip(skipPage({ page, limit }))
      .lean()
      .exec();
  }
  static async updateUser(userId: string, payload: any) {
    return await userModel
      .findByIdAndUpdate(userId, payload, { new: true })
      .lean()
      .exec();
  }
  static async blockUser(userId: string) {
    return await userModel
      .findByIdAndUpdate(userId, {
        $set: { user_isBlocking: true },
      })
      .lean()
      .exec();
  }
  static async deleteUser(userId: string) {
    
    return await userModel.findByIdAndDelete(userId).lean().exec();
  }
}
