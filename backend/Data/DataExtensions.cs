using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<UserProfileContext>();
        dbContext.Database.Migrate();
    }
}