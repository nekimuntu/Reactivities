22/05/2023

                            vid 157 

Pour faire un "Many-to-Many" relation 
tu rajoute une collection de la table etrangere

dans la classe de domaine Activity :  
public ICollection<AppUser> Attendees {get;set;}

ET dans User class :
public ICollection<Activity> Activities {get;set;}

_______
2nd meethod :

Create a class in DOmain that is the union of the two entities : ActivityAppUser 

the properties are the Id and the 2 objects (User,Activity)
we add how custom properties as well : IsHost  

The two domain classes needs a new property of type ICollection<ActivityAppUser>

THEN add in the dbContext  the DbSet of this new class 
configure the primary key (ActivityId, AppUserID)
and then configure the foreign keys : thanks to the override of the method OnModelCreating()

public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities {get;set;}
        public DbSet<ActivityAppUser> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAppUser>(x=>x.HasKey(aa=> new {aa.ActivityId,aa.AppUserId}));

            builder.Entity<ActivityAppUser>()
                .HasOne(a=>a.AppUser).WithMany(a=>a.Activities).HasForeignKey(x=>x.AppUserId);
            builder.Entity<ActivityAppUser>()
                .HasOne(a=>a.Activity).WithMany(a=>a.Attendees).HasForeignKey(x=>x.ActivityId);                   
            
            ___________________________________________________________________________________________________
                                    Intercept user who create Activity 

> dotnet new classlib -n Infrastructure 
> dotnet sln add Infrastructure 

> cd Infra...
> dotnet add reference ../Application  


