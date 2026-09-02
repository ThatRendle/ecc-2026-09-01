namespace backend.Models;

public class Tag
{
    public Guid Id { get; set; }
    public required string Name { get; set; }

    // Navigation property
    public ICollection<TodoItem> TodoItems { get; set; } = new List<TodoItem>();
}
