# 0001: Client/server architecture over frontend-only

## Status

Accepted

## Context

The `todo` capability's requirements (see
`openspec/changes/add-personal-todo-app/specs/todo/spec.md`) describe a
single-user, single-device app with no accounts and no multi-device sync.
Those requirements alone don't *require* a backend — a frontend-only app
persisting to browser storage would satisfy every stated scenario.

This project exists to demonstrate ways of working with Claude in a
workshop. A single-layer app gives Claude, and the workshop attendees,
only one kind of work to do; a client/server split gives a more
representative surface (API design, a data layer, backend tests, frontend
integration) without adding requirements the product doesn't have.

## Decision

Build a client/server application: a backend HTTP API and a separate
frontend that talks to it. The backend owns persistence; the frontend
holds no application data outside what it fetches from the API.

## Alternatives Considered

- **Frontend-only, browser-local persistence** — simplest architecture,
  fully satisfies the specs. Rejected because it collapses the workshop
  demo to a single layer, which works against the project's actual
  purpose.

## Consequences

- Adds an HTTP boundary, a persistence layer, and a run/deploy step the
  requirements didn't strictly demand.
- Two runtimes to build, test, and run instead of one.
- Gives the workshop a backend, an API contract, and a frontend
  integration point to work through separately.
