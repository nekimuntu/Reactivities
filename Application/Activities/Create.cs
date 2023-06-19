using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity activity { get; set; }
        }
        //SECTION 10 Error Handling \\
        public class ActivityValidation : AbstractValidator<Command>{
            public ActivityValidation()
            {
                RuleFor(x=>x.activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context,IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName==_userAccessor.GetUsername());

                var attendee = new ActivityAttendee{
                    AppUserId = user.Id,
                    AppUser = user,
                    ActivityId=request.activity.Id,
                    IsHost = true
                };

                request.activity.Attendees.Add(attendee);
                _context.Activities.Add(request.activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result)
                    return Result<Unit>.Failure("Could not create a new activity");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}