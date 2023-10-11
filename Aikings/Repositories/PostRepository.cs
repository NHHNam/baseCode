using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Aikings.Repositories
{
    public class PostRepository : IPost
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PostRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<int> AddPostAsync(PostDto model)
        {
            var newPost = _mapper.Map<Post>(model);
            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();
            return newPost.Id;
        }

        public async Task DeletePostAsync(int id)
        {
            var deletePost = _context.Posts.SingleOrDefault(x => x.Id == id);
            if (deletePost != null)
            {
                _context.Posts.Remove(deletePost);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<PostDto>> GetAllPostAsync()
        {
            var posts = await _context.Posts.ToListAsync();
            return _mapper.Map<List<PostDto>>(posts);
        }

        public async Task UpdatePostAsync(int id, PostDto model)
        {
            if (id == model.Id)
            {
                var updatePost = _mapper.Map<Post>(model);
                _context.Posts.Update(updatePost);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<PostDto> GetPostAsync(int id)
        {
            var posts = await _context.Posts.FindAsync(id);
            return _mapper.Map<PostDto>(posts);
        }
    }
}
