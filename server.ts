import { Message } from "node-telegram-bot-api";
import app from "./app";
import { ENV_CONFIG } from "./src/configs";
import BotTelegram from "./src/utils/BotTelegram";
import httpTelegram from "./src/utils/httpTelegram";

// const init = async () => {
//   const res = await httpTelegram.get(
//     `${ENV_CONFIG.TELEGRAM_URL}${ENV_CONFIG.TELEGRAM_TOKEN}/setWebhook?url=${ENV_CONFIG.SERVER_URL}`
//   );
//   console.log(res.data);
// };

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, async () => {
  console.log(`Project task company listening on port ${PORT}`);

  BotTelegram.on("message", (msg: Message) => {
    const chatId = msg.from?.id || "12123";
    let message = msg.text || "";
    if (message.charAt(0) === "/") {
      switch (message) {
        case "/starting":
          message = "We starting now";
          break;
        case "/ending":
          message = "We ending now";
          break;
        case "/learning":
          message = "We learning now";
          break;
        default:
          message = "We don't now you talking about that";
          break;
      }
    } else message = msg.text || "";
    BotTelegram.sendMessage(chatId, message);
  });
});

process.on("SIGINT", () =>
  server.close(() => console.log("Exit Server Express"))
);
