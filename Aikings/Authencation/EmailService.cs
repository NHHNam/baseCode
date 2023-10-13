using System.Net.Mail;
using System.Net;

namespace Aikings.Authencation
{
    public class EmailService
    {
        private readonly SmtpClient smtpClient;

        public EmailService(string smtpServer, int smtpPort, string smtpUsername, string smtpPassword)
        {
            smtpClient = new SmtpClient(smtpServer)
            {
                Port = smtpPort,
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true,
            };
        }

        public async Task SendPasswordResetEmailAsync(string toEmail, string newPassword)
        {
            var fromAddress = new MailAddress("20520272@gm.uit.edu.com", "Test");
            var toAddress = new MailAddress(toEmail);
            var subject = "Password Reset";
            var body = $"Your new password is: {newPassword}";

            var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };

            await smtpClient.SendMailAsync(message);
        }
    }
}
