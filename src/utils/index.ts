const lodash = require("lodash");
import { Response } from "express";
import otpGenerator from "otp-generator";
import JWT from "jsonwebtoken";

const verifyToken = (token: string, key: string) => JWT.verify(token, key);

const getInfoData = (object: any, field: Array<string>) =>
  lodash.pick(object, field);

const saveTokenCookie = ({
  tokenName,
  tokenValue,
  day,
  res,
}: {
  tokenName: string;
  tokenValue: any;
  day: number;
  res: Response;
}) =>
  res.cookie(tokenName, tokenValue, {
    httpOnly: true,
    maxAge: day * 24 * 60 * 60 * 1000,
  });

const deleteTokenCookie = (tokenName: string, res: Response) =>
  res.clearCookie(tokenName, {
    httpOnly: true,
  });

const getMiliSecondFormSecond = (second: number) => second * 1000;

const generatorOTP = async () =>
  await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

const skipPage = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): number => (+page - 1) * +limit;

export {
  skipPage,
  verifyToken,
  getInfoData,
  generatorOTP,
  saveTokenCookie,
  deleteTokenCookie,
  getMiliSecondFormSecond,
};
