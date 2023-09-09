import { Express, Request, Response, NextFunction } from "express";

import userRouter from "./user.route";
import postRouter from "./post.route";

const routes = (app: Express) => {
    app.use("/users", userRouter);
    app.use("/posts", postRouter);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const statsCode = err.status || 500;
        res.status(statsCode).json({
            code: statsCode,
            message: err.message || "Internal server error",
        });
    });
};

export default routes;
