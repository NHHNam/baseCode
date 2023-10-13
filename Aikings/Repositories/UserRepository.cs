using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NETCore.MailKit.Core;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Mail;
using Telegram.Bot.Types;

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

        public async Task LockUserAsync(string id, LockUserDto model)
        {
            if (id == model.Id)
            {
                var lockUsers = _mapper.Map<ApplicationUser>(model);
                _context.ApplicationUsers.Update(lockUsers);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ChangePasswordAsync(string id, ChangePasswordDto model)
        {
            if (id == model.Id)
            {
                var users = _mapper.Map<ApplicationUser>(model);
                _context.ApplicationUsers.Update(users);
                await _context.SaveChangesAsync();
            }
        }
    }
}
