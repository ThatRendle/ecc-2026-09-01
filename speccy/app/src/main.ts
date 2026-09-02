import "./style.css";
import type { Priority, Todo } from "./todo";
import { loadTodos, saveTodos } from "./storage";

type Filter = "all" | "active" | "completed";

let todos: Todo[] = loadTodos();
let filter: Filter = "all"; // transient UI state, not persisted

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>To-Do</h1>
  <form class="add-form" id="add-form">
    <input type="text" id="new-text" placeholder="What needs doing?" aria-label="Todo text" />
    <input type="date" id="new-due-date" aria-label="Due date" />
    <select id="new-priority" aria-label="Priority">
      <option value="low">Low</option>
      <option value="medium" selected>Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit">Add</button>
  </form>
  <div class="filters" id="filters">
    <button type="button" data-filter="all">All</button>
    <button type="button" data-filter="active">Active</button>
    <button type="button" data-filter="completed">Completed</button>
  </div>
  <ul class="todo-list" id="todo-list"></ul>
  <div class="actions-bar">
    <button type="button" id="clear-completed">Clear completed</button>
  </div>
`;

const addForm = app.querySelector<HTMLFormElement>("#add-form")!;
const newText = app.querySelector<HTMLInputElement>("#new-text")!;
const newDueDate = app.querySelector<HTMLInputElement>("#new-due-date")!;
const newPriority = app.querySelector<HTMLSelectElement>("#new-priority")!;
const filtersEl = app.querySelector<HTMLDivElement>("#filters")!;
const listEl = app.querySelector<HTMLUListElement>("#todo-list")!;
const clearCompletedBtn = app.querySelector<HTMLButtonElement>("#clear-completed")!;

function persist(): void {
  saveTodos(todos);
}

function addTodo(text: string, dueDate: string | null, priority: Priority): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) return;
  todos.push({
    id: crypto.randomUUID(),
    text: trimmed,
    done: false,
    createdAt: new Date().toISOString(),
    dueDate: dueDate && dueDate.length > 0 ? dueDate : null,
    priority,
  });
  persist();
  render();
}

function editTodoText(id: string, newValue: string): void {
  const trimmed = newValue.trim();
  if (trimmed.length === 0) return; // reject empty edits, keep previous value
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.text = trimmed;
  persist();
  render();
}

function toggleTodo(id: string): void {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.done = !todo.done;
  persist();
  render();
}

function deleteTodo(id: string): void {
  todos = todos.filter((t) => t.id !== id);
  persist();
  render();
}

function clearCompleted(): void {
  todos = todos.filter((t) => !t.done);
  persist();
  render();
}

function visibleTodos(): Todo[] {
  // creation order preserved (array insertion order); filter by done state only
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "completed") return todos.filter((t) => t.done);
  return todos;
}

function render(): void {
  // filter buttons
  filtersEl.querySelectorAll<HTMLButtonElement>("button[data-filter]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
  });

  // list
  listEl.innerHTML = "";
  for (const todo of visibleTodos()) {
    const li = document.createElement("li");
    li.className = `todo-item${todo.done ? " done" : ""}`;
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.setAttribute("aria-label", "Toggle done");
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const textSpan = document.createElement("span");
    textSpan.className = "text";
    textSpan.textContent = todo.text;
    textSpan.tabIndex = 0;
    textSpan.title = "Click to edit";
    textSpan.addEventListener("click", () => startEdit(li, todo));

    const priorityBadge = document.createElement("span");
    priorityBadge.className = `priority ${todo.priority}`;
    priorityBadge.textContent = todo.priority;

    li.append(checkbox, textSpan, priorityBadge);

    if (todo.dueDate) {
      const due = document.createElement("span");
      due.className = "due-date";
      due.textContent = todo.dueDate;
      li.append(due);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
    li.append(deleteBtn);

    listEl.append(li);
  }
}

function startEdit(li: HTMLLIElement, todo: Todo): void {
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  input.className = "edit-input";

  const finish = () => {
    editTodoText(todo.id, input.value);
  };

  input.addEventListener("blur", finish);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
      input.removeEventListener("blur", finish);
      render();
    }
  });

  const textSpan = li.querySelector(".text")!;
  li.replaceChild(input, textSpan);
  input.focus();
  input.select();
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(newText.value, newDueDate.value, newPriority.value as Priority);
  newText.value = "";
  newDueDate.value = "";
  newPriority.value = "medium";
  newText.focus();
});

filtersEl.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest<HTMLButtonElement>("button[data-filter]");
  if (!btn) return;
  filter = btn.dataset.filter as Filter;
  render();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

render();
