using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class EduIndDbContext : DbContext
    {
        public EduIndDbContext(DbContextOptions<EduIndDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Student>(entity =>
            {
                // Unique constraint on Email
                entity.HasIndex(e => e.Email).IsUnique();

                // Set default UTC timestamp for CreatedAt
                entity.Property(e => e.CreatedAt)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<User>(entity =>
            {
                // Unique constraint on Email
                entity.HasIndex(e => e.Email).IsUnique();

                // Set default UTC timestamps
                entity.Property(e => e.CreatedAt)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.UpdatedAt)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
