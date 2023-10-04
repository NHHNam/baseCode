import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { TokenRepository, UserRepository } from "../repositories";
import {
  deleteTokenCookie,
  generatorOTP,
  getInfoData,
  getMiliSecondFormSecond,
  saveTokenCookie,
  verifyToken,
} from "../utils";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnavailableError,
} from "../core/error.response";
import { createDoubleKeys, createDoubleTokens } from "../utils/token";
import { tokenModel, userModel } from "../models";
import { VALUE_CONSTANT } from "../constant";

import { sendMail } from "../helper";
import { htmlRegister, htmlResetPassword } from "../constant/html";
import { ISessionLocal, IUser } from "../interface";
import { IUserAuth } from "src/interface/model";

export default class AuthService {
  static async login(req: Request, res: Response) {
    console.log("----->Login");
    const { user_email, user_password } = req.body as Pick<
      IUser,
      "user_email" | "user_password"
    >;
    const user = await UserRepository.getUserByEmail(user_email);
    if (!user) throw new NotFoundError("Email người dùng không tồn tại!");

    const isMatchingPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!isMatchingPassword) throw new BadRequestError("Mật khẩu không đúng!");
    console.log("----->Pass Password");

    const {
      _id: userId,
      user_email: userEmail,
      user_fullName: userFullName,
      user_role: userRole,
    } = user;

    const { privateKey, publicKey } = createDoubleKeys();

    const keyStore = await tokenModel.findOneAndUpdate(
      {
        token_userId: userId,
      },
      {
        $set: {
          token_userId: userId,
          token_privateKey: privateKey,
          token_publicKey: publicKey,
        },
      },
      { new: true, upsert: true }
    );

    if (!keyStore) throw new BadRequestError("Lỗi hệ thống, vui lòng thử lại!");

    const publicKeyString = crypto.createPublicKey(
      keyStore.token_publicKey.toString()
    );

    // AT save to Author
    // RT save to DB and Cookie
    /////////////////////// Payload of token ///////////////////////

    const payload = { userId, userEmail, userFullName, userRole };
    const { accessToken, refreshToken } = await createDoubleTokens({
      payload,
      privateKey,
      publicKey: publicKeyString,
    });

    await keyStore.updateOne({
      $set: {
        token_refreshTokenUsing: refreshToken,
      },
    });

    saveTokenCookie({
      tokenName: VALUE_CONSTANT.RT_NAME,
      tokenValue: refreshToken,
      day: 7,
      res,
    });

    return {
      user: getInfoData(user, [
        "_id",
        "user_email",
        "user_fullName",
        "user_role",
      ]),
      accessToken,
    };
  }

  static async logout(req: Request, res: Response) {
    console.log("req.cookies:::", req.cookies);
    const refreshToken = req.cookies[VALUE_CONSTANT.RT_NAME];
    if (!refreshToken) throw new BadRequestError("Chưa có phiên đăng nhập");
    deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
    // Delete RT in Db
    const keyDeleted = await TokenRepository.deleteByRefreshToken(refreshToken);
    if (!keyDeleted) throw new BadRequestError("Delete RT Error");

    return;
  }

  static async generateOTP(req: Request, res: Response) {
    // optionConfirm = 001 => Register
    // optionConfirm = 002 => ResetPassword
    const { timeExpireOTP, optionConfirm } = req.body;

    console.log("req.app.locals.sessionData:::", req.app.locals.sessionData);

    if (!req.app.locals.sessionData)
      throw new BadRequestError("Tạo OTP không thành công");

    const payload = req.app.locals.sessionData;

    if (optionConfirm === "002") {
      const userExist = await UserRepository.getUserByEmail(payload.user_email);
      if (!userExist)
        throw new BadRequestError(
          `Email ${payload.user_email} không tồn tại trong hệ thống`
        );
    }

    req.app.locals.sessionOTP = await generatorOTP();
    req.app.locals.sessionDuration =
      Date.now() + getMiliSecondFormSecond(Number(timeExpireOTP));
    req.app.locals.sessionConfirm = false;

    if (optionConfirm === "001")
      await sendMail(
        payload.user_email,
        htmlRegister(req.app.locals.sessionOTP)
      );
    if (optionConfirm === "002")
      await sendMail(
        payload.user_email,
        htmlResetPassword(req.app.locals.sessionOTP)
      );

    return `Vui lòng kiểm tra email đã điền trước đó`;
  }

  static async createSessionRegister(req: Request, res: Response) {
    const payload = req.body as IUserAuth;

    if (payload.user_password !== payload.user_confirmPassword)
      throw new BadRequestError("Mật khẩu xác nhận không khớp");

    if (!payload.user_fullName || !payload.user_userName)
      throw new BadRequestError("Vui lòng bổ sung đầy đủ thông tin");

    const checkEmail = await UserRepository.getUserByEmail(payload.user_email);
    if (checkEmail) throw new BadRequestError("Email đã được đăng kí trước đó");

    const checkPhone = await userModel.findOne({
      user_phoneNumber: payload.user_phoneNumber,
    });
    if (checkPhone)
      throw new BadRequestError("Số điện thoại đã được đăng kí trước đó");

    delete payload.user_confirmPassword;

    req.app.locals.sessionData = payload;

    return `Tạo phiên đăng kí thành công`;
  }

  static async confirmRegister(req: Request, res: Response) {
    const { OTPCode } = req.body;
    const { sessionOTP, sessionDuration, sessionData } = req.app
      .locals as ISessionLocal;

    if (!sessionData)
      throw new BadRequestError("Lỗi reset password, vui lòng thử lại");
    if (`${OTPCode}` !== `${sessionOTP}`)
      throw new BadRequestError("Mã OTP không chính xác, vui lòng thử lại");
    if (sessionDuration < Date.now())
      throw new BadRequestError(
        "Mã OTP hết hạn, nhấn vào nút gửi lại để xác nhận mã khác"
      );

    const newUser = await userModel.create(sessionData);
    if (!newUser)
      throw new BadRequestError("Tạo user thất bại, vui lòng thử lại");

    req.app.locals.sessionOTP = null;
    req.app.locals.sessionDuration = null;
    req.app.locals.sessionData = null;
    req.app.locals.sessionConfirm = null;

    return;
  }

  static async createSessionResetPassword(req: Request, res: Response) {
    const { user_email } = req.body as Pick<IUser, "user_email">;

    const checkEmail = await UserRepository.getUserByEmail(user_email);
    if (!checkEmail)
      throw new BadRequestError(
        "Email người dùng không tồn tại trong hệ thống"
      );

    req.app.locals.sessionData = { user_email };

    return `Tạo phiên reset mật khẩu thành công`;
  }

  static async confirmOTPResetPassword(req: Request, res: Response) {
    const { OTPCode } = req.body;
    const { sessionOTP, sessionDuration } = req.app.locals as Pick<
      ISessionLocal,
      "sessionOTP" | "sessionDuration"
    >;
    if (`${OTPCode}` !== `${sessionOTP}`)
      throw new BadRequestError(
        "Mã OTP không chính xác, vui lòng kiểm tra lại"
      );

    if (sessionDuration < Date.now())
      throw new BadRequestError(
        "Mã OTP hết hạn, nhấn vào nút gửi lại để xác nhận mã khác"
      );

    req.app.locals.sessionConfirm = true;

    return `Xác nhận thành công`;
  }

  static async confirmResetPassword(req: Request, res: Response) {
    const { sessionData, sessionConfirm } = req.app.locals as Pick<
      ISessionLocal,
      "sessionData" | "sessionConfirm"
    >;
    const { user_password, user_confirmPassword } = req.body;
    const { user_email } = sessionData;

    if (!sessionConfirm)
      throw new UnavailableError(
        "Không thể truy cập trang này khi chưa xác nhận OTP"
      );

    if (user_password !== user_confirmPassword)
      throw new BadRequestError("Mật khẩu xác nhận không khớp");

    const user = await UserRepository.getUserByEmail(user_email);

    if (!user) throw new NotFoundError("Người dùng không tồn tại");

    const newPasswordEncode = await bcrypt.hash(
      user_password,
      VALUE_CONSTANT.SALT_PASSWORD
    );

    await user.updateOne({
      $set: { user_password: newPasswordEncode },
    });

    req.app.locals.sessionOTP = null;
    req.app.locals.sessionDuration = null;
    req.app.locals.sessionData = null;
    req.app.locals.sessionConfirm = null;

    return "Đổi mật khẩu thành công";
  }

  static async refreshAccessToken(req: Request, res: Response) {
    // Check cookie
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      throw new UnauthenticatedError(
        "Phiên bảng đăng nhập hết hạn, vui lòng đăng nhập lại"
      );

    // Check DB
    const keyStore = await TokenRepository.getRefreshTokenUsing(refreshToken);
    if (!keyStore) {
      await deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
      throw new BadRequestError("Refresh token dost not exist");
    }

    // Verify RT
    const { token_publicKey, token_privateKey } = keyStore;
    let userVerify;
    try {
      userVerify = verifyToken(refreshToken, token_publicKey) as {
        userId: string;
        userEmail: string;
        userFullName: string;
        userRole: string;
      };
    } catch (error) {
      throw new UnauthenticatedError(
        "Phiên bảng đăng nhập hết hạn, vui lòng đăng nhập lại"
      );
    }

    const payload = {
      userId: userVerify.userId,
      userFullName: userVerify.userFullName,
      userEmail: userVerify.userEmail,
      userRole: userVerify.userRole,
    };

    const publicKeyString = crypto.createPublicKey(token_publicKey);

    const { accessToken: newAT, refreshToken: newRT } =
      await createDoubleTokens({
        payload,
        publicKey: publicKeyString,
        privateKey: token_privateKey,
      });

    // Update refreshToken
    await keyStore.updateOne({
      $set: {
        token_refreshTokenUsing: newRT,
      },
      $addToSet: {
        token_refreshTokenUsed: refreshToken,
      },
    });

    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: VALUE_CONSTANT.RT_NAME,
      tokenValue: newRT,
      day: 7,
      res,
    });

    return {
      user: payload,
      newAccessToken: newAT,
    };
  }
}

// module.exports = AuthService;
