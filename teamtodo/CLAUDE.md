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

### OpenSpec apply phase

- Will use sub-agents. Sub-agents are not yet defined — to be created after the
  first change exists.
