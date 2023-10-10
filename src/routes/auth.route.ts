import express from "express";
import { API_V1_AUTH } from "../constant/path/v1";
import { AuthController } from "../controllers";
const router = express.Router();

router.route(API_V1_AUTH.feature.login).post(AuthController.login);
router.route(API_V1_AUTH.feature.logout).get(AuthController.logout);
router.route(API_V1_AUTH.feature.generateOTP).post(AuthController.generateOTP);
router
  .route(API_V1_AUTH.feature.createSessionRegister)
  .post(AuthController.createSessionRegister);
router
  .route(API_V1_AUTH.feature.confirmRegister)
  .post(AuthController.confirmRegister);
router
  .route(API_V1_AUTH.feature.createSessionResetPassword)
  .post(AuthController.createSessionResetPassword);
router
  .route(API_V1_AUTH.feature.confirmOTPResetPassword)
  .post(AuthController.confirmOTPResetPassword);
router
  .route(API_V1_AUTH.feature.confirmResetPassword)
  .post(AuthController.confirmResetPassword);
router
  .route(API_V1_AUTH.feature.refreshAccessToken)
  .get(AuthController.refreshAccessToken);

export default router;
