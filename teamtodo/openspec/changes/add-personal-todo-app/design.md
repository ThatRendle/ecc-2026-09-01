## Context

See `proposal.md` for motivation and `specs/todo/spec.md` for the full
requirement set. The technology decisions behind this design are recorded
as ADRs in `docs/adrs/`:

- [0001: Client/server architecture](../../../docs/adrs/0001-client-server-architecture.md)
- [0002: Backend platform (.NET 10, Minimal API)](../../../docs/adrs/0002-backend-platform.md)
- [0003: Persistence (SQLite via EF Core)](../../../docs/adrs/0003-persistence.md)
- [0004: Frontend stack (vanilla TypeScript + Vite)](../../../docs/adrs/0004-frontend-stack.md)
- [0005: Project layout and hosting model](../../../docs/adrs/0005-project-layout-and-hosting.md)

## Goals / Non-Goals

**Goals:**
- A working `backend/` (.NET 10 Minimal API + EF Core/SQLite) and
  `frontend/` (vanilla TypeScript + Vite) that together satisfy every
  requirement in `specs/todo/spec.md`.
- A single-process way to run the whole app (backend serving the built
  frontend) for demo purposes.

**Non-Goals:**
- Multi-user support, authentication, or multi-device sync (explicitly
  out of scope per the spec).
- A public/hosted deployment story — this is a local workshop app.

## Decisions

### Data model

A single `TodoItem` entity:

| Field       | Type                        | Notes                              |
|-------------|-----------------------------|-------------------------------------|
| `Id`        | `Guid`                      | primary key                        |
| `Text`      | `string`, required           | |
| `Done`      | `bool`, default `false`      | |
| `DueDate`   | `DateOnly?`                  | optional                            |
| `Priority`  | `enum { None, Low, Medium, High }`, default `None` | |
| `Notes`     | `string?`                    | free text, optional                |
| `Tags`      | many-to-many with `Tag`      | see below                          |

A `Tag` entity (`Id`, `Name`, unique) with a join table to `TodoItem`, so
the set of distinct tag names already in use can be queried directly to
back the autocomplete requirement, rather than derived by scanning every
item's tag list.

"Overdue" (incomplete item, `DueDate` earlier than today) is computed,
not stored — both API and UI derive it from `Done` and `DueDate` at read
time.

### API shape

REST-ish JSON endpoints under `/api/todos`:

- `GET /api/todos` — list, with optional query params for filter
  (`status`, `tag`, `priority`) and sort (`sortBy=dueDate|priority`)
- `POST /api/todos` — create
- `PUT /api/todos/{id}` — full update (any field)
- `PATCH /api/todos/{id}/done` — toggle complete/uncomplete
- `DELETE /api/todos/{id}` — delete (the confirmation step is a frontend
  concern; the API performs the delete once called)
- `GET /api/tags` — distinct tag names in use, for autocomplete

Filtering and sorting are handled server-side (translated to a SQL query
via EF Core) rather than client-side, since the backend already owns the
data and this avoids shipping the full list to the client on every view
change.

### Frontend structure

Plain TypeScript modules (no framework, per
[0004](../../../docs/adrs/0004-frontend-stack.md)):

- an API client module wrapping `fetch` calls to the endpoints above
- a render module that draws the list, filter/sort controls, and the
  add/edit form from application state
- a small state module holding the current items, active filter/sort,
  and tag suggestions, re-rendering on change

Delete confirmation is a simple inline/modal confirm step in the UI
before the `DELETE` call is made. Overdue styling is a CSS class applied
when an item is incomplete and its due date is in the past.

## Risks / Trade-offs

- [Two runtimes (backend + frontend) to build and run instead of one] →
  Mitigated by [0005](../../../docs/adrs/0005-project-layout-and-hosting.md):
  the backend serves the built frontend, so running the app end-to-end
  is one command.
- [Server-side filter/sort adds query complexity in the backend vs. a
  simpler "return everything, filter in the browser" approach] →
  Accepted: matches where the data already lives and keeps the frontend
  simple; the dataset size here is small enough that this isn't a
  performance concern either way.
