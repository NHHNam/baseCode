using Aiking.Dtos;
using Microsoft.AspNetCore.Identity;

namespace Aiking.Repositories
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> SignUpAsync(SignUpDto model);
        public Task<string> SignInAsync(SignInDto model);
    }
}
