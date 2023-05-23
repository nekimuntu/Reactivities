using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAppUser> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAppUser>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<ActivityAppUser>()
                .HasOne(u => u.AppUser).WithMany(a => a.Activities).HasForeignKey(x => x.AppUserId);
            builder.Entity<ActivityAppUser>()
                .HasOne(a => a.Activity).WithMany(u => u.Attendees).HasForeignKey(x => x.ActivityId);

        }
    }
}