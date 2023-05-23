using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;

            private readonly DataContext _context;
            public Handler(DataContext context, ILogger<List> logger, IMapper mapper)
            {
                _mapper = mapper;
                _logger = logger;
                _context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                ///A utiliser si l on veux implementer l annulation par le client \\\
                // try
                // {
                //     for (int i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000,cancellationToken);
                //         _logger.LogInformation($"Task {i} completed");
                //     }
                // }
                // catch (System.Exception)
                // {

                //     _logger.LogInformation("Task was canceled by user") ;
                // }

                var listWithAttendees = await _context.Activities
                                                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                                                    .ToListAsync(cancellationToken);
                
                return Result<List<ActivityDto>>.Success(listWithAttendees);
            }
        }
    }
}