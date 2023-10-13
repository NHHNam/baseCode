import axios from "axios";
import app from "./app";
import { ENV_CONFIG } from "./src/configs";
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, async () => {
  console.log(`Project task company listening on port ${PORT}`);

  // Init telegrambot
  const TELEGRAM_API = `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}`;
  const URI = `webhook`;
  // const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${ENV_CONFIG.SERVER_URL}/${URI}`);
  console.log(res.data);
});

process.on("SIGINT", () =>
  server.close(() => console.log("Exit Server Express"))
);
