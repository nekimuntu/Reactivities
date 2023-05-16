using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtension
    {
       
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config )
        {
            services.AddIdentityCore<AppUser>(opt=>{
                opt.Password.RequireNonAlphanumeric = false;  
                opt.User.RequireUniqueEmail = true;          
            })
            .AddEntityFrameworkStores<DataContext>(); //Permet de faire une requete des users dans notre database ou EntityFrameworkStore  

            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt=>{
                opt.TokenValidationParameters= new TokenValidationParameters{
                        ValidateIssuer=false,
                        ValidateIssuerSigningKey=true,
                        ValidateAudience=false,
                        IssuerSigningKey=key
                };
            });

            services.AddScoped<ServiceToken>();
            return services;
        }

    }
}