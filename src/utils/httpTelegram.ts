import axios, { AxiosInstance } from "axios";
import { ENV_CONFIG } from "../configs";

class HttpTelegram {
  private static instance: HttpTelegram;
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}`,
      method: "POST",
    });
  }

  public static getInstance(): HttpTelegram {
    if (!HttpTelegram.instance) {
      HttpTelegram.instance = new HttpTelegram();
    }
    return HttpTelegram.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

const axiosSingleton = HttpTelegram.getInstance();
const axiosInstance = axiosSingleton.getAxiosInstance();

export default axiosInstance;
