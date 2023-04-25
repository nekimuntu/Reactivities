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
        
    }
}