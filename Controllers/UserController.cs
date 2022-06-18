using FlopOverflow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAuthentificationToken.Controllers;

namespace FlopOverflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private MyDbContext _context;

        public UserController(IConfiguration config, MyDbContext context)
        {
            _config = config;
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserItem>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/1
        [HttpGet("{id}")]
        public async Task<ActionResult<UserItem>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/User/Toto
        [HttpGet("search/{login}")]
        public async Task<ActionResult<UserItem>> GetUserByLogin(string login)
        {
            var user = await _context.Users.Where(u => u.Login == login).FirstAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserItem user)
        {

            user.Id = id;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        [HttpPost]
        public IActionResult PostUser(UserItem user)
        {
            if(user.Login != null && user.Login.Any() && user.Pwd != null && user.Pwd.Any())
            {
                _context.Users.Add(user);
                _context.SaveChanges();

                LoginController lc = new LoginController(_config, _context);

                return Ok(lc.Generate(user));
            }
            else
            {
                return BadRequest();
            }

        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserItem>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
    }
}
