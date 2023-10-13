import express from "express";
import { TelegramController } from "../controllers";
import { ENV_CONFIG } from "../configs";
const router = express.Router();
router
  .route(`*`)
  .post(TelegramController.handlerMessage);

export default router;
