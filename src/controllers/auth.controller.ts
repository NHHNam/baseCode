import { Request, Response } from "express";
import { CREATED, OK } from "../core/success.response";
import { AuthService } from "../services";
export default class AuthController {
  static async login(req: Request, res: Response) {
    new OK({
      message: "Login successfully",
      metadata: await AuthService.login(req, res),
    }).send(res);
  }
  static async logout(req: Request, res: Response) {
    new OK({
      message: "Logout successfully",
      metadata: await AuthService.logout(req, res),
    }).send(res);
  }
  static async createSessionRegister(req: Request, res: Response) {
    new CREATED({
      message: "Create session register successfully",
      metadata: await AuthService.createSessionRegister(req, res),
    }).send(res);
  }
  static async confirmRegister(req: Request, res: Response) {
    new OK({
      message: "Confirm register successfully",
      metadata: await AuthService.confirmRegister(req, res),
    }).send(res);
  }
  static async refreshAccessToken(req: Request, res: Response) {
    new OK({
      message: "Refresh AT successfully",
      metadata: await AuthService.refreshAccessToken(req, res),
    }).send(res);
  }
  static async generateOTP(req: Request, res: Response) {
    new CREATED({
      message: "Generate OTP successfully",
      metadata: await AuthService.generateOTP(req, res),
    }).send(res);
  }
  static async createSessionResetPassword(req: Request, res: Response) {
    new CREATED({
      message: "Create session reset successfully",
      metadata: await AuthService.createSessionResetPassword(req, res),
    }).send(res);
  }
  static async confirmOTPResetPassword(req: Request, res: Response) {
    new OK({
      message: "Create session register successfully",
      metadata: await AuthService.confirmOTPResetPassword(req, res),
    }).send(res);
  }
  static async confirmResetPassword(req: Request, res: Response) {
    new OK({
      message: "Confirm reset successfully",
      metadata: await AuthService.confirmResetPassword(req, res),
    }).send(res);
  }
}

// module.exports = AuthController;
