# 0005: Project layout and hosting model

## Status

Accepted

## Context

With a separate backend ([[0002-backend-platform]]) and frontend
([[0004-frontend-stack]]), the repo needs a layout for both, and a
decision on how they run together for someone using or demoing the app.

## Decision

- Repo layout: `backend/` (the .NET 10 solution/project) and `frontend/`
  (the Vite + TypeScript project) as siblings at the repo root.
- Development: run the backend (`dotnet run`) and the frontend's Vite dev
  server side by side; the Vite dev server proxies `/api/*` requests to
  the backend, so the browser talks to one origin during development.
- Running the app as a whole: the frontend is built (`vite build`) and
  its output is served by the backend as static files, so the entire app
  runs as a single process (`dotnet run`) with the API and the UI on the
  same origin — no separate deploy step, no CORS configuration needed
  outside development.

## Alternatives Considered

- **Always-separate hosting (frontend on its own static host, backend as
  a standalone API, CORS between them)** — more representative of a
  larger production setup, but adds a second thing to run and configure
  for a single-user, single-device demo app. Rejected as unnecessary
  overhead here.

## Consequences

- One command (`dotnet run` against the backend, after a frontend build)
  gets the whole app running for the workshop.
- The frontend's `fetch` calls use relative paths (`/api/todos`), which
  work unchanged in both the proxied dev setup and the single-process
  run.
