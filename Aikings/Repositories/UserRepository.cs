using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Aikings.Repositories
{
    public class UserRepository : IUser
    {
            private readonly ApplicationDbContext _context;
            private readonly IMapper _mapper;

            public UserRepository(ApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;

            }

        public async Task<List<GetAllUserDto>> GetAllUserAsync()
        {
            var users = await _context.ApplicationUsers.ToListAsync();
            return _mapper.Map<List<GetAllUserDto>>(users);
        }

        public async Task<GetAllUserDto> GetUserAsync(string id)
        {
            var users = await _context.ApplicationUsers.FindAsync(id);
            return _mapper.Map<GetAllUserDto>(users);
        }

        public async Task UpdateUserAsync(string id, GetAllUserDto model)
        {
            if (id == model.Id)
            {
                var updateUsers = _mapper.Map<ApplicationUser>(model);
                _context.ApplicationUsers.Update(updateUsers);
                await _context.SaveChangesAsync();
            }
        }
    }
}
