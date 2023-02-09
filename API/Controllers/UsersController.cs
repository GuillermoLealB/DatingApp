
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers 
{
    [Authorize]
    public class UsersController : BaseApiController      ///AVOID REPEAT THE ROUTE
    {
        
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
           
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() /// IN action result you can send http response like = badrequest();
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUsers(int id )
        {
            return await _context.Users.FindAsync(id);
            
        }
    }
}