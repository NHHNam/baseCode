import { NextFunction, Response, Request } from "express";

export default class UserController {
    static getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return res.status(200).json({ OK: "OK" });
    };

    static createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return res.status(201).json(req.body);
    };

    static updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return res.status(201).json({ ...req.body, ...req.params });
    };

    static getUserByid = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return res.status(201).json({ ...req.params });
    };

    static DeleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return res.status(201).json({ ...req.params });
    };
}
