import { Request, Response } from "express";
import { PaymentService } from "../services";
import { CREATED, OK } from "../core/success.response";

export default class PaymentController {
  static async createPayment(req: Request, res: Response) {
    new CREATED({
      message: "Create payment successfully",
      metadata: await PaymentService.createPayment(req, res),
    }).send(res);
  }
  static async getPayment(req: Request, res: Response) {
    new OK({
      message: "Get payment successfully",
      metadata: await PaymentService.getPayment(req, res),
    }).send(res);
  }
  static async getAllPayments(req: Request, res: Response) {
    new OK({
      message: "Get all payment successfully",
      metadata: await PaymentService.getAllPayments(req, res),
    }).send(res);
  }
  static async searchPosts(req: Request, res: Response) {
    new OK({
      message: "Search payment successfully",
      metadata: await PaymentService.searchPayments(req, res),
    }).send(res);
  }
  static async updatePayment(req: Request, res: Response) {
    new OK({
      message: "Update payment successfully",
      metadata: await PaymentService.updatePayment(req, res),
    }).send(res);
  }
  static async deletePayment(req: Request, res: Response) {
    new OK({
      message: "Delete payment successfully",
      metadata: await PaymentService.deletePayment(req, res),
    }).send(res);
  }
}

// module.exports = PaymentController;
