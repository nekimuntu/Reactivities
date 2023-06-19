using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _accessor;
            public Handler(DataContext context, IUserAccessor accessor)
            {
            _accessor = accessor;
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                                            .Include(X=>X.Attendees).ThenInclude(u=>u.AppUser)
                                            .FirstOrDefaultAsync(x=>x.Id==request.Id);
                if (activity==null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName== _accessor.GetUsername());

                if (user==null) return null;

                var hostname = activity.Attendees.FirstOrDefault(x=>x.IsHost==true)?.AppUser?.UserName;
                var attendance = activity.Attendees.FirstOrDefault(x=>x.AppUser.UserName==user.UserName);
                if(attendance != null && hostname==user.UserName ){
                     activity.IsCanceled = !activity.IsCanceled;
                }
               if(attendance != null && hostname!=user.UserName)
                    activity.Attendees.Remove(attendance);

                if(attendance==null){
                    attendance = new ActivityAttendee
                    {
                        AppUser=user,  
                        AppUserId = user.Id,                      
                        Activity = activity,
                        ActivityId = activity.Id,
                        IsHost=false
                    };
                    activity.Attendees.Add(attendance);
                }
                var result = await _context.SaveChangesAsync() >0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("The update failed ...");
            }
        }
    }
}