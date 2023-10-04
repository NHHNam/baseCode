import { userModel } from "../models";

export default class UserRepository {
  static async getUser(userId: string) {
    return await userModel.findById(userId).lean().exec();
  }
  static async getUserByEmail(userEmail: string) {
    return await userModel
      .findOne({ user_email: userEmail })
      .select("+user_password")
      .exec();
  }
  static async updateUser(userId: string, payload: any) {
    return await userModel
      .findByIdAndUpdate(userId, payload, { new: true })
      .lean()
      .exec();
  }
}
