using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class UserProfileContext(DbContextOptions<UserProfileContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
}