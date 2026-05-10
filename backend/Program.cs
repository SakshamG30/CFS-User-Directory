using backend.Data;
using backend.DTOs;
using backend.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var connDbString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddSqlite<UserProfileContext>(connDbString);

// To ensure new instance will be created for each HTTP request, and the same instance will be used within that request.
// builder.Services.AddScoped<UserProfileContext>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://dev-4mwvp3ujugaiq3kv.us.auth0.com/";
        options.Audience = "https://localhost:5111/api/users";
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowReactApp");

app.MapUserEndpoints();

app.UseHttpsRedirection();

app.MigrateDb();

app.MapControllers();

app.Run();