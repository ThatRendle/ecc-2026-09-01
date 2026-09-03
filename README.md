# Effective Claude Code: A 2-Half-Day Workshop

## Workshop Overview

This workshop runs across two half-days of four hours each, including a break. Each day stands on its own, but together they form a coherent arc: from "how do I work with AI without losing my mind?" to "how do I run a small team of AI collaborators?"

**Day 1 — Spec-Driven Development** (4 hours)
Start with a deliberately messy "vibe-coded" exercise so participants feel the pain of unstructured AI work. Then introduce OpenSpec as the antidote: explore, propose, apply, archive. Tour the files OpenSpec creates, study its formats, and finish by building a meatier feature end-to-end. Skills, hooks, and plugins are introduced here as the tooling that makes OpenSpec feel native to Claude Code.

**Day 2 — Roles & Multi-Agent Teams** (4 hours)
Begin with CLAUDE.md as a system prompt, then set up the four-role model: the participant as **Product Owner**, the main Claude Code session as **orchestrator** (analyst/architect), and two subagent personas — **worker** and **reviewer**. Introduce MCP as the way agents gain extra senses (GitHub, browsers, databases). Move on to subagents and multi-agent teams. Finish with the notIRC exercise: each participant builds a WebSocket client for a shared chat server, using their own agent team to do the work.

**Audience:** A mix of engineers and non-technical folk. The exercises are gentle enough for newcomers and meaty enough for veterans.

**Prerequisites:** Git, GitHub CLI (`gh`), Node.js 22.0+ (for OpenSpec), VS Code or preferred editor, an active Claude subscription.

### At a glance

Both days are budgeted to exactly 240 minutes, break included. Keep this table in sync when revising — it is the only place the arithmetic is checkable at a glance.

| Day 1 | Min | | Day 2 | Min |
|---|--:|---|---|--:|
| 1. Welcome & the vibe-coding exercise | 40 | | 7. Welcome back & CLAUDE.md | 40 |
| 2. Why specs? | 20 | | 8. The agent team | 45 |
| 3. OpenSpec — the four workflows | 40 | | 9. MCP | 25 |
| *Break* | 15 | | *Break* | 15 |
| 4. A tour of the files | 35 | | 10. Subagents | 20 |
| 5. Skills, hooks & plugins | 35 | | 11. Multi-agent teams | 25 |
| 6. Final exercise | 45 | | 12. The notIRC finale | 60 |
| Wrap | 10 | | Wrap | 10 |
| **Total** | **240** | | **Total** | **240** |

**If you're running late**, cut in this order — the list is deliberately ordered so the hands-on work is the last thing to go:

- Day 1: Module 5 §5 (plugins) → Module 2 → the discussion half of Module 4. Protect Modules 3 and 6.
- Day 2: Module 10 (all talk, no hands-on) → Module 11 §4 → Module 9's hands-on. Protect Modules 8 and 12.

---

## Pre-Workshop Setup Checklist

Distribute to participants 1 week before the workshop.

### System requirements

Claude Code itself no longer needs Node.js — it ships as a native binary. Participants need:

- **OS:** macOS 13.0+, Windows 10 1809+ / Server 2019+, Ubuntu 20.04+, Debian 10+, or Alpine Linux 3.19+
- **Hardware:** 4 GB+ RAM, x64 or ARM64
- **Shell:** Bash, Zsh, PowerShell, or CMD
- **Network:** an internet connection, and a location in [Anthropic's supported countries](https://www.anthropic.com/supported-countries)

### Required Software
- [ ] Claude Code
  - macOS/Linux: `curl -fsSL https://claude.ai/install.sh | bash`
  - PowerShell: `irm https://claude.ai/install.ps1 | iex`
  - Linux users may prefer the apt / dnf / apk repositories — see the [setup docs](https://docs.claude.com/en/docs/claude-code/setup)
  - Prefer a GUI? The Claude desktop app works too, and the workshop material applies unchanged
- [ ] Node.js 22.0+ — **only needed for OpenSpec**, which installs from npm
- [ ] OpenSpec (`npm install -g @fission-ai/openspec@latest`)
- [ ] Git (latest version)
- [ ] GitHub CLI (`brew install gh` or equivalent)
- [ ] VS Code or preferred editor

### Account Setup
- [ ] Active Claude subscription (Pro or Max)
- [ ] GitHub account with a fine-grained personal access token (repository access)
- [ ] Run `claude` once to complete initial setup and accept permissions

### Verification
```bash
claude --version    # Any recent 2.x
openspec --version  # Should show 1.x.x or higher
gh auth status      # Should show authenticated
node --version      # Should show v22.0.x or higher
```

Then, inside a Claude Code session, `/doctor` reports on the health of the install.

---

# Day 1: Spec-Driven Development

> **Theme:** Feel the pain of vibe-coding, then learn to tame AI with specs.
> **Duration:** 4 hours including a 15-minute break.

## Module 1: Welcome & The Vibe-Coding Exercise (40 min)

**Learning Objectives:**
- Experience first-hand what happens when AI is given vague direction
- Build a shared vocabulary for what goes wrong without structure

**Topics:**

1. **Welcome & introductions** (5 min)
   - What participants want to take away
   - Brief tour of Claude Code — in the terminal, and a note that the same tool runs in the desktop app, in the browser, and as an IDE extension. Everything today applies to all of them.

2. **The vibe-coding exercise** (30 min)
   Each participant opens Claude Code in an empty directory and is given a single, vague prompt:

   > "Build me a small to-do app with a web interface."

   No specifications, no preferences, no constraints. Let it run for 15–20 minutes. Then we regroup and discuss:

   - What did Claude build?
   - How does it differ from your neighbour's version?
   - Where did Claude make assumptions you wouldn't have made?
   - Which parts feel solid, and which feel improvised?

3. **Naming the problem** (5 min)
   - No shared understanding between human and AI
   - Decisions made silently, hard to review
   - Re-running the exercise tomorrow gives a different result
   - This is fine for prototypes; it falls apart for real work

---

## Module 2: Why Specs? (20 min)

**Learning Objectives:**
- Understand why specifications matter for AI-assisted development
- Recognise the failure modes specs are designed to prevent

**Topics:**

1. **The failure modes of unspecified AI work**
   - Context loss across sessions
   - Inconsistent implementations of the same feature
   - Difficult to review or verify what was built
   - Reviewers have to reverse-engineer intent from code

2. **What a spec gives you**
   - A shared artefact human and AI both reference
   - Reviewable before code is written (cheap to change)
   - A contract: "if the code matches this, it's done"
   - Survives across sessions, agents, and team members

3. **The spec-driven loop**
   ```
   explore  →  propose  →  apply  →  archive
      ▲                                  │
      └──────────── learn ───────────────┘
   ```

---

## Module 3: OpenSpec — Explore, Propose, Apply, Archive (40 min)

**Learning Objectives:**
- Install and initialise OpenSpec in a project
- Understand the four core workflows and when to use each

**Topics:**

1. **Installing and initialising**
   ```bash
   npm install -g @fission-ai/openspec@latest
   cd your-project
   openspec init
   ```

2. **The four core workflows**

   | Invocation | Purpose | When to use |
   |---------|---------|-------------|
   | `/opsx:explore` | Think through ideas before committing | Unclear requirements, weighing options |
   | `/opsx:propose` | Draft a complete change with all artefacts | You know what you want |
   | `/opsx:apply` | Implement the tasks from a change | Specs are reviewed and ready |
   | `/opsx:archive` | Merge specs into the living spec, mark complete | Implementation is done and verified |

   These are *skills*, invoked by typing a slash command. We take that apart in Module 5.

3. **A quick walkthrough**
   - Run `/opsx:explore` on a small idea
   - Convert it into a proposal with `/opsx:propose`
   - Look at what got created (we tour the files in the next module)

**Hands-on (15 min):**
- Initialise OpenSpec in a fresh project
- Run `/opsx:explore "I want to add a settings page"`
- Convert to a proposal with `/opsx:propose`

---

## Break (15 min)

---

## Module 4: A Tour of the Files OpenSpec Creates (35 min)

**Learning Objectives:**
- Read and understand each artefact OpenSpec generates
- Recognise the formats (Given/When/Then, delta specs) and why they're shaped that way

**Topics:**

1. **Directory structure**
   ```
   openspec/
   ├── specs/                    # Living specifications
   ├── changes/                  # Active work
   │   └── add-settings/
   │       ├── proposal.md       # Why we're doing this
   │       ├── specs/            # Delta specs (what's changing)
   │       ├── design.md         # Technical approach
   │       └── tasks.md          # Implementation checklist
   └── config.yaml               # Project configuration
   ```

2. **proposal.md — the why**
   - The motivation, scope, and what's explicitly out of scope
   - Read aloud and discuss: what does a good proposal look like?

3. **Delta specs — what's changing**
   ```markdown
   ## ADDED Requirements
   
   ### Requirement: Two-Factor Authentication
   The system MUST require a second factor during login.
   
   #### Scenario: OTP required
   - GIVEN a user with 2FA enabled
   - WHEN the user submits valid credentials
   - THEN an OTP challenge is presented
   
   ## MODIFIED Requirements
   
   ### Requirement: Session Timeout
   The system SHALL expire sessions after 30 minutes of inactivity.
   ```
   - Why Given/When/Then? Behaviour, not implementation.
   - Why ADDED / MODIFIED / REMOVED? Reviewable diffs against the living spec.

4. **design.md — the how**
   - Architectural decisions
   - Data shapes, API boundaries, sequence of operations
   - The place where "we considered X but chose Y because Z" lives

5. **tasks.md — the what's-next**
   - A checklist Claude works through during `/opsx:apply`
   - Each task should be small enough to complete in one session

**Hands-on (15 min):**
- Open the change you proposed in Module 3
- Read every file
- Edit one requirement, one design decision, and one task
- Notice that the artefacts are just markdown — you can shape them freely

---

## Module 5: Skills, Hooks & Plugins — Making OpenSpec Feel Native (35 min)

**Learning Objectives:**
- Write a skill, and understand when Claude invokes one versus when you do
- Configure a hook as an automated quality gate
- Know what a plugin is, and when a team should reach for one

**Topics:**

1. **Skills — the unit of packaged capability**

   A skill is a `SKILL.md` file with instructions. Claude uses it when relevant, or you invoke it directly with `/skill-name`.

   ```
   ~/.claude/skills/<name>/SKILL.md    # Personal — all your projects
   ./.claude/skills/<name>/SKILL.md    # Project — shared with the team via git
   ```

   Write one when you keep pasting the same instructions into chat, or when a section of CLAUDE.md has grown from a *fact* into a *procedure*. The body only loads when the skill is used, so long reference material costs nothing until you need it.

   ```markdown
   <!-- .claude/skills/deploy/SKILL.md -->
   ---
   name: deploy
   description: Deploy the application to production
   disable-model-invocation: true
   allowed-tools: Bash(git push *) Bash(npm run build *)
   ---

   Deploy $ARGUMENTS to production:

   1. Run the test suite
   2. Build the application
   3. Push to the deployment target
   4. Verify the deployment succeeded
   ```

2. **"But what about slash commands?"** — the thing that changed since April

   **Custom commands have been merged into skills.** A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`, and both work the same way. Existing `.claude/commands/` files keep working — nothing is broken — but skills are where new work goes, because they add:

   - a **directory**, so a skill can ship supporting files and scripts alongside its instructions
   - **invocation control** (below), so you decide who can trigger it
   - **automatic loading**, so Claude reaches for it when the situation matches the `description`

   Skills follow the [Agent Skills](https://agentskills.io) open standard, so they travel to other tools. Claude Code extends the standard with invocation control, subagent execution (`context: fork`), and dynamic context injection.

   *Live demo:* OpenSpec installs both shapes side by side — thin `/opsx:*` files under `.claude/commands/opsx/`, and the real instructions in `.claude/skills/openspec-*/SKILL.md`. Open both and compare.

3. **Who invokes a skill?**

   | Frontmatter | You can invoke | Claude can invoke |
   |---|---|---|
   | *(default)* | Yes | Yes |
   | `disable-model-invocation: true` | Yes | No |
   | `user-invocable: false` | No | Yes |

   - `disable-model-invocation: true` for anything with side effects — `/deploy`, `/commit`, `/send-invoice`. You don't want Claude deciding your code looks ready to ship.
   - `user-invocable: false` for background knowledge that isn't a meaningful action — "how the legacy billing system works".

4. **Hooks — automated quality gates**
   - Configured in `settings.json`
   - A hook can be a shell command, an HTTP endpoint, an MCP tool call, an LLM prompt, or a subagent
   - Events fire at three cadences:
     - **once per session:** `SessionStart`, `SessionEnd`
     - **once per turn:** `UserPromptSubmit`, `Stop`, `StopFailure`
     - **per tool call:** `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, and others
   - The matcher matches **tool names** (e.g. `Write|Edit`) — not file patterns
   - The hook command receives the event as **JSON on stdin** (tool name, inputs, response); extract what you need with `jq`

   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Write|Edit",
           "hooks": [
             {
               "type": "command",
               "command": "f=$(jq -r '.tool_input.file_path'); case \"$f\" in *.ts) npx prettier --write \"$f\" ;; esac"
             }
           ]
         }
       ]
     }
   }
   ```

5. **Plugins — how a team ships all of this at once**

   A plugin is a directory that bundles skills, agents, hooks, and MCP config together, installable with one command. It is the answer to "how do I give my whole team this setup?"

   ```
   my-plugin/
   ├── .claude-plugin/plugin.json   # Manifest
   ├── skills/<name>/SKILL.md       # Skills
   ├── agents/                      # Subagent personas (Day 2)
   ├── hooks/hooks.json             # Hooks
   └── .mcp.json                    # MCP servers (Day 2)
   ```

   | | Standalone (`.claude/`) | Plugin |
   |---|---|---|
   | Invocation | `/hello` | `/plugin-name:hello` |
   | Sharing | Copy files by hand | `/plugin install` |
   | Best for | Personal workflows, quick experiments | Teams, versioned releases, reuse across projects |

   Start standalone in `.claude/`, convert to a plugin when you're ready to share. Browse and install with `/plugin`; add a team marketplace with `/plugin marketplace add <repo>`.

6. **How they fit together**
   - Skills: "here's a procedure" — Claude uses it when it fits, or you type `/name`
   - Hooks: "whenever Y happens, automatically do Z" — deterministic, not Claude's judgement
   - Plugins: "here's the whole kit" — distribution

---

## Module 6: Final Exercise — Build a Real Feature with OpenSpec (45 min)

**Learning Objectives:**
- Complete a full explore → propose → apply → archive cycle
- Practise refining AI-generated specs before implementation

**The Exercise:**

Each participant picks a small but non-trivial feature for a starter project:
- A search endpoint with filters and pagination
- A user profile page with editable fields
- A scheduled-reminders feature with timezone handling

**Walkthrough:**

1. `/opsx:explore` — talk through the idea, weigh options
2. `/opsx:propose` — generate proposal, specs, design, tasks
3. **Review and refine** (the critical step)
   - Is the proposal scoped sensibly?
   - Do the scenarios cover edge cases?
   - Does the design match the project's patterns?
4. `/opsx:apply` — implement the tasks
5. `/opsx:archive` — merge specs, mark complete

Facilitator circulates to help with stuck points.

---

## Day 1 Wrap (10 min)

- Round-robin: one thing each person learnt, one thing they'd like more of tomorrow
- Preview of Day 2: the four-role agent team, MCP, multi-agent patterns, the notIRC finale

---

# Day 2: Roles & Multi-Agent Teams

> **Theme:** Take the Product Owner's chair and put a team of specialists to work.
> **Duration:** 4 hours including a 15-minute break.

## Module 7: Welcome Back & CLAUDE.md (40 min)

**Learning Objectives:**
- Create CLAUDE.md files that persist project and personal context
- Understand the memory hierarchy

**Topics:**

1. **What is CLAUDE.md?**
   - Project-specific memory that loads every session
   - Acts as a custom system prompt for your project
   - Lives at the project root or in `.claude/`
   - Provides context without burning conversation tokens

2. **The memory hierarchy**

   | Scope | Location | Shared with |
   |---|---|---|
   | Managed policy | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS), `/etc/claude-code/CLAUDE.md` (Linux/WSL) | Everyone in the organisation |
   | User | `~/.claude/CLAUDE.md` | Just you, all projects |
   | Project | `./CLAUDE.md` or `./.claude/CLAUDE.md` | The team, via source control |
   | Local | `./CLAUDE.local.md` | Just you, this project (gitignore it) |

   Files above the working directory load at launch; files in subdirectories load on demand when Claude reads files there.

3. **Two ways to keep it from sprawling**
   - **`@path/to/file` imports** — pull in a README or a conventions doc rather than duplicating it. Relative paths resolve against the importing file. Backtick a path to mention it without importing it.
   - **`.claude/rules/`** — break instructions into topic-specific files, scoped to particular file types or subdirectories. Better than one 500-line CLAUDE.md.

4. **Personal CLAUDE.md — your global system prompt**
   ```markdown
   # Personal Preferences
   
   ## Communication Style
   - Be concise. Skip preambles.
   - Use British English spelling.
   
   ## Coding Defaults
   - Prefer functional style over classes where practical
   - Use early returns to reduce nesting
   
   ## Git
   - Use conventional commits
   - Keep commits small and focused
   ```

5. **Project CLAUDE.md — shared with the team**
   ```markdown
   # Project Overview
   Brief description of what this project does.
   
   ## Tech Stack
   - TypeScript 5.x, Next.js 14, PostgreSQL with Prisma
   
   ## Development Commands
   - `npm run dev`, `npm run test`, `npm run lint`
   
   ## Code Conventions
   - Functional components with hooks
   - Named exports preferred
   
   ## Important Patterns
   - Auth handled in `src/middleware.ts`
   - Database queries go through `src/services/`
   ```

6. **Anti-patterns**
   - Don't exceed ~500 lines — split into `.claude/rules/` instead
   - Don't duplicate what Claude can discover from the code
   - Don't let it drift out of sync with the actual codebase
   - Don't let two rules contradict each other; Claude may pick one arbitrarily
   - If a section has become a *procedure* rather than a *fact*, it wants to be a skill (Module 5)

**Hands-on (15 min):**
- Write or refine your personal `~/.claude/CLAUDE.md`
- Write a project `CLAUDE.md` for a project of your choice
- Test that your preferences are reflected in Claude's responses

---

## Module 8: The Agent Team — Product Owner, Orchestrator, Worker, Reviewer (45 min)

**Learning Objectives:**
- Understand the four-role model and what an agent persona is
- Write the worker and reviewer persona files by hand
- Use CLAUDE.md to make the main session the orchestrator — and you the Product Owner

**Topics:**

1. **The four-role model**

   Two of the roles are agent files. One is the main session. One is you.

   | Role | Who | Responsibility |
   |------|-----|----------------|
   | **Product Owner** | You, the human | Decides what to build; reviews the artefacts before implementation; gives final acceptance |
   | **Orchestrator** (analyst/architect) | The main Claude Code session, shaped by CLAUDE.md | Runs `/opsx:explore` and `/opsx:propose`; briefs the agents; runs the gates; never writes feature code |
   | **worker** | Subagent — `.claude/agents/worker.md` | Implements a block of work from the brief — including its tests |
   | **reviewer** | Subagent — `.claude/agents/reviewer.md` | Audits the worker's diff against the specs; checks the tests are meaningful and accurate; never writes code |

2. **What is a persona?**
   - Markdown file in `.claude/agents/` (project) or `~/.claude/agents/` (personal) that defines a specialised role
   - Gives Claude a focused identity, instructions, tool permissions, and its own model
   - Run as a subagent when the orchestrator delegates work to it

   Write these by asking Claude to draft one, or by hand. Note that `/agents` no longer opens a creation wizard — it just points you at the directory.

3. **Anatomy of a persona file**
   ```markdown
   <!-- .claude/agents/reviewer.md -->
   ---
   name: reviewer
   description: Audits a diff against the specs and checks the tests are meaningful
   tools: Read, Grep, Glob, Bash
   model: opus
   ---
   
   You are a senior code reviewer. Your job is to find problems,
   not to write code.
   
   When reviewing:
   1. Start with the git diff to understand what changed
   2. Check the changes against the specs — anything missing? anything extra?
   3. Check for security issues, then correctness (edge cases, error handling)
   4. Check the tests: do they cover the scenarios in the specs, and would
      they fail if the implementation were wrong?
   
   Format your review as:
   - 🔴 Critical: must fix before merge
   - 🟡 Warning: should fix
   - 💭 Suggestion: optional
   
   Do NOT rewrite the code. Point out problems and explain why they matter.
   ```

   **Frontmatter fields worth knowing:**

   | Field | Purpose |
   |---|---|
   | `name` | Required. Lowercase and hyphens; no `:` (reserved for plugin scoping) |
   | `description` | Required. *When Claude should delegate to this subagent* |
   | `tools` | Tools it may use. Omit to inherit everything |
   | `disallowedTools` | Tools to deny, subtracted from the inherited list |
   | `model` | `sonnet`, `opus`, `haiku`, `fable`, a full model ID, or `inherit` |
   | `permissionMode` | `default`, `acceptEdits`, `plan`, `dontAsk`, and others |

   > **Gotcha worth calling out in the room:** subagents use `tools:`, skills use `allowed-tools:`. They are different fields on different things, and mixing them up is the single most common mistake when writing a persona by hand. (The April 2026 version of this plan got it wrong.)

4. **The power of restricting tools**
   - A reviewer with no Write tool can't accidentally "fix" things — it can only report
   - The worker gets the full toolset; the reviewer gets read-and-run-tests only
   - Constraint shapes behaviour as much as instructions do
   - Give the reviewer the stronger model and the worker a faster one — the review is where judgement matters most

5. **The review loop and the gates**

   The heartbeat of the team is a loop the orchestrator runs for every block of work:

   ```
   worker implements the block (code + tests)
        │
        ▼
   reviewer audits the diff and the tests
        │
        ├─ findings? ──► back to the worker
        │
        └─ sign-off ──► gates: build clean, all tests green ──► commit
   ```

   - The worker writes the tests alongside the implementation
   - The reviewer checks the tests are meaningful and accurate — not just present
   - A block of work is only done when the reviewer signs off **and** the full test suite passes
   - Only then does the Product Owner hear "done"

   We'll build the two agent files by hand together — it's the fastest way to understand what's actually happening inside them.

6. **Making the main session the orchestrator — via CLAUDE.md**

   The orchestrator isn't an agent file — it's the main Claude Code session, given its role by your personal `~/.claude/CLAUDE.md`. The same block names *your* role explicitly:

   ```markdown
   # Working with OpenSpec and the agent team

   I am the Product Owner. You — the main session — are the orchestrator:
   the analyst and the architect. You never write feature code yourself.

   - `/opsx:explore` — investigate and surface open questions. Bring
     product questions to me; don't answer them on my behalf.
   - `/opsx:propose` — design the approach and produce proposal, specs,
     design, and tasks.
   - Between propose and apply: STOP. I review the artefacts before any
     implementation starts.
   - `/opsx:apply` — brief the **worker** subagent to implement one block
     of work at a time, tests included.
   - After each block, send the **reviewer** subagent to audit the diff
     and the tests. Feed findings back to the worker; repeat until the
     reviewer signs off.
   - A block is done only when the build is clean and all tests pass.
   - Before `/opsx:archive` — ask me for final acceptance.
   ```

   This turns the OpenSpec workflow into a coordinated team play — and it puts the human where they belong: making the product decisions, not typing the code.

7. **Automating the setup (optional)**

   Once you've written the files by hand, you'll notice the structure is repetitive. A scaffold **skill** can generate the orchestrator CLAUDE.md plus worker and reviewer personas tailored to a new project in one go — and a **plugin** (Module 5) can ship that skill plus the personas to your whole team. We write ours by hand today because it's the fastest way to understand what's in the files, but this is the natural thing to package once the pattern is second nature.

**Hands-on (20 min):**
- Build the **worker** and **reviewer** personas by hand
- Add the orchestration block above to your personal `~/.claude/CLAUDE.md`
- Test the reviewer against a sample diff

---

## Module 9: MCP — Giving Personas Extra Senses (25 min)

**Learning Objectives:**
- Understand what MCP is and why it exists
- Add an MCP server and use it from a persona

**Topics:**

1. **What is MCP?**
   - Model Context Protocol — an open standard for AI-tool integrations
   - Connects Claude to external services: GitHub, browsers, databases, APIs
   - Servers expose tools, resources, and prompts that Claude can use

2. **Adding an MCP server**
   ```bash
   # GitHub integration — GitHub's official remote MCP server,
   # authenticated with a fine-grained personal access token
   claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
     --header "Authorization: Bearer YOUR_GITHUB_PAT"
   
   # List configured servers
   claude mcp list
   
   # Inside Claude Code — check status, or sign in to an OAuth server
   /mcp
   ```

   `claude mcp add` saves the config without validating credentials, so a typo in the token shows up later as a `failed` server in `/mcp` with the HTTP status attached. Check `/mcp` shows `connected` before moving on.

   Many remote servers use OAuth rather than a token header: add them without a `--header`, then open `/mcp` and sign in. Claude Code refreshes those tokens on its own and prompts you to re-authenticate when a refresh fails.

   (The old `@modelcontextprotocol/server-github` npm package is archived — use the remote server.)

3. **Scopes**

   | Scope | Location | Visibility |
   |-------|----------|------------|
   | `local` | Project only | Just you, this project |
   | `project` | `.mcp.json` | Team (version controlled) |
   | `user` | Global config | You, all projects |

4. **A few useful servers**
   - **GitHub** — PRs, issues, CI status
   - **Playwright** / **Chrome DevTools** — browser automation
   - **context7** — up-to-date library documentation
   - **Filesystem** — extended file operations

5. **Pairing MCP with personas**
   - A "release-notes" persona with the GitHub MCP server can read merged PRs and draft notes
   - A "frontend-debugger" persona with a browser server can drive a real browser
   - Tools shape what a persona can do, just like `tools:` does

**Hands-on (10 min):**
- Add the GitHub MCP server
- Use it from your reviewer persona to look at a real PR

---

## Break (15 min)

---

## Module 10: Subagents — Invoking a Persona (20 min)

**Learning Objectives:**
- Spawn a subagent from within a session
- Understand when subagents earn their keep

**Topics:**

1. **What is a subagent?**
   - A child Claude session spawned by your main session
   - Gets its own conversation context, returns a single result
   - Uses a persona file to define its role
   - Parent session sees the result, not the subagent's full transcript

2. **When to use a subagent**
   - Research that would otherwise eat your main context
   - Specialised work where a focused persona produces better results
   - Parallel exploration (spawn three subagents, compare answers)
   - Long-running work you want to run in the background while you carry on

3. **When NOT to use a subagent**
   - Simple tasks the main session can do directly
   - Anything where the parent needs the subagent's full reasoning, not just the conclusion
   - Tight loops where spawning overhead dominates

4. **Invoking a subagent**
   - In conversation: "Use the reviewer agent to look at the auth changes"
   - The Agent tool routes to the named persona via its `subagent_type`
   - Result comes back as a single message
   - A skill can also run as a subagent: put `context: fork` in its frontmatter and the skill body becomes the subagent's prompt

---

## Module 11: Multi-Agent Teams (25 min)

**Learning Objectives:**
- Design a small team of agents that hand off work cleanly
- Recognise the patterns that work and the ones that don't

**Topics:**

1. **The shape of the team**

   ```
   you (Product Owner)
        │  intent · artefact review · acceptance
        ▼
   orchestrator (main session — analyst/architect)
        │ brief                       ▲ findings
        ▼                             │
      worker ────── diff ───────► reviewer
        ▲                             │
        └───────── fixes ◄────────────┘
   ```

   The worker → reviewer → worker cycle is the review loop from Module 8. The orchestrator runs it until the reviewer signs off, then runs the gates.

   **Scaling out — more workers, not more roles:**
   ```
                 ┌─► worker A: database layer ─┐
   orchestrator ─┤                             ├─► reviewer
                 └─► worker B: API layer ──────┘
   ```

   Parallel work means multiple *instances* of the worker persona with different, non-overlapping briefs — not new personas.

2. **Files are the communication layer**
   - Agents don't see each other's conversations
   - They communicate through artefacts: specs, tasks, handoff notes
   - OpenSpec gives you this for free — proposal, design, tasks are the contract

3. **Orchestration as a skill**
   ```markdown
   <!-- .claude/skills/block/SKILL.md -->
   ---
   name: block
   description: Run one block of work through the worker/reviewer loop
   disable-model-invocation: true
   ---
   
   Run the review loop for "$ARGUMENTS":
   
   1. Brief the worker: implement $ARGUMENTS from tasks.md, tests included
   2. Send the reviewer to audit the diff and the tests against the specs
   3. Feed findings back to the worker; repeat until the reviewer signs off
   4. Run the gates: build clean, all tests green
   5. Report back to me for acceptance
   ```

   `disable-model-invocation: true` matters here: this skill spends real tokens and moves the project forward. You decide when it runs, not Claude.

4. **What goes wrong**
   - Two workers editing the same file at once
   - Vague briefs ("build the rest of it")
   - A reviewer that's allowed to write code stops finding problems and starts "fixing" them
   - The orchestrator writing the code itself instead of briefing the worker
   - The fix in every case: clearer roles, clearer artefacts, tighter `tools:`

---

## Module 12: The notIRC Finale (60 min)

**Learning Objectives:**
- Use the four-role agent team to build a non-trivial integration
- Experience the full loop on a real, runnable system

**The exercise (lightly described — full instructions distributed separately):**

A WebSocket-based chat server (notIRC) is running on the workshop network. The API is documented in a handout. Each participant's task is to build a client that connects, joins a channel, and lets them chat with the room.

Participants work in their own repo with their own agent team. Suggested approach:
- The orchestrator (the main session) explores the API doc and drafts the spec — the participant reviews it as Product Owner
- The worker implements the client, tests included
- The reviewer audits the result before the client connects

The first person to send a message into the shared channel earns the laurels of victory. Bots and creative extensions (trivia games, reaction systems, ASCII art) are encouraged.

---

## Day 2 Wrap (10 min)

- Round-robin: what was the trickiest part? What surprised you?
- Encourage participants to share their notIRC clients
- Point to Appendix B for further exploration

---

## Appendix A: Quick Reference

### Essential Claude Code commands
```
/help           - List all commands
/model          - Switch models
/context        - See what's using your context window
/compact        - Compress context
/clear          - Reset conversation
/rewind         - Roll back to an earlier checkpoint
/skills         - List available skills
/plugin         - Browse, install and manage plugins
/mcp            - MCP server status and sign-in
/permissions    - Manage tool permissions
/doctor         - Diagnose your install
```

Type `/` to see everything available in your session. Bundled skills such as `/code-review` and `/security-review` appear alongside the built-ins.

### OpenSpec skills
```
/opsx:explore      - Think through ideas before committing
/opsx:propose      - Draft a complete change with all artefacts
/opsx:apply        - Implement tasks systematically
/opsx:archive      - Complete change, merge specs
/opsx:onboard      - Interactive tutorial
```

### File locations
```
# Claude Code — personal
~/.claude/CLAUDE.md              - Personal system prompt
~/.claude/skills/<name>/SKILL.md - Personal skills
~/.claude/agents/                - Personal agent personas
~/.claude/settings.json          - Personal settings and hooks

# Claude Code — project
./CLAUDE.md                      - Project memory (or ./.claude/CLAUDE.md)
./CLAUDE.local.md                - Personal project notes (gitignore it)
./.claude/rules/                 - Topic-scoped instruction files
./.claude/skills/<name>/SKILL.md - Project skills
./.claude/agents/                - Agent persona files
./.claude/commands/              - Legacy custom commands (still supported)
./.claude/settings.json          - Project settings and hooks
./.mcp.json                      - Project MCP config

# Plugins
<plugin>/.claude-plugin/plugin.json - Plugin manifest
<plugin>/skills/ agents/ hooks/     - Plugin components

# OpenSpec
openspec/specs/                  - Living specifications
openspec/changes/                - Active work
openspec/changes/archive/        - Completed changes
openspec/config.yaml             - Project configuration
```

---

## Appendix B: Further Exploration

For participants who want to keep going after the workshop.

### Going deeper with Claude Code
- **Writing your own skills** — the natural next step after Module 5; the `skill-creator` plugin will even help you write eval cases and A/B two versions of a skill
- **Building and distributing a plugin** — package your team's skills, agents and hooks; `claude plugin validate` before you publish
- **Headless / non-interactive mode** (`claude -p "..."`) for scripting and CI
- **Checkpoints and `/rewind`** — roll back a session that went sideways
- **Settings hierarchy** — `~/.claude/settings.json` vs `.claude/settings.json` vs `.claude/settings.local.json`
- **Advanced hooks** — HTTP endpoints, MCP tool calls, and LLM-prompt hooks, beyond shell commands

### Going deeper with OpenSpec
- **Custom schemas** for team-specific workflows (RFCs, security reviews, test plans)
- **Multiple concurrent changes** with `/opsx:bulk-archive`
- **`/opsx:verify`** — automated checks that implementation matches specs
- The OpenSpec Discord and GitHub for community patterns

### Going deeper with multi-agent work
- **Git worktrees** for fully isolated parallel work — give each agent its own working directory and branch
- **Background subagents** that run while you focus elsewhere
- **Headless orchestration scripts** that drive several Claude sessions from a single shell script
- **Custom MCP servers** — expose your own internal tools to Claude

### Resources
- OpenSpec: https://openspec.dev / https://github.com/Fission-AI/OpenSpec / https://discord.gg/YctCnvvshC
- Claude Code: https://docs.claude.com/en/docs/claude-code
- Agent Skills standard: https://agentskills.io
- MCP servers: https://github.com/modelcontextprotocol/servers
- Community skills and plugins: https://github.com/hesreallyhim/awesome-claude-code

