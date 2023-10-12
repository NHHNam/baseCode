using Aikings.Dtos;

namespace Aikings.Repositories
{
    public interface IUser
    {
        public Task<List<GetAllUserDto>> GetAllUserAsync();
        public Task<GetAllUserDto> GetUserAsync(string Id);
        public Task UpdateUserAsync(string id, GetAllUserDto model);
    }
}
