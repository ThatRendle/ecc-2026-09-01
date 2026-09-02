using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; }
    public DbSet<Tag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Tag entity
        modelBuilder.Entity<Tag>()
            .HasKey(t => t.Id);

        modelBuilder.Entity<Tag>()
            .HasIndex(t => t.Name)
            .IsUnique();

        // Configure TodoItem entity
        modelBuilder.Entity<TodoItem>()
            .HasKey(t => t.Id);

        modelBuilder.Entity<TodoItem>()
            .Property(t => t.Text)
            .IsRequired();

        modelBuilder.Entity<TodoItem>()
            .Property(t => t.Done)
            .HasDefaultValue(false);

        modelBuilder.Entity<TodoItem>()
            .Property(t => t.Priority)
            .HasDefaultValue(Priority.None);

        // Configure many-to-many relationship
        modelBuilder.Entity<TodoItem>()
            .HasMany(t => t.Tags)
            .WithMany(tag => tag.TodoItems)
            .UsingEntity<Dictionary<string, object>>(
                "TodoItemTag",
                j => j
                    .HasOne<Tag>()
                    .WithMany()
                    .HasForeignKey("TagId"),
                j => j
                    .HasOne<TodoItem>()
                    .WithMany()
                    .HasForeignKey("TodoItemId"));
    }
}
