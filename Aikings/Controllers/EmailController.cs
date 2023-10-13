using Aikings.Authencation;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System.Net;
using System.Net.Mail;

namespace Aikings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        
        public EmailController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }
        [HttpPost("RefreshPassword")]
        public async Task<IActionResult> SendEmail(string userEmail)
        {
            //Tạo mail ảo, test trên ethereal.email
            var fromAddress = new MailAddress("stefanie.lindgren@ethereal.email", "Stefanie Lindgren");
            var toAddress = new MailAddress(userEmail, "Recipient Name");
            string newPassword = GenerateRandomPassword();
            var smtpClient = new SmtpClient
            {
                Host = "smtp.ethereal.email", // Replace with your SMTP server's address
                Port = 587, // Replace with the SMTP server's port
                Credentials = new NetworkCredential("stefanie.lindgren@ethereal.email", "3Vgrzhzzh1ruEsxb2B"), // Replace with your SMTP email and password
                EnableSsl = true, // Use SSL if required by your SMTP server
            };

            var mailMessage = new MailMessage(fromAddress, toAddress)
            {
                Subject = "Password Reset Instructions",
                Body = $"<p>Your new password is: {newPassword}</p>",
                IsBodyHtml = true,
            };
            try
            {
                var user = await userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    return NotFound("User not found.");
                }
                smtpClient.Send(mailMessage);
       

                // Update the user's password
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                await userManager.ResetPasswordAsync(user, token, newPassword);

                return Ok("Password refreshed successfully. Check your email for the new password.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to send the email: {ex.Message}");
            }
        }

        private string GenerateRandomPassword()
        {
            const string uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            const string digitChars = "0123456789";
            const string specialChars = "@#$%&-_"; // Add more special characters as needed

            var random = new Random();
            var password = new char[8]; // You can adjust the password length as needed

            // Add at least one character from each character set
            password[0] = uppercaseChars[random.Next(uppercaseChars.Length)];
            password[1] = lowercaseChars[random.Next(lowercaseChars.Length)];
            password[2] = digitChars[random.Next(digitChars.Length)];
            password[3] = specialChars[random.Next(specialChars.Length)];

            // Fill the remaining characters with a mix of all character sets
            for (int i = 4; i < password.Length; i++)
            {
                string charSet = uppercaseChars + lowercaseChars + digitChars + specialChars;
                password[i] = charSet[random.Next(charSet.Length)];
            }

            // Shuffle the characters in the password
            for (int i = password.Length - 1; i > 0; i--)
            {
                int j = random.Next(i + 1);
                char temp = password[i];
                password[i] = password[j];
                password[j] = temp;
            }

            return new string(password);
        }
    }
}
