import { NextFunction, Request, Response } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    console.log(token);
    if (token) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
