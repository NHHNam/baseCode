using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aikings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPost _postRepository;

        public PostController(IPost postRepository)
        {
            _postRepository = postRepository;
        }

        [AllowAnonymous]
        [HttpGet("GetAllPosts")]
        public async Task<ActionResult> GetAllPosts()
        {
            try
            {
                return Ok(await _postRepository.GetAllPostAsync());
            }
            catch
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpGet("GetBy{id}")]
        public async Task<ActionResult> GetPostById(int id)
        {
            var posts = await _postRepository.GetPostAsync(id);
            return posts == null ? NotFound() : Ok(posts);

        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("AddPost")]
        public async Task<ActionResult> AddNewPost(PostDto model)
        {
            var newPost = await _postRepository.AddPostAsync(model);
            var posts = await _postRepository.GetPostAsync(newPost);
            return posts == null ? NotFound() : Ok(posts);
        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("UpdatePost{id}")]
        public async Task<IActionResult> UpdatePost(int id, PostDto model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _postRepository.UpdatePostAsync(id, model);
            return Ok();
        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("DeleteBy{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _postRepository.GetPostAsync(id);

            if (post == null)
            {
                return NotFound();
            }
            await _postRepository.DeletePostAsync(id);
            return Ok();
        }

        [HttpPost("SearchPost")]
        public async Task<IActionResult> SearchPosts(PostSearchDto searchModel)
        {
            var users = await _postRepository.GetAllPostAsync(); // Assuming GetAllUserAsync fetches all users

            if (searchModel != null)
            {
                if (!string.IsNullOrEmpty(searchModel.Title))
                {
                    users = users
                        .Where(u => u != null && u.Title != null && u.Title.Contains(searchModel.Title))
                        .ToList();
                }

                if (!string.IsNullOrEmpty(searchModel.Description))
                {
                    users = users
                        .Where(u => u != null && u.Description != null && u.Description.Contains(searchModel.Description)).ToList();
                }
            }

            return Ok(users);
        }
    }
}
