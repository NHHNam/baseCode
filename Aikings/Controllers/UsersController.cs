using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Aikings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUser _userRepository;
        private readonly UserManager<ApplicationUser> userManager;
        public UsersController(IUser userRepository, UserManager<ApplicationUser> userManager)
        {
            _userRepository = userRepository;
            this.userManager = userManager;        }

        [AllowAnonymous]
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                return Ok(await _userRepository.GetAllUserAsync());
            }
            catch
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpGet("GetUserBy/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(string id, GetAllUserDto model)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.FullName = model.FullName;
            user.Email = model.Email;

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok("User updated successfully.");
            }
            else
            {
                // Handle validation errors or other errors here
                return BadRequest(result.Errors);
            }
        }

        [AllowAnonymous]
        [HttpPut("LockOrUnLockUser/{id}")]
        public async Task<IActionResult> LockUser(string id, LockUserDto model)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (model.LockoutEnabled.HasValue)
            {
                user.LockoutEnabled = model.LockoutEnabled.Value;
            }

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok("User updated successfully.");
            }
            else
            {
                // Handle validation errors or other errors here
                return BadRequest(result.Errors);
            }
        }

        [AllowAnonymous]
        [HttpPut("ChangePassword")]
        public async Task<IActionResult>ChangePassword(string id, ChangePasswordDto model)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (model.NewPassword != model.ConfirmPassword)
            {
                return BadRequest("New password and confirm password do not match.");
            }

            var success = await userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (success.Succeeded)
            {
                return Ok("User updated successfully.");
            }
            else
            {
                // Handle validation errors or other errors here
                return BadRequest(success);
            }
        }

        //[AllowAnonymous]
        //[HttpPost("RefreshPassword")]
        //public async Task<IActionResult> RefreshPassword(string email)
        //{
        //    try
        //    {
        //        var user = await userManager.FindByEmailAsync(email);
        //        if (user == null)
        //        {
        //            return NotFound("User not found.");
        //        }

        //        // Generate a new password (you can use a library or generate it yourself)
        //        string newPassword = GenerateRandomPassword();

        //        // Send the new password via email
        //        await emailService.SendPasswordResetEmailAsync(email, newPassword);

        //        // Update the user's password
        //        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        //        await userManager.ResetPasswordAsync(user, token, newPassword);

        //        return Ok("Password refreshed successfully. Check your email for the new password.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //private string GenerateRandomPassword()
        //{
        //    // Implement your own logic to generate a random password
        //    // Example: Generate a random string with 10 characters
        //    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&-_";
        //    var random = new Random();
        //    var newPassword = new string(Enumerable.Repeat(chars, 10).Select(s => s[random.Next(s.Length)]).ToArray());

        //    return newPassword;
        //}
    }
}
