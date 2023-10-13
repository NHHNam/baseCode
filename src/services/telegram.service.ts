import axios from "axios";
import { Request, Response } from "express";
import { userModel } from "../models";
import { getInfoData } from "../utils";
import { IUser } from "../interface";
import { ENV_CONFIG } from "../configs";
import httpTelegram from "../utils/httpTelegram";
import { UserRepository } from "../repositories";

export default class TelegramService {
  static async createUser(chatId: string, valueCreateUser: string[]) {
    const dataCreated: Pick<
      IUser,
      "user_userName" | "user_fullName" | "user_email" | "user_password"
    > = {
      user_userName: valueCreateUser[0],
      user_fullName: valueCreateUser[1],
      user_email: valueCreateUser[2],
      user_password: valueCreateUser[3],
    };
    let checkValueError: boolean = false;
    Object.values(dataCreated).forEach((value) => {
      if (!value) checkValueError = true;
    });
    if (checkValueError) {
      await axios.post(
        `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "Tạo user thất bại do thiếu dữ liệu",
        }
      );
      return;
    }
    const userExist = await UserRepository.getUserByEmail(
      dataCreated.user_email
    );
    if (userExist) {
      await axios.post(
        `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "User đã tồn tại",
        }
      );
      return;
    }
    const newUser = await userModel.create(dataCreated);
    return newUser;
  }
  static async getUser(chatId: string, userId: string[]) {
    const user = await UserRepository.getUser(userId[0]);
    if (!user) {
      await axios.post(
        `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "User không tồn tại",
        }
      );
      return;
    }
    return user;
  }

  static async updateUser(chatId: string, valueUpdate: string[]) {
    const dataUpdate: Pick<
    IUser,
    "user_userName" | "user_fullName" | "user_email" | "user_password"
  > = {
    user_userName: valueUpdate[1],
    user_fullName: valueUpdate[2],
    user_email: valueUpdate[3],
    user_password: valueUpdate[4],
  };
    const userUpdated = await UserRepository.updateUser(valueUpdate[0],dataUpdate);
    if (!userUpdated) {
      await axios.post(
        `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "User không tồn tại cho update",
        }
      );
      return;
    }
    return userUpdated;
  }

  static async deleteUser(chatId: string, userId: string[]) {
    const userDeleted = await userModel.findByIdAndDelete(userId[0]);
    if (!userDeleted) {
      await axios.post(
        `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "User không tồn tại để xóa",
        }
      );
      return;
    }
    return userDeleted;
  }

  static async handlerMessage(req: Request, res: Response) {
    const chatId = req.body.message.chat.id;
    const commandTelegram: string = req.body.message.text;
    const [command, ...valueUser] = commandTelegram.split(";");
    console.log("commandTelegram:::", req.body);
    if (command === "new_user") {
      const newUser = await this.createUser(chatId, valueUser);
      console.log("newUser:::", newUser);
      if (newUser)
        await axios.post(
          `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: JSON.stringify(newUser),
          }
        );
      return;
    }
    if (command === "get_user") {
      const user = await this.getUser(chatId, valueUser);
      if (user)
        await axios.post(
          `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: JSON.stringify(user),
          }
        );
      return;
    }
    if (command === "update_user") {
      const newUser = await this.updateUser(chatId, valueUser);
      console.log("newUser:::", newUser);
      if (newUser)
        await axios.post(
          `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: JSON.stringify(newUser),
          }
        );
      return;
    }
    if (command === "delete_user") {
      const userDeleted = await this.deleteUser(chatId, valueUser);
      if (userDeleted)
        await axios.post(
          `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: JSON.stringify(userDeleted),
          }
        );
      return;
    } else {
      await axios.post(
        `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "Lệnh không hợp lệ",
        }
      );
    }

    return "Handler Message Telegram";
  }
}
