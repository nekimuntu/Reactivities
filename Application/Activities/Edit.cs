using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public Activity activity { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            
            private readonly IMapper _mapper;

            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity != null)
                {
                    request.activity.Id = activity.Id;
                    _mapper.Map<Activity,Activity>(request.activity,activity);
                }
                _context.Activities.Update(activity);
                _context.SaveChanges();
                return Unit.Value;
            }
        }
    }
}