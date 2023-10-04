import { skipPage } from "../utils";
import { paymentModel } from "../models";

export default class PaymentRepository {
  static async getPayment(paymentId: string) {
    return await paymentModel.findById(paymentId).lean().exec();
  }
  static async getAllPayments(limit: number, page: number) {
    return await paymentModel
      .find()
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }
  static async searchPayments(limit: number, page: number, keySearch: string) {
    return await paymentModel
      .find({ $text: { $search: keySearch } })
      .limit(limit)
      .skip(skipPage({ limit, page }))
      .lean()
      .exec();
  }
  static async updatePayment(paymentId: string, payload: any) {
    return await paymentModel
      .findByIdAndUpdate(paymentId, payload, { new: true })
      .lean()
      .exec();
  }
  static async deletePayment(paymentId: string) {
    return await paymentModel.findByIdAndDelete(paymentId).lean().exec();
  }
}
