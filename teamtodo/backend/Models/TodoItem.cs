namespace backend.Models;

public class TodoItem
{
    public Guid Id { get; set; }
    public required string Text { get; set; }
    public bool Done { get; set; } = false;
    public DateOnly? DueDate { get; set; }
    public Priority Priority { get; set; } = Priority.None;
    public string? Notes { get; set; }

    // Navigation property for many-to-many
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();

    // Computed property: Overdue is not stored, calculated at read time
    public bool IsOverdue
    {
        get
        {
            if (Done || DueDate == null)
            {
                return false;
            }
            return DueDate < DateOnly.FromDateTime(DateTime.Now);
        }
    }
}
