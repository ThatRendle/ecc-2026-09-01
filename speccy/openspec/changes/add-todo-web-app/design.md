## Context

Greenfield repo; no existing code or specs. See proposal.md - Why for motivation. Per project defaults, the frontend stack is vanilla TypeScript with Vite (no framework); there is no backend, and this app is single-user with no accounts. Full behavior is defined in `specs/todo-management/spec.md`.

## Goals / Non-Goals

**Goals:**
- A minimal, readable client-side architecture that's easy to follow as a teaching vehicle.
- Straightforward mapping from spec requirements to a small number of source files.

**Non-Goals:**
- Multi-device sync, accounts, or any server-side component.
- Drag-and-drop reordering or priority/due-date-based sorting (explicitly excluded by the spec).
- Offline/PWA support, build optimization, or production hardening beyond what Vite provides by default.

## Decisions

**Single in-memory state array, re-rendered on change.**
Keep one `Todo[]` array as the source of truth in `main.ts`, mutate it via small pure-ish functions (add/edit/toggle/delete/clearCompleted), and re-render the DOM from that array after every mutation. Alternative considered: a pub/sub or reactive store — rejected as unnecessary ceremony for a single small array with no cross-component coordination.

**localStorage as the persistence layer, synced on every mutation.**
After each mutation, serialize the full `Todo[]` array to JSON and write it to a single `localStorage` key. On load, read and parse that key, defaulting to `[]` if absent or invalid. Alternative considered: IndexedDB — rejected as overkill for a flat list with no query needs.

**Todo identity via generated string IDs.**
Use `crypto.randomUUID()` for `id` at creation time, so edits/toggles/deletes can target a specific item without relying on array index (which would break under filtering).

**Filtering and priority are display-only concerns.**
Per spec, filter state (All/Active/Completed) is transient UI state (not persisted) that determines which subset of the underlying array is rendered; priority is stored and shown but never changes sort order. This keeps the persisted data model and the display logic cleanly separated.

**Validation at the boundary.**
Reject empty/whitespace-only text in the add and edit handlers before mutating state, per the spec's "reject empty" scenarios. No other validation (e.g., due date ranges) is required by the spec, so none is added.

## Risks / Trade-offs

- [Data loss if localStorage is cleared or unavailable (e.g., private browsing limits)] → Acceptable for a single-user demo app; no mitigation beyond starting cleanly from an empty list.
- [No test coverage specified] → Out of scope for this change; can be added later without affecting the spec.
