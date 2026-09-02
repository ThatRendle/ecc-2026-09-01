## Why

Emmz needs a working example project to demonstrate ways of working with Claude in
a workshop. A personal todo app is a small, well-understood domain that still has
enough depth (fields, editing, filtering, sorting) to make the demonstration
meaningful.

## What Changes

- Introduce a personal todo list: a single user can add, edit, complete/uncomplete,
  and delete todo items.
- Each todo item carries: text, done state, optional due date, priority
  (Low/Medium/High), free-form tags (with autocomplete from tags already in use),
  and free-text notes.
- Deleting an item requires confirmation before it is removed.
- An incomplete item past its due date is visually distinguished as overdue.
- The list can be filtered (by status, tag, priority) and sorted (by due date,
  priority).
- The list persists across restarts for a single user on a single device — no
  accounts, no multi-device sync.

## Capabilities

### New Capabilities
- `todo`: managing a personal list of todo items — creating, editing, completing,
  deleting, tagging, prioritizing, filtering, sorting, and persisting them.

### Modified Capabilities
- None.

## Impact

- New capability area; no existing specs or code affected.
- Establishes the requirements baseline that the architecture proposal
  (`opsx:propose`) will build a technical design against.
