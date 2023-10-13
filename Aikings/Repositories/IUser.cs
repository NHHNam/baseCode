using Aikings.Authencation;
using Aikings.Dtos;
using Microsoft.AspNetCore.Identity;
using Telegram.Bot.Types;

namespace Aikings.Repositories
{
    public interface IUser
    {
        public Task<List<GetAllUserDto>> GetAllUserAsync();
        public Task<GetAllUserDto> GetUserAsync(string Id);
        public Task UpdateUserAsync(string id, GetAllUserDto model);
        public Task LockUserAsync(string id, LockUserDto model);
        public Task ChangePasswordAsync(string id, ChangePasswordDto model);
    }
}
