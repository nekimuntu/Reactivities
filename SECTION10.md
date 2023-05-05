                    ERROR VALIDATION 

It is possible to add an annotation to each of the domains' fields
using : [Required]

however the purpose here is to have the validation at application level...

                FLUENT VALIDATION vid 102 

in Nuget we install fluentvalidation  ^11

                Vid 107 Middleware handle exception 

to add the class we created to manage exception in the HTTP request pipeline : 

app.UseMiddleware<ExceptionMiddleware>();

we created in application/CORE the class AppException{}

and in API/Midleware : ExceptionMiddleware

                    Vid 108 client side error mgt 

we created a controller to send errors BuggyController 
and on client side a TestError.tsx that shot api to this controller 

now to notify the user we install 

npm install react-toastify


                        Re SEED fresh n clean datas 

on the sln level (Reactivities folder)
 > dotnet ef database drop -s API -p Persistence


