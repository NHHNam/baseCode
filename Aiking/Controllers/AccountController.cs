using Aiking.Dtos;
using Aiking.Models;
using Aiking.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Aiking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository repo)
        {
            _accountRepository = repo;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> SignUp(SignUpDto model)
        {
            var result = await _accountRepository.SignUpAsync(model);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }

            return Unauthorized();
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInDto model)
        {
            var result = await _accountRepository.SignInAsync(model);
            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }

            return Ok(result);
        }
    }
}


//        private readonly UserManager<User> userManager;
//        private readonly RoleManager<User> roleManager;
//        private readonly SignInManager<User> signInManager;
//        private readonly IConfiguration _configuration;

//        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
//        {
//            this.userManager = userManager;
//            this.signInManager = signInManager;
//            _configuration = configuration;
//        }
//        public async Task<string> SignInAsync(SignInDto model)
//        {
//            var result = await signInManager.PasswordSignInAsync
//                (model.UserName, model.Password, false, false);

//            if (!result.Succeeded)
//            {
//                return string.Empty;
//            }

//            var authClaims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Surname, model.UserName),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//            };

//            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

//            var token = new JwtSecurityToken
//                (
//                    issuer: _configuration["JWT:ValidIssuer"],
//                    audience: _configuration["JWT:ValidAudience"],
//                    expires: DateTime.Now.AddMinutes(30),
//                    claims: authClaims,
//                    signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha512Signature)
//                );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }

//        public async Task<IdentityResult> SignUpAsync(SignUpDto model)
//        {
//            var userExist = await userManager.FindByNameAsync(model.UserName);
//            if (userExist != null)
//            {
//                return BadRequest();
//                //return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Already Exist" });
//            }
//            User user = new User()
//            {
//                Email = model.Email,
//                SecurityStamp = Guid.NewGuid().ToString(),
//                UserName = model.UserName,
//            };

//            var result = await userManager.CreateAsync(user, model.Password);
//            if (!result.Succeeded)
//            {
//                return new BadRequestObjectResult(new Response { Status = "Error", Message = "User Creation Failed" });
//                //return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Creation Fail" });
//            }

//            return Ok(new Response { Status = "Success", Message = "User Created Successfully" });
//        }

//    }
//}
