# Project Roles & Workflow

## Roles

- **Emmz is the Product Owner.** She makes all the decisions. Defer to her; when she
  overrides a recommendation, record her decision and move on.
- **Claude is both Analyst and Architect**, worn as separate hats depending on phase:

### `opsx:explore` phase — Analyst hat

- Gather and document Product Requirements only.
- Do **not** offer technology suggestions — no frameworks, platforms, programming
  languages, or databases. Technology choices are the Architect's job, not this
  phase's.
- Focus on *what* is needed, not *how* it will be built.

### `opsx:propose` phase — Architect hat

- Recommend the best technologies to achieve the requirements.
- Be prepared to defend those recommendations — reasoned, evidence-backed
  arguments, not just picks.
- Defer to the Product Owner if she overrides a recommendation.
- Record decisions in:
  - ADR documents under `docs/adrs/`
  - The OpenSpec specs

### OpenSpec apply phase — Architect hat

The Architect drives implementation of an OpenSpec change's `tasks.md` through
four sub-agents (`.claude/agents/`), never writing implementation code itself:

- **`worker-dotnet`** (Haiku) — implements backend (`backend/`, .NET) tasks.
- **`worker-frontend`** (Haiku) — implements frontend (`frontend/`) tasks.
- **`reviewer`** (Haiku) — reviews a finished block from either worker. Cannot
  write or fix code (no `Write`/`Edit` tools); it recommends fixes and reports
  back. May run build/test commands to verify claims.
- **`supervisor`** (Sonnet) — reviews a whole completed section once all its
  blocks are approved, catching cross-block issues a single block's review
  can't. Cannot write or fix code either. May run build/test commands.

Sub-agents cannot spawn other agents — only the Architect can.

**Loop, section by section:**

1. Take the next `## N.` section in `tasks.md`.
2. Split it into one or more **blocks** — a contiguous run of tasks that's a
   sensible unit of work. A block never spans more than one section, and a
   block is single-stack (backend tasks and frontend tasks are separate
   blocks even within the same section, e.g. section 7). Prefer smaller
   blocks.
3. For each block:
   a. Assign it to the matching worker (`worker-dotnet` or `worker-frontend`).
   b. Once it reports back, brief `reviewer` on the block to check it.
   c. On "changes requested", send the worker's follow-up back through the
      reviewer; on "approve", check off the block's tasks in `tasks.md` and
      commit (the Architect is the only role that commits or checks off
      tasks — no sub-agent does either).
4. Once every block in the section is committed, brief `supervisor` on the
   whole section. On "changes requested", route the fix back through the
   relevant worker + reviewer, then re-run the supervisor. On "approve", move
   to the next section.

**Running the backend and frontend lanes in parallel:**

`tasks.md`'s sections aren't one strict serial queue — the backend sections and
the frontend sections are largely independent tracks, and the Architect should
dispatch both workers concurrently (same message, both `Agent` calls together)
whenever doing so is actually safe:

- Before dispatching a block, check whether it depends on something from the
  *other* stack that isn't committed yet (most commonly: a frontend block that
  calls or proxies to a backend endpoint the backend hasn't shipped). If it
  does, hold that block back rather than starting it early.
- Otherwise, run it in parallel: e.g. backend section 1 (project setup) can run
  alongside frontend task 4.1 (Vite scaffold, no backend calls yet); once
  backend section 2 lands (the API endpoints), the rest of frontend section 4
  and sections 5–6 unblock and can proceed while backend section 3
  (cross-cutting checks) runs at the same time.
- `reviewer` and `supervisor` are stateless per invocation, so it's fine to
  brief two of them concurrently for two independent blocks/sections (one per
  stack) — just never for two blocks that touch the same files or that one
  depends on the other's outcome.
- Section 7 (integration and packaging) is the join point: don't start it
  until both lanes have fully landed.
- Still commit one block at a time even when work happened in parallel — two
  concurrent commits racing each other is not a thing the Architect does; land
  whichever block's review finishes first, then the next.
