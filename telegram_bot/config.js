const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN_TELEGRAM;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name; // Lấy first name
    const lastName = msg.from.last_name;
    let message = "Khong hop le";
    if (msg.text === "Hi") {
        message = 'Xin chào ' + firstName + ' ' + lastName + '\nChúng tôi đã nhận được phản hồi của bạn.\nNhân viên của chúng tôi sẽ sớm liên hệ lại với bạn.\nChúc bạn có một ngày tốt lành.';

    } else if (msg.text === "fb") {
        message = "https://www.facebook.com/";
    } else if (msg.text === "thoitiet") {
        message = "https://www.accuweather.com/vi/vn/ho-chi-minh-city/353981/hourly-weather-forecast/353981";
    }
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, message);
});