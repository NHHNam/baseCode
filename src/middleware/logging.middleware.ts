import { NextFunction, Request, Response } from "express";
import logging from "../helper/logging";

export default function loggingReq(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let userInfo: any;
  if (req.app.locals.user) userInfo = req.app.locals.user;
  logging({
    method: req.method,
    url: req.url,
    ...userInfo,
  });
  next();
}
