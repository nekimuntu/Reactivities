using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly ILogger<List> _logger;

            private readonly DataContext _context;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
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

                return await _context.Activities.ToListAsync();
            }
        }
    }
}