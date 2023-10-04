import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { ForbiddenError, UnauthenticatedError } from "../core/error.response";
import { TokenRepository, UserRepository } from "../repositories";
import { deleteTokenCookie } from "../utils";
import { VALUE_CONSTANT } from "../constant";
import { ERole } from "../enum";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new UnauthenticatedError("Invalid credential AT");

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new UnauthenticatedError("Vui lòng đăng nhập lại");

  const tokenStore = await TokenRepository.getRefreshTokenUsing(refreshToken);
  if (!tokenStore) throw new UnauthenticatedError("Invalid credential RT 2");
  try {
    JWT.verify(refreshToken, tokenStore.token_publicKey);
  } catch (error) {
    await TokenRepository.deleteByRefreshToken(refreshToken);
    deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
    throw new UnauthenticatedError(
      "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại"
    );
  }

  try {
    const payload: any = JWT.verify(
      accessToken.split(" ")[1].trim(),
      tokenStore.token_publicKey
    );
    req.app.locals.user = payload;
  } catch (error) {
    throw new UnauthenticatedError("AT hết hạn");
  }

  next();
};

const checkAuthIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new UnauthenticatedError("Invalid credential AT");

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new UnauthenticatedError("Vui lòng đăng nhập lại");

  const tokenStore = await TokenRepository.getRefreshTokenUsing(refreshToken);
  if (!tokenStore) throw new UnauthenticatedError("Invalid credential RT 2");
  try {
    JWT.verify(refreshToken, tokenStore.token_publicKey);
  } catch (error) {
    await TokenRepository.deleteByRefreshToken(refreshToken);
    deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
    throw new UnauthenticatedError(
      "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại"
    );
  }

  try {
    const payload: any = JWT.verify(
      accessToken.split(" ")[1].trim(),
      tokenStore.token_publicKey
    );
    req.app.locals.user = payload;
  } catch (error) {
    throw new UnauthenticatedError("AT hết hạn, refresh lại token mau lên!");
  }

  const { userEmail } = req.app.locals.user;
  const user = await UserRepository.getUserByEmail(userEmail);

  if (!user || user.user_role !== ERole.ADMIN)
    throw new ForbiddenError("Không có quyền ADMIN");

  next();
};

export { authentication, checkAuthIsAdmin };
