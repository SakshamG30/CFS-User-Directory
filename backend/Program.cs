using backend.Data;
using backend.DTOs;
using backend.Endpoints;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connDbString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddSqlite<UserProfileContext>(connDbString);

// To ensure new instance will be created for each HTTP request, and the same instance will be used within that request.
// builder.Services.AddScoped<UserProfileContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapUserEndpoints();

app.UseHttpsRedirection();

app.MigrateDb();

app.Run();