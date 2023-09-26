import JwtTokenUtils from "../util/jwt.util";
import { NextFunction, Request, Response } from "express";
import redisUtil from "../util/redis.util"
const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
  try {
    req.body.user = await JwtTokenUtils.validate(token)
    const id = req.body.user.id
    const isLock = req.body.user.lock
    const status = await redisUtil.hGet(id,'refreshToken')
    if (status == null || status == "logout") {
      return res.status(403).json({msg:"You log out"})
    }
    if (isLock) {
      return res.status(403).json({msg:"You is blocked"})
    }
    if (req.body.user.isLock) {
      return res.status(403).json({msg:"You are blocked"})
    }
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};
export default authMiddleware
