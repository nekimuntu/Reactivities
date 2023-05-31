using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ServiceToken _token;
        public AccountController(UserManager<AppUser> userManager, ServiceToken token)
        {
            _token = token;
            _userManager = userManager;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!result) return Unauthorized();

            return CreateUserDTO(user);
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDTO.UserName))
            {
                ModelState.AddModelError("username","Username taken");
                return ValidationProblem(ModelState);
                // return BadRequest("Username already taken");
            }
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email","Email already taken");
                return ValidationProblem(ModelState);
            }

            AppUser user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
                return CreateUserDTO(user);
            }

            return BadRequest(result.Errors);

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> getCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserDTO(user);
        }

        private UserDTO CreateUserDTO(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                image = null,
                Token = _token.CreateToken(user),
                Username = user.UserName
            };
        }

    }
}