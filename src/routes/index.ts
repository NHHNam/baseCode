import express from "express";
const router = express.Router();

import authRouter from "./auth.route";
import userRouter from "./user.route";
import postRouter from "./post.route";
import adminRouter from "./admin.route";
import paymentRouter from "./payment.route";
import {
  API_V1_AUTH,
  API_V1_POST,
  API_V1_USER,
  API_V1_ADMIN,
  API_V1_PAYMENT,
} from "../constant/path/v1";

router.use(API_V1_AUTH.mainPath, authRouter);
router.use(API_V1_USER.mainPath, userRouter);
router.use(API_V1_POST.mainPath, postRouter);
router.use(API_V1_ADMIN.mainPath, adminRouter);
router.use(API_V1_PAYMENT.mainPath, paymentRouter);

export default router;
