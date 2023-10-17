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
            string newPassword = GenerateRandomPassword();

            var senderEmail = "20520272@gm.uit.edu.vn"; 
            var senderName = "ABC";              
            var senderPassword = "1017781747";       
            var smtpServer = "smtp.gmail.com";   
            var smtpPort = 587;                       
            var enableSsl = true;                   

            // Create sender's email address
            var fromAddress = new MailAddress(senderEmail, senderName);
            var toAddress = new MailAddress(userEmail, "Recipient Name");

            // Create an SMTP client with your email settings
            var smtpClient = new SmtpClient
            {
                Host = smtpServer,
                Port = smtpPort,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = enableSsl,
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

        private string GenerateOTP()
        {
            const string chars = "0123456789";
            var random = new Random();
            var otp = new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            return otp;
        }

        [HttpPost("SendOTP")]
        public async Task<IActionResult> SendOTP(string userEmail)
        {
            var user = await userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var otp = GenerateOTP();

            // Store the OTP in the database
            user.OTP = otp;
            await userManager.UpdateAsync(user);

            // Send the OTP to the user (email)
            var senderEmail = "20520272@gm.uit.edu.vn";
            var senderName = "ABC";
            var senderPassword = "1017781747";
            var smtpServer = "smtp.gmail.com";
            var smtpPort = 587;
            var enableSsl = true;

            // Create sender's email address
            var fromAddress = new MailAddress(senderEmail, senderName);
            var toAddress = new MailAddress(userEmail, "Recipient Name");

            // Create an SMTP client with your email settings
            var smtpClient = new SmtpClient
            {
                Host = smtpServer,
                Port = smtpPort,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = enableSsl,
            };
            var mailMessage = new MailMessage(fromAddress, toAddress)
            {
                Subject = "OTP Reset Instructions",
                Body = $"<p>Your OTP is: {otp}</p>",
                IsBodyHtml = true,
            };
            smtpClient.Send(mailMessage);
            return Ok("OTP sent successfully. Please check your email or phone.");
        }
        [HttpPost("VerifyOTPAndResetPassword")]
        public async Task<IActionResult> VerifyOTPAndResetPassword(string userEmail, string enteredOTP, string newPassword)
        {
            var user = await userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (user.OTP != enteredOTP)
            {
                return BadRequest("Invalid OTP. Please try again.");
            }

            // Reset the user's password
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var result = await userManager.ResetPasswordAsync(user, token, newPassword);

            if (result.Succeeded)
            {
                // Clear the OTP after a successful password reset
                user.OTP = null;
                await userManager.UpdateAsync(user);
                return Ok("Password reset successful.");
            }

            return BadRequest("Failed to reset the password. Please try again.");
        }

       
    }
}
