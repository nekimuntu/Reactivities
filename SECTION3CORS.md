                        Video 27 CORS setup
Parce que la requete du client vient du port 3000 l' API considere que l origine de la requete est d un autre serveur
C est pourtant le browser qui interdit la recuperation des donnees 
On doit rajouter dans le HEADER qu il est authorise de recuperer des donnes a partir de locahost:3000

builder.Services.AddCors(opt=>{
    opt.AddPolicy("ReactivitiesCORSPolicy",policy=>{
        policy.AllowAnyMethod().WithOrigins("*");
    });
});

Here we call the collection of services to specify the AddCors policy
I didnt specify the host name : http://localhost:3000 which i will have to modify for prod

then you trigger the CORS here : 
app.UseCors("ReactivitiesCORSPolicy");
IMPORTANT : to place before Authentication or Authorization