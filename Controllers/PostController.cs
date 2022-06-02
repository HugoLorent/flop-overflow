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
            var post = await _context.Posts
                                     .Include(p => p.User)
                                     .FirstAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Post/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, PostItem post)
        {
            post.Id = id;
            post.Date = DateTime.Now;

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
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return post;
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(u => u.Id == id);
        }

        // ===============
        // === COMMENT ===
        // ===============

        // GET: api/Post/1/Comment
        [HttpGet]
        [Route("{postId:int}/Comment")]
        public async Task<ActionResult<IEnumerable<CommentItem>>> GetComments(int postId)
        {
            return await _context.Comments
                                 .Include(c => c.User)
                                 .Include(c => c.Post)
                                 .Where(c => c.Post_id == postId)
                                 .ToListAsync();
        }

        // GET: api/Post/1/Comment/1
        [HttpGet]
        [Route("{postId:int}/Comment/{commentId:int}")]
        public async Task<ActionResult<CommentItem>> GetComment(int postId, int commentId)
        {
            var comment = await _context.Comments
                                        .Include(c => c.User)
                                        .Include(c => c.Post)
                                        .FirstAsync(c => c.Id == commentId && c.Post_id == postId);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // POST: api/Post/1/Comment
        [HttpPost("{postId:int}/Comment")]
        public async Task<ActionResult<CommentItem>> PostComment(int postId, CommentItem comment)
        {
            comment.Post_id = postId;
            comment.Date = DateTime.Now;
            comment.Likes = 0;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComment), new { postId = postId, commentId = comment.Id }, comment);
        }

        // PUT: api/Post/1/Comment/1
        [HttpPut]
        [Route("{postId:int}/Comment/{commentId:int}")]
        public async Task<IActionResult> PutComment(int postId, int commentId, CommentItem comment)
        {
            comment.Id = commentId;
            comment.Post_id = postId;
            comment.Date = DateTime.Now;

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(postId, commentId))
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

        private bool CommentExists(int postId, int commentId)
        {
            return _context.Comments.Any(c => c.Id == commentId && c.Post_id == postId);
        }
    }
}
