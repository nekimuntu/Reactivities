                        IDENTITY


In Domain namespace we add microsoft identity EntityFramework Core

theen just create a class user that inherit from IdentityUser 

__________________________
    Video 129
Change Db context to 
 :IdentityDbContext<AppUser> 

> dotnet ef migrations add IdentityAdded -p Persistence -s API

_____________________________________________________________________

We add identity as a service 

We create a new extension class : public class IdentityServiceExtension{}

 services.AddIdentityCore<AppUser>(opt=>{
                opt.Password.RequireNonAlphanumeric = false;            
            })
            .AddEntityFrameworkStores<DataContext>(); //Permet de faire une requete des users dans notre database ou EntityFrameworkStore  

_________________________________________________________________________

            SEEDING Users 

______________________________________________________________________________

                    >Authentifier les communication avec les API

installation du package : 
System.IdentityModel.Tokens.Jwt

pour creer le token 

installation de pkg
Microsoft.AspNetCore.Authentication.JwtBearer
Pour verifier la validite des requetes

dans l extension du program :

On s assure que le service est lance pour une duree equivalente a la requete HTTP 

services.AddScoped<ServiceToken>();

On configure l authentication sans valider celui qui envoe la requete ni l audience, PAR Contre on verifie qu il envoie la bonne clee de cryptage
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super secret key Super secret key Super secret key Super secret key Super secret key"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt=>{
                opt.TokenValidationParameters= new TokenValidationParameters{
                        ValidateIssuer=false,
                        ValidateIssuerSigningKey=true,
                        ValidateAudience=false,
                        IssuerSigningKey=key
                };
            });

On Ajoute un middleware : 
app.UseAuthentication();

__________________________________________________________________________________________---


We use confg["TokenKey"] to get the passphrase stored in appsettings.development.json

Also 
we add in program a line to force authentication on any controller end point 
builder.services.