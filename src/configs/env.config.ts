const ENV_CONFIG = {
  PORT: process.env.PORT || 9000,
  MY_EMAIL: process.env.MY_EMAIL || "hson22102000@gmail.com",
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD || "",
  LOCAL_HOST_SERVER: process.env.LOCAL_HOST_SERVER || "http://localhost:9000",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || "",
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || "",
  MONGO_URI: process.env.MONGO_URI || "",
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || "",
  TELEGRAM_URL: process.env.TELEGRAM_URL || "https://api.telegram.org/bot",
  SERVER_URL: process.env.SERVER_URL || "https://0ce5-27-65-225-94.ngrok-free.app",
};

export default ENV_CONFIG;
