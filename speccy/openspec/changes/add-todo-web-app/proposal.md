## Why

There is currently no to-do application in this repo. We need a small, self-contained web app to manage personal tasks, and it will double as the vehicle for exercising another workflow in this repo — so it needs real enough structure (data model, requirements, edge cases) to be worth specifying, without needing to be feature-complete as a product.

## What Changes

- New single-page web app for managing to-do items, built with vanilla TypeScript and Vite (no framework, no backend).
- Todo items carry text, completion state, creation timestamp, an optional due date, and a priority (low/medium/high).
- Users can add, edit (in place), complete/uncomplete, and delete todo items.
- Users can filter the visible list by All / Active / Completed.
- Users can clear all completed items in one action.
- All data persists in the browser's `localStorage` and survives page reloads; there is no server and no user accounts (single implicit user per browser).

## Capabilities

### New Capabilities
- `todo-management`: Creating, editing, completing, deleting, filtering, and persisting to-do items in a single-user, client-only web app.

### Modified Capabilities
(none — greenfield repo, no existing specs)

## Impact

- New frontend project (vanilla TypeScript + Vite), no existing code affected.
- No backend, no external services, no new dependencies beyond Vite/TypeScript tooling.
- Data lives entirely in browser `localStorage`; no migration or existing data to consider.
