# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- dgc-policy-v11 -->
# Dual-Graph Context Policy

This project uses a local dual-graph MCP server for efficient context retrieval.

## MANDATORY: Always follow this order

1. **Call `graph_continue` first** — before any file exploration, grep, or code reading.

2. **If `graph_continue` returns `needs_project=true`**: call `graph_scan` with the
   current project directory (`pwd`). Do NOT ask the user.

3. **If `graph_continue` returns `skip=true`**: project has fewer than 5 files.
   Do NOT do broad or recursive exploration. Read only specific files if their names
   are mentioned, or ask the user what to work on.

4. **Read `recommended_files`** using `graph_read` — **one call per file**.
   - `graph_read` accepts a single `file` parameter (string). Call it separately for each
     recommended file. Do NOT pass an array or batch multiple files into one call.
   - `recommended_files` may contain `file::symbol` entries (e.g. `src/auth.ts::handleLogin`).
     Pass them verbatim to `graph_read(file: "src/auth.ts::handleLogin")` — it reads only
     that symbol's lines, not the full file.
   - Example: if `recommended_files` is `["src/auth.ts::handleLogin", "src/db.ts"]`,
     call `graph_read(file: "src/auth.ts::handleLogin")` and `graph_read(file: "src/db.ts")`
     as two separate calls (they can be parallel).

5. **Check `confidence` and obey the caps strictly:**
   - `confidence=high` -> Stop. Do NOT grep or explore further.
   - `confidence=medium` -> If recommended files are insufficient, call `fallback_rg`
     at most `max_supplementary_greps` time(s) with specific terms, then `graph_read`
     at most `max_supplementary_files` additional file(s). Then stop.
   - `confidence=low` -> Call `fallback_rg` at most `max_supplementary_greps` time(s),
     then `graph_read` at most `max_supplementary_files` file(s). Then stop.

## Token Usage

A `token-counter` MCP is available for tracking live token usage.

- To check how many tokens a large file or text will cost **before** reading it:
  `count_tokens({text: "<content>"})`
- To log actual usage after a task completes (if the user asks):
  `log_usage({input_tokens: <est>, output_tokens: <est>, description: "<task>"})`
- To show the user their running session cost:
  `get_session_stats()`

Live dashboard URL is printed at startup next to "Token usage".

## Rules

- Do NOT use `rg`, `grep`, or bash file exploration before calling `graph_continue`.
- Do NOT do broad/recursive exploration at any confidence level.
- `max_supplementary_greps` and `max_supplementary_files` are hard caps - never exceed them.
- Do NOT dump full chat history.
- Do NOT call `graph_retrieve` more than once per turn.
- After edits, call `graph_register_edit` with the changed files. Use `file::symbol` notation (e.g. `src/auth.ts::handleLogin`) when the edit targets a specific function, class, or hook.

## Context Store

Whenever you make a decision, identify a task, note a next step, fact, or blocker during a conversation, call `graph_add_memory`.

**To add an entry:**
```
graph_add_memory(type="decision|task|next|fact|blocker", content="one sentence max 15 words", tags=["topic"], files=["relevant/file.ts"])
```

**Do NOT write context-store.json directly** — always use `graph_add_memory`. It applies pruning and keeps the store healthy.

**Rules:**
- Only log things worth remembering across sessions (not every minor detail)
- `content` must be under 15 words
- `files` lists the files this decision/task relates to (can be empty)
- Log immediately when the item arises — not at session end

## Session End

When the user signals they are done (e.g. "bye", "done", "wrap up", "end session"), proactively update `CONTEXT.md` in the project root with:
- **Current Task**: one sentence on what was being worked on
- **Key Decisions**: bullet list, max 3 items
- **Next Steps**: bullet list, max 3 items

Keep `CONTEXT.md` under 20 lines total. Do NOT summarize the full conversation — only what's needed to resume next session.

---

## Project Overview

**Lofty** is an AI-powered morning briefing tool for real estate agents. It surfaces prioritized leads, market signals, and action items each morning via a single-page web UI.

The repo is a **static frontend prototype** — no build system, no bundler, no backend. Open `demo/index.html` directly in a browser.

## Repository Layout

```
LoftyAI/
├── demo/
│   ├── index.html          # Entire UI — ~1500 lines of self-contained HTML/CSS/JS
│   ├── house1.png
│   └── house2.png
├── stitch_empathetic_humanized_design (2)/
│   ├── code.html           # Alternate design iteration
│   └── DESIGN.md           # Canonical design system spec ("The Midnight Concierge")
├── Lofty Main.pdf          # Product overview / pitch deck
└── LoftyLead_*.csv         # Sample lead data
```

## Design System — "The Midnight Concierge"

The authoritative spec is `stitch_empathetic_humanized_design (2)/DESIGN.md`. Key constraints:

- **No 1px borders for sectioning** — tonal surface shifts only. Use `outline_variant` at 20% opacity only for accessibility in input fields ("ghost border").
- **Surface hierarchy** (dark → light): `#0e0e0e` → `#131313` → `#1f1f1f` → `#2a2a2a`. Never nest more than 3 levels.
- **Typography**: Manrope (design spec) / Sora (current demo implementation). Hero metrics use `display-lg` (3.5rem). Body text minimum `0.875rem`.
- **Accent colors**: teal `#71d7cd` (primary), terracotta `#ffb692` (tertiary/"human" moments). Do not use pure `#ffffff` for text — use `#e2e2e2`.
- **Cards**: `xl` (1.5rem) border-radius on image containers. No 1px dividers between list items — use 24px vertical whitespace instead.
- **Floating elements**: `surface_container` at 70% opacity + `24px` backdrop-blur.
- **Shadows**: 40px blur, 6% opacity, tinted (not pure black).
- **Min tap target**: 44px for all interactive elements.

## UI Architecture (`demo/index.html`)

All styles, markup, and logic are in one file. Structure:

- **Left sidebar** (200px fixed): navigation links with `.nav-link` / `.nav-link.active`
- **Top strip**: view toggle buttons (`.toggle-btn`)
- **Main content**: priority-banded lead cards with `.band-urgent`, `.band-warm`, `.band-today`
- **Right sidebar** (`#right-sidebar`): slide-in detail panel, animated via CSS transform
- **"Why" panels**: collapsible explanations per lead, toggled via `.why-panel.open`

JavaScript is inline vanilla JS — no frameworks. Animations use CSS keyframes (`fadeInUp`, `pulseDot`, `floatBob`, `breathe`).

External dependencies (CDN only): Tailwind CSS, Google Fonts (Sora + Material Symbols Outlined).
