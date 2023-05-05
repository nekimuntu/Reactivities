using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController: ControllerBase
    {
        private DataContext _context;
        protected DataContext Context => _context ??=
                                            HttpContext.RequestServices.GetService<DataContext>();
        private IMediator _mediatr;
        protected IMediator Mediator => _mediatr ??=
                                            HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
             if(result.IsSucces && result.Value !=null)
                return Ok(result.Value);
            if(result.IsSucces && result.Value ==null)
                return NotFound();
            return BadRequest(result.Error);
        }
        
    }
}