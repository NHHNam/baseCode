import Bot from "node-telegram-bot-api";
import { ENV_CONFIG } from "../configs";

class BotTelegram {
  instanceTele: Bot;

  constructor() {
    this.instanceTele = new Bot(ENV_CONFIG.TELEGRAM_TOKEN, {
      polling: true,
    });
  }

  getInstance() {
    if (!this.instanceTele)
      return new Bot(ENV_CONFIG.TELEGRAM_TOKEN, {
        polling: true,
      });
    return this.instanceTele;
  }
}

export default new BotTelegram().getInstance();
