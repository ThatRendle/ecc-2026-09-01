# 0002: Backend on .NET 10 with ASP.NET Core Minimal API

## Status

Accepted

## Context

[[0001-client-server-architecture]] establishes a separate backend. The
project's default tech guidance is .NET for back-end code. The backend's
job here is small: expose CRUD-plus-filter/sort operations over a single
resource (todo items) for one user.

## Decision

Use .NET 10 with ASP.NET Core Minimal APIs (not MVC controllers) for the
backend. Endpoints live under `/api/todos`, returning/accepting JSON.

## Alternatives Considered

- **ASP.NET Core MVC (controller-based)** — more structure and
  conventions than this single-resource API needs; Minimal API keeps the
  endpoint definitions colocated and simple for a workshop-scale backend.
- **A different platform (Node/Express, etc.)** — rejected: goes against
  the project's stated default of .NET for backend code, with no
  requirement here that justifies departing from it.

## Consequences

- Endpoint code stays lightweight; if the API grows substantially beyond
  the `todo` capability, revisit toward MVC or feature folders.
- Backend testability follows standard ASP.NET Core patterns (in-memory
  test server / `WebApplicationFactory`).
