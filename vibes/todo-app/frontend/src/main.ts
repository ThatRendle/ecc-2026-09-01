import "./style.css";
import { type Todo, createTodo, deleteTodo, getTodos, updateTodo } from "./api";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <main class="todo-app">
    <h1>To-Do</h1>
    <form id="todo-form" class="todo-form">
      <input
        id="todo-input"
        type="text"
        placeholder="What needs doing?"
        autocomplete="off"
      />
      <button type="submit">Add</button>
    </form>
    <p id="todo-error" class="todo-error" hidden></p>
    <ul id="todo-list" class="todo-list"></ul>
    <p id="todo-empty" class="todo-empty" hidden>No to-dos yet — add one above.</p>
  </main>
`;

const form = document.querySelector<HTMLFormElement>("#todo-form")!;
const input = document.querySelector<HTMLInputElement>("#todo-input")!;
const list = document.querySelector<HTMLUListElement>("#todo-list")!;
const errorEl = document.querySelector<HTMLParagraphElement>("#todo-error")!;
const emptyEl = document.querySelector<HTMLParagraphElement>("#todo-empty")!;

function showError(message: string) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.hidden = true;
}

function render(todos: Todo[]) {
  list.innerHTML = "";
  emptyEl.hidden = todos.length > 0;

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.isComplete) item.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isComplete;
    checkbox.addEventListener("change", () => toggleComplete(todo, checkbox.checked));

    const title = document.createElement("span");
    title.className = "todo-title";
    title.textContent = todo.title;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "todo-remove";
    removeBtn.textContent = "Delete";
    removeBtn.addEventListener("click", () => removeTodo(todo));

    item.append(checkbox, title, removeBtn);
    list.append(item);
  }
}

async function loadTodos() {
  try {
    const todos = await getTodos();
    clearError();
    render(todos);
  } catch (err) {
    showError("Could not load to-dos. Is the backend running on http://localhost:5206?");
  }
}

async function addTodo(title: string) {
  try {
    await createTodo(title);
    clearError();
    await loadTodos();
  } catch (err) {
    showError("Could not add the to-do.");
  }
}

async function toggleComplete(todo: Todo, isComplete: boolean) {
  try {
    await updateTodo(todo.id, { isComplete });
    clearError();
    await loadTodos();
  } catch (err) {
    showError("Could not update the to-do.");
  }
}

async function removeTodo(todo: Todo) {
  try {
    await deleteTodo(todo.id);
    clearError();
    await loadTodos();
  } catch (err) {
    showError("Could not delete the to-do.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  input.value = "";
  void addTodo(title);
});

void loadTodos();
