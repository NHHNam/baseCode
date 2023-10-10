import { Express, Request, Response, NextFunction } from "express";
import adminRouter from "./Admin.Route"
import userRouter from "./User.Route";
const routes = (app: Express) => {
    app.use("/user", userRouter);
    app.use("/admin",adminRouter);
};

export default routes;


