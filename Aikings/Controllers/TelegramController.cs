using Microsoft.AspNetCore.Mvc;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace Aikings.Controllers
{
    [Route("api/telegram")]
    [ApiController]
    public class TelegramController : ControllerBase
    {
        private readonly ITelegramBotClient _botClient;

        public TelegramController(IConfiguration configuration)
        {
            // Retrieve the Telegram Bot API token from your appsettings.json or environment variables.
            var botToken = configuration["TelegramBotToken"];
            _botClient = new TelegramBotClient(botToken);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(Update update)
        {
            if (update == null)
            {
                return Ok();
            }

            var chatId = update.Message.Chat.Id;
            var text = "Hello, Telegram Bot!";
            await _botClient.SendTextMessageAsync(chatId, text);

            return Ok();
        }
    }
}
