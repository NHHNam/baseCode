import { paymentModel } from "../models";
import { Request, Response } from "express";
import { IPayment, IQuery } from "../interface";
import { PaymentRepository } from "../repositories";
import { BadRequestError, NotFoundError } from "../core/error.response";

export default class PaymentService {
  static async createPayment(req: Request, res: Response) {
    const payload = req.body as IPayment;
    const dataCreate: IPayment = {
      ...payload,
      payment_userId: req.app.locals.user.userId,
    };
    const newPayment = await paymentModel.create(dataCreate);
    return newPayment;
  }

  static async getPayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    const payment = await PaymentRepository.getPayment(paymentId);
    if (!payment) throw new NotFoundError("Payment không tồn tại");
    return payment;
  }

  static async getAllPayments(req: Request, res: Response) {
    const { limit, page } = req.query as unknown as IQuery;
    const payments = await PaymentRepository.getAllPayments(limit, page);
    return payments;
  }

  static async searchPayments(req: Request, res: Response) {
    const { limit, page, keySearch } = req.query as unknown as IQuery;
    const payments = await PaymentRepository.searchPayments(
      limit,
      page,
      keySearch
    );
    return payments;
  }

  static async updatePayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    const payload = req.body;
    const paymentUpdated = await PaymentRepository.updatePayment(
      paymentId,
      payload
    );
    if (!paymentUpdated)
      throw new NotFoundError("Không tìm thấy payment để cập nhật");
    return paymentUpdated;
  }

  static async deletePayment(req: Request, res: Response) {
    const { paymentId } = req.params;

    const paymentDeleted = await PaymentRepository.deletePayment(paymentId);
    if (!paymentDeleted)
      throw new NotFoundError("Không tìm thấy payment để xóa");
    return paymentDeleted;
  }
}

// module.exports = PaymentService;
