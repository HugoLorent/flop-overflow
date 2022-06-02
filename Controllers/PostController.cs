using FlopOverflow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlopOverflow.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private MyDbContext _context;

        public PostController(MyDbContext context)
        {
            _context = context;
        }

        // ============
        // === POST ===
        // ============

        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostItem>>> GetPosts()
        {
            return await _context.Posts
                                 .Include(p => p.User)
                                 .ToListAsync();
        }

        // GET: api/Post/1
        [HttpGet("{id}")]
        public async Task<ActionResult<PostItem>> GetPost(int id)
        {
            var Post = await _context.Posts
                                     .Include(p => p.User)
                                     .FirstAsync(p => p.Id == id);

            if (Post == null)
            {
                return NotFound();
            }

            return Post;
        }

        // PUT: api/Post/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, PostItem post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Post
        [HttpPost]
        public async Task<ActionResult<PostItem>> PostPost(PostItem post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PostItem>> DeletePost(int id)
        {
            var Post = await _context.Posts.FindAsync(id);

            if (Post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(Post);
            await _context.SaveChangesAsync();

            return Post;
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(u => u.Id == id);
        }

        // ===============
        // === COMMENT ===
        // ===============

        // POST: api/Post/1/Comment
        [HttpPost("{postId}")]
        public async Task<ActionResult<CommentItem>> PostComment(int postId, CommentItem comment)
        {
            comment.Post_id = postId;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment; // to check
        }
    }
}
