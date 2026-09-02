# 0004: Vanilla TypeScript + Vite frontend

## Status

Accepted

## Context

[[0001-client-server-architecture]] puts a frontend in front of the
backend API. The `todo` spec calls for standard list-management UI:
add/edit/complete/delete with confirmation, tag entry with autocomplete,
overdue styling, filtering, and sorting — no rich client-side state
machine or component complexity that would specifically demand a
framework. The project's default tech guidance is vanilla TypeScript and
CSS for frontend code, built with Vite, unless a framework is instructed.

## Decision

Build the frontend in vanilla TypeScript and CSS, bundled with Vite. It
calls the backend's `/api/todos` endpoints over `fetch` and renders the
todo list, filters, and sort controls directly against the DOM.

## Alternatives Considered

- **A component framework (React, Vue, etc.)** — would offer more
  structure for the list re-render, filtering, and autocomplete
  interactions. Rejected: the UI surface here doesn't outgrow what
  vanilla TS handles cleanly, and the project's default is to avoid a
  framework unless the work needs one.

## Consequences

- The frontend owns its own small rendering/state layer instead of
  adopting a framework's; if the UI complexity grows materially beyond
  the current `todo` capability, revisit this decision.
- Vite provides the dev server and production build; no other frontend
  tooling is introduced.
