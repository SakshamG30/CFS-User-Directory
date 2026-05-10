using System.Reflection.Metadata.Ecma335;
using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Mappings;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class UserEndPoints
{
    private static readonly List<UserDTO> users = new List<UserDTO>
    {
        new(1, "John Doe", 30, "New York", "NY", "10001"),
        new(2, "Jane Smith", 25, "Los Angeles", "CA", "90001"),
        new(3, "Alice Johnson", 28, "Chicago", "IL", "60601")
    };

    public static RouteGroupBuilder MapUserEndpoints(this WebApplication app)
    {
        const string baseNameById = "GetUserById";

        var group = app.MapGroup("api/users").WithParameterValidation();

        // GET ALL USERS
        group.MapGet("/", (UserProfileContext dbContext) => dbContext.Users.Select(user => user.ToDTO())).WithName("GetUsers");

        // GET USER BY ID
        group.MapGet("/{id}", (int id, UserProfileContext dbContext) =>
        {
            User? user = dbContext.Users.Find(id);
            return user is not null ? Results.Ok(user.ToDTO()) : Results.NotFound();
        }).WithName(baseNameById);

        // CREATE NEW USER
        group.MapPost("/", (CreateUserDTO newUser, UserProfileContext dbContext) =>
        {
            User user = newUser.ToEntity();

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            UserDTO userDTO = user.ToDTO();
            return Results.CreatedAtRoute(baseNameById, new { id = user.Id }, userDTO);
        }).WithName("CreateUser").RequireAuthorization();

        // UPDATE EXISTING USER
        group.MapPut("/{id}", (int id, CreateUserDTO updatedUser, UserProfileContext dbContext) =>
        {
            var existingUser = dbContext.Users.Find(id);

            if (existingUser is null)
            {
                return Results.NotFound();
            }
            dbContext.Entry(existingUser).CurrentValues.SetValues(updatedUser.ToEntity(id));
            dbContext.SaveChanges();
            return Results.NoContent();
        }).WithName("UpdateUser");

        // DELETE USER BY ID
        group.MapDelete("/{id}", (int id, UserProfileContext dbContext) =>
        {
            User? user = dbContext.Users.Find(id);
            if (user is null)
            {
                return Results.NotFound();
            }
            dbContext.Users.Where(user => user.Id == id).ExecuteDelete();
            return Results.NoContent();
        }).WithName("DeleteUser");

        return group;
    }
}