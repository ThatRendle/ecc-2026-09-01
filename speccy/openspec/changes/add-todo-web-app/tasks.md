## 1. Project Setup

- [ ] 1.1 Scaffold a Vite + vanilla TypeScript project at the repo root (or an agreed subfolder) and verify `npm run dev` serves a blank page
- [ ] 1.2 Define the `Todo` type (`id`, `text`, `done`, `createdAt`, `dueDate`, `priority`) in a shared module and verify it compiles with `tsc --noEmit`

## 2. Persistence Layer

- [ ] 2.1 Implement `loadTodos()` / `saveTodos(todos)` against a single `localStorage` key, defaulting to `[]` when absent or invalid, and verify with a manual test: reload the page after clearing `localStorage` and confirm an empty list with no errors
- [ ] 2.2 Wire every state mutation to call `saveTodos` immediately after updating the in-memory array, and verify by adding a todo, reloading, and confirming it persists

## 3. Core Todo Operations

- [ ] 3.1 Implement add-todo (text, optional due date, optional priority defaulting to `medium`) with empty/whitespace text rejected, and verify: submitting blank text creates nothing, submitting valid text creates a todo with `done = false` and a generated id/timestamp
- [ ] 3.2 Implement edit-in-place for a todo's text, rejecting empty/whitespace edits, and verify: editing to a new value updates it, editing to blank leaves the original text unchanged
- [ ] 3.3 Implement toggle-complete/incomplete for a single todo and verify: toggling flips `done` and re-render reflects the new state
- [ ] 3.4 Implement delete for a single todo and verify: the deleted todo disappears from the list and from `localStorage` after reload
- [ ] 3.5 Implement "clear completed" and verify: with a mix of done/not-done todos, only the done ones are removed

## 4. Filtering and Display

- [ ] 4.1 Implement All/Active/Completed filter UI state (not persisted) and verify each filter shows the correct subset
- [ ] 4.2 Render todos in creation order (oldest first) regardless of priority/due date, and verify a newly added todo always appears last in the list
- [ ] 4.3 Display each todo's priority as a visible label without affecting sort order, and verify by adding todos with different priorities and confirming order is unchanged

## 5. Verification

- [ ] 5.1 Walk through every scenario in `specs/todo-management/spec.md` manually (or with a lightweight test if time allows) and confirm each passes
- [ ] 5.2 Run `openspec validate --change "add-todo-web-app" --strict` and resolve any reported issues
