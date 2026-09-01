export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

const API_BASE = "http://localhost:5206/api/todos";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function getTodos(): Promise<Todo[]> {
  return request<Todo[]>("/");
}

export function createTodo(title: string): Promise<Todo> {
  return request<Todo>("/", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function updateTodo(id: string, changes: Partial<Pick<Todo, "title" | "isComplete">>): Promise<Todo> {
  return request<Todo>(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });
}

export function deleteTodo(id: string): Promise<void> {
  return request<void>(`/${id}`, { method: "DELETE" });
}
