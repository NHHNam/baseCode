import JwtTokenUtils from "../util/jwt.util";
import { NextFunction, Request, Response } from "express";

const authAdminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
  try {
    req.body.user = await JwtTokenUtils.validate(token)
    if (req.body.user.role != "Admin") {
      return res.status(403).json({msg:"Only Admin"})
    }
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};
export default authAdminMiddleware
