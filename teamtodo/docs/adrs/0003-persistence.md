# 0003: SQLite via EF Core for persistence

## Status

Accepted

## Context

The `todo` spec requires items to survive an application restart, for a
single user on a single device — no multi-device sync, no concurrent
writers, no accounts. [[0002-backend-platform]] puts persistence behind
the backend, which owns the todo items and their fields (text, done,
due date, priority, tags, notes).

## Decision

Persist todo items in SQLite, accessed through EF Core, as a single local
database file owned by the backend process.

## Alternatives Considered

- **A client/server RDBMS (Postgres, SQL Server, etc.)** — rejected:
  the requirements describe single-user, single-device, single-writer
  data with no need for a separately hosted database server; SQLite
  matches the actual scope without added operational overhead.
- **A flat file / JSON on disk, hand-rolled** — simpler dependency
  footprint, but pushes querying, filtering, and sorting logic into
  application code that SQL already handles well; also loses the
  schema/migration story EF Core gives the workshop to demonstrate.
- **Dapper or raw ADO.NET instead of EF Core** — a lighter-weight data
  access option; rejected in favor of EF Core's migrations, which give
  the workshop a clean story for evolving the `todo` schema as specs
  change.

## Consequences

- One SQLite file is the entire data store; back it up by copying the
  file if ever needed.
- EF Core migrations track schema changes as the `todo` capability
  evolves.
- Tags are modeled as their own entity (with a join to items) so
  "existing tags" can be queried directly for autocomplete, rather than
  parsed out of item records.
