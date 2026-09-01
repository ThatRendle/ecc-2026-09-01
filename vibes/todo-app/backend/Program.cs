using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

const string FrontendCorsPolicy = "FrontendCorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(FrontendCorsPolicy);

var store = new TodoStore();

var todos = app.MapGroup("/api/todos");

todos.MapGet("/", () => Results.Ok(store.GetAll()));

todos.MapPost("/", (CreateTodoRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.BadRequest(new { error = "Title is required." });
    }

    var todo = store.Add(request.Title.Trim());
    return Results.Created($"/api/todos/{todo.Id}", todo.ToDto());
});

todos.MapPut("/{id:guid}", (Guid id, UpdateTodoRequest request) =>
{
    var updated = store.Update(id, request.Title, request.IsComplete);
    return updated is not null ? Results.Ok(updated.ToDto()) : Results.NotFound();
});

todos.MapDelete("/{id:guid}", (Guid id) =>
    store.Remove(id) ? Results.NoContent() : Results.NotFound());

app.Run();

record Todo(Guid Id, string Title, bool IsComplete, long Sequence)
{
    public TodoDto ToDto() => new(Id, Title, IsComplete);
}

record TodoDto(Guid Id, string Title, bool IsComplete);

record CreateTodoRequest(string Title);

record UpdateTodoRequest(string? Title, bool? IsComplete);

class TodoStore
{
    private readonly ConcurrentDictionary<Guid, Todo> _todos = new();
    private long _nextSequence;

    public IEnumerable<TodoDto> GetAll() =>
        _todos.Values
            .OrderBy(t => t.Sequence)
            .Select(t => t.ToDto());

    public Todo Add(string title)
    {
        var todo = new Todo(Guid.NewGuid(), title, false, Interlocked.Increment(ref _nextSequence));
        _todos[todo.Id] = todo;
        return todo;
    }

    public Todo? Update(Guid id, string? title, bool? isComplete)
    {
        if (!_todos.TryGetValue(id, out var existing))
        {
            return null;
        }

        var updated = existing with
        {
            Title = string.IsNullOrWhiteSpace(title) ? existing.Title : title.Trim(),
            IsComplete = isComplete ?? existing.IsComplete
        };

        _todos[id] = updated;
        return updated;
    }

    public bool Remove(Guid id) => _todos.TryRemove(id, out _);
}
