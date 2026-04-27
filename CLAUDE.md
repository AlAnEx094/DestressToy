# Landing Generator — Orchestration Playbook

## Overview
Turn a user brief into a production-ready React+Tailwind landing page via a visual reference loop.
Claude = orchestrator. Codex = executor.

---

## Pipeline State Tracking
Maintain a scratchpad at the top of each response:
```
[ ] step N — description
[x] step N — description
[!] step N — failed: reason
```

---

## Step-by-step Pipeline

### STEP 1 — Normalize Brief
**Trigger:** User says "start pipeline" or updates `artifacts/brief.md`.
**Action:**
1. Read `artifacts/brief.md`.
2. If fields are missing or ambiguous, list gaps and ask user to fill them.
3. When complete, confirm brief is normalized and proceed to Step 2.
**Output:** none (internal review only)

---

### STEP 2 — Generate Image Prompt Set
**Action:**
1. Read normalized `artifacts/brief.md`.
2. Fill `image_prompt_set.template.md` → write to `artifacts/image_prompt_set.md`.
   - Replace all `[PLACEHOLDERS]` with values from brief.
   - Variants A/B/C must differ meaningfully in visual direction.
   - Keep all shared constraints block intact.
**Output:** `artifacts/image_prompt_set.md`

---

### STEP 3 — Generate UI Reference Images (MANUAL / EXTERNAL)
**This step requires external image generation (Midjourney, DALL-E, etc.).**
1. Hand the user `artifacts/image_prompt_set.md`.
2. Instruct user to generate 3 images and save as:
   - `artifacts/reference_a.png`
   - `artifacts/reference_b.png`
   - `artifacts/reference_c.png`
3. Wait for confirmation that images are saved before proceeding.

---

### STEP 4 — Select Reference
**Trigger:** All 3 reference images exist in `artifacts/`.
**Action:**
1. Analyze each variant against the brief (hierarchy, CTA clarity, buildability, style fit).
2. Fill `reference_selection.template.md` → write to `artifacts/reference_selection.md`.
3. Copy selected image: `cp artifacts/reference_X.png artifacts/reference.png`
**Output:** `artifacts/reference_selection.md`, `artifacts/reference.png`

---

### STEP 5 — Build UI Spec + Acceptance Criteria
**Action:**
1. Read `artifacts/reference.png` (selected reference).
2. Read `artifacts/brief.md` for constraints.
3. Fill `ui_spec.template.json` with specific values → write to `artifacts/ui_spec.json`.
   - Use concrete px/rem values, not vague descriptors where possible.
   - `forbidden_deviations` must be populated based on this brief.
4. Write `artifacts/acceptance.md` based on the specific sections in the brief.
**Output:** `artifacts/ui_spec.json`, `artifacts/acceptance.md`

---

### STEP 6 — Write Implementation Task
**Action:**
1. Fill `implementation_task.template.md` with specific deliverables from ui_spec → write to `artifacts/implementation_task.md`.
2. Ensure all paths, stack, and viewport requirements are populated.
**Output:** `artifacts/implementation_task.md`

---

### STEP 7 — Codex Implements + Screenshots
**Delegation:**
```
TASK: Implement the landing page UI matching the visual reference.
CONTEXT:
  - reference image: artifacts/reference.png
  - UI spec: artifacts/ui_spec.json
  - acceptance criteria: artifacts/acceptance.md
  - task file: artifacts/implementation_task.md
  - stack: React + Tailwind (Vite)
  - entry: src/App.jsx
  - screenshot script: screenshot.js (run: node screenshot.js)
ACCEPTANCE:
  - screenshots at 1440px, 1024px, 390px saved to artifacts/screenshots/
  - dev server starts without errors
  - no console errors on load
```
**Invoke:** `mcp__codex-bridge__execute_with_codex`
**Output:** `artifacts/screenshots/screen_1440.png`, `screen_1024.png`, `screen_390.png`

---

### STEP 8 — Visual Diff Report
**Trigger:** Screenshots saved to `artifacts/screenshots/`.
**Action:**
1. Read `artifacts/reference.png`.
2. Read all screenshots in `artifacts/screenshots/`.
3. Compare section-by-section against ui_spec.json structure.
4. Fill `diff_report.template.md` → write to `artifacts/diff_report.md`.
   - Classify: critical / secondary / correct.
   - Match level: low (<60%) / medium (60-85%) / high (>85%).
   - If match ≥ high → declare DONE. Stop loop.
**Output:** `artifacts/diff_report.md`

---

### STEP 9 — Write Refinement Task (if match < high)
**Action:**
1. Read `artifacts/diff_report.md`.
2. Fill `refinement_task.template.md` with only the critical mismatches → write to `artifacts/refinement_task.md`.
   - Only patch listed mismatches.
   - Explicitly list what NOT to change.
   - Keep scope minimal.
**Output:** `artifacts/refinement_task.md`

---

### STEP 10 — Codex Patches
**Delegation:**
```
TASK: Apply only the listed patches from the refinement task. Do not change anything else.
CONTEXT:
  - refinement task: artifacts/refinement_task.md
  - reference: artifacts/reference.png
  - existing implementation: src/
  - "Do not change" list is in the refinement task — honor it strictly.
ACCEPTANCE:
  - screenshots updated at all 3 viewports
  - only listed mismatches changed
```
**Invoke:** `mcp__codex-bridge__execute_with_codex`
**Then:** Return to Step 8.

---

## Loop Exit
Exit when `diff_report.md` declares match level = **high**.
Deliver to user: `artifacts/screenshots/screen_1440.png` + final `src/` implementation.

---

## Artifact Directory Map
```
artifacts/
  brief.md                  ← user fills this
  image_prompt_set.md       ← step 2
  reference_a/b/c.png       ← step 3 (user provides)
  reference.png             ← step 4 (selected)
  reference_selection.md    ← step 4
  ui_spec.json              ← step 5
  acceptance.md             ← step 5
  implementation_task.md    ← step 6
  screenshots/              ← step 7, 10
    screen_1440.png
    screen_1024.png
    screen_390.png
  diff_report.md            ← step 8
  refinement_task.md        ← step 9
```

---

## Hard Rules
- Never tell Codex to "make it nice" or "improve design".
- Always convert visual judgment into specific px/class-level instructions.
- Codex only reads `artifacts/` for context — keep artifacts current.
- One refinement task = one atomic set of patches. No bundling unrelated fixes.
- If brief is ambiguous, ask before generating specs.
