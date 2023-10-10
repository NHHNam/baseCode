import axios, { AxiosInstance } from "axios";
import { ENV_CONFIG } from "../configs";

class HttpTelegram {
  baseUrl: string;
  instance: AxiosInstance;
  constructor() {
    this.baseUrl = ENV_CONFIG.TELEGRAM_URL + ENV_CONFIG.TELEGRAM_TOKEN;
    this.instance = axios.create({
      baseURL: this.baseUrl,
    });
  }
}

export default new HttpTelegram().instance;
