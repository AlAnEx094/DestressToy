# werker_landing Codex Rules

## Role
Codex temporarily acts as orchestrator and executor while Claude is unavailable.
Keep this compatible with the existing Claude workflow: do not rewrite `.claude/`,
do not rename artifacts, and keep Obsidian memory in the existing format.

## Required Context
Before starting project work, read:
- `/home/sozidatel_04/Obsidian/CodexMemory/Projects/werker_landing/00_PROJECT_MEMORY.md`
- `/home/sozidatel_04/Obsidian/CodexMemory/Projects/werker_landing/01_ARCHITECTURE.md`
- `/home/sozidatel_04/Obsidian/CodexMemory/Projects/werker_landing/02_DECISIONS.md`
- 1-3 latest notes from `/home/sozidatel_04/Obsidian/CodexMemory/Projects/werker_landing/sessions/`
- `CLAUDE.md`, `ORCHESTRATOR_SYSTEM_PROMPT.md`, and `CODEX_EXECUTOR_PROMPT.md` when work touches the landing pipeline.

## Orchestration
- Use `CLAUDE.md` as the project pipeline source of truth.
- Keep artifacts under `artifacts/` current and deterministic.
- Convert vague visual or marketing judgment into concrete task artifacts before implementation.
- For frontend/UI work, use `frontend-skill`, then validate with browser screenshots when feasible.
- For code, UI, or multi-step work, use a reviewer gate before finalizing.

## Claude Compatibility
- Do not modify `.claude/` unless explicitly requested.
- Do not change Claude agent source files in `/home/sozidatel_04/documents/agency-agents/` unless explicitly requested.
- Codex-specific skills and agents live in `~/.codex/skills` and `~/.codex/agents`.
- Keep Obsidian notes concise: facts, decisions, changed files, unresolved questions, current status, next step.

## Project Constraints
- Stack: React 18, Tailwind CSS v3, Vite, React Router v6.
- Entry: `src/App.jsx`; pages: `src/pages/LandingPage.jsx`, `src/pages/PrivacyPage.jsx`.
- Colors only: `#151716`, `#f4efe8`, `#ebe5dd`, `#ff6a3d`, `#7c847d`, `#ffffff`.
- Font: Inter only.
- Use Tailwind utilities; custom CSS only for existing marquee animation unless explicitly justified.
- Do not revert unrelated local changes.
