## 1. Backend project setup

- [ ] 1.1 Scaffold `backend/` as a .NET 10 ASP.NET Core Minimal API project and verify `dotnet run` starts without error
- [ ] 1.2 Add EF Core + SQLite provider packages and verify `dotnet build` succeeds
- [ ] 1.3 Define `TodoItem` and `Tag` entities plus the `DbContext` per design.md's data model and verify an initial EF Core migration generates successfully
- [ ] 1.4 Apply the migration to create the local SQLite database and verify the database file and expected tables are created

## 2. Backend API endpoints

- [ ] 2.1 Implement `POST /api/todos` (create) and verify a unit/integration test creates an item with only text, and another with all fields populated
- [ ] 2.2 Implement `GET /api/todos` with filter (`status`, `tag`, `priority`) and sort (`dueDate`, `priority`) query params and verify tests cover each filter and each sort order, including items with no due date/priority
- [ ] 2.3 Implement `PUT /api/todos/{id}` (full update) and verify a test edits text, due date, priority, tags, and notes independently
- [ ] 2.4 Implement `PATCH /api/todos/{id}/done` (toggle complete/uncomplete) and verify a test toggles both directions
- [ ] 2.5 Implement `DELETE /api/todos/{id}` and verify a test confirms the item is removed and a second delete returns a not-found result
- [ ] 2.6 Implement `GET /api/tags` returning distinct tag names in use and verify a test confirms a newly used tag appears in the result

## 3. Backend cross-cutting checks

- [ ] 3.1 Verify persistence across restart: integration test that creates an item, restarts the `DbContext`/host, and confirms the item and all its fields are still present
- [ ] 3.2 Verify overdue derivation logic (incomplete + past due date = overdue; done + past due date = not overdue) with a focused unit test

## 4. Frontend project setup

- [ ] 4.1 Scaffold `frontend/` as a Vite + vanilla TypeScript project and verify `npm run dev` serves a blank page
- [ ] 4.2 Configure the Vite dev server to proxy `/api/*` to the backend and verify a manual request to `/api/tags` through the dev server reaches the backend
- [ ] 4.3 Add an API client module wrapping `fetch` for all `/api/todos` and `/api/tags` endpoints and verify a smoke test/manual call against a running backend succeeds for each method

## 5. Frontend UI: list and item lifecycle

- [ ] 5.1 Render the todo list from the API and verify items display with text, due date, priority, tags, and notes visible
- [ ] 5.2 Implement the add-item form (text required, other fields optional) and verify a new item appears in the list after submission
- [ ] 5.3 Implement in-place editing of any item field and verify edits persist (reflected after a page reload)
- [ ] 5.4 Implement complete/uncomplete toggling and verify the item's displayed state updates immediately and after reload
- [ ] 5.5 Implement delete with a confirmation step and verify the item is removed only after confirming, and remains if canceled

## 6. Frontend UI: tags, overdue, filter, sort

- [ ] 6.1 Implement tag entry with autocomplete sourced from `GET /api/tags` and verify typing a partial existing tag name shows it as a suggestion
- [ ] 6.2 Apply distinct styling to overdue items (incomplete + past due date) and verify visually and via a check that completed past-due items are not styled as overdue
- [ ] 6.3 Implement filter controls (status, tag, priority) wired to the list query and verify each filter narrows the displayed list correctly
- [ ] 6.4 Implement sort controls (due date, priority) wired to the list query and verify ordering, including consistent grouping of items with no due date/priority

## 7. Integration and packaging

- [ ] 7.1 Configure the backend to serve the frontend's built output (`vite build`) as static files and verify the full app (UI + API) runs from a single `dotnet run`
- [ ] 7.2 Walk every scenario in `specs/todo/spec.md` end-to-end against the running app and verify each passes
