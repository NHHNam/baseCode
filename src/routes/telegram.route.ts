import express from "express";
import { TelegramController } from "../controllers";
import { ENV_CONFIG } from "../configs";
const router = express.Router();

router
  .route(`/webhook/${ENV_CONFIG.TELEGRAM_TOKEN}`)
  .post(TelegramController.handlerMessage);

export default router;
