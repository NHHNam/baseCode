using Aiking.Dtos;
using Aiking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aiking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        /// <summary>
        /// Retrieves a list of items.
        /// </summary>
        /// <remarks>This endpoint returns a list of items.</remarks>
        /// <returns>A list of items.</returns>
        // GET: api/Payments
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

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPostById(int id)
        {
            var posts = await _postRepository.GetPostAsync(id);
            return posts == null ? NotFound() : Ok(posts);

        }

        [HttpPost("AddPost")]
        public async Task<ActionResult> AddNewPost(PostDto model)
        {
            var newPost = await _postRepository.AddPostAsync(model);
            var posts = await _postRepository.GetPostAsync(newPost);
            return posts == null ? NotFound() : Ok(posts);
        }

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

        [HttpDelete("{id}")]
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
    }
}
