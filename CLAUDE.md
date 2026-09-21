# NASM-CPT Prep Portal — Project Spec

> This file is the source of truth for the project. Claude Code (and any other agent) reads it automatically every session.

---

## 1. What we are building

A world-class, mobile-first study portal for passing the **NASM Certified Personal Trainer (7th edition)** exam. It is not a document. It is an active-recall trainer: the learner **reads a clear explanation, then types answers from memory**, gets graded, gets hints, and weak items keep coming back until they stick.

**Quality bar:** a complete beginner (even a teenager) should be able to open it cold and cover the whole syllabus quickly. Every concept is taught twice: first in plain language with a gym analogy, then in exact NASM wording so the textbook phrasing is recognised on the exam.

**Primary user:** a working fitness coach (7+ years practical experience) who understands training but struggles to memorise NASM terminology, numbers and muscle lists. Exam is within days, so Milestone 1 must be usable on its own.

**Real exam format (verify against the current NASM candidate handbook):** 120 multiple-choice questions (100 scored + 20 unscored pilot), 120 minutes, 70% scaled pass mark.

---

## 2. Stack, hosting, workflow

- **Vite + React + TypeScript + Tailwind CSS v4.** No backend needed.
- **PWA with `vite-plugin-pwa`:** installable to the phone home screen, works fully offline after first load.
- **Storage:** all progress in `localStorage` behind a single `src/lib/storage.ts` module (so Supabase sync can be added later without touching components). Export progress (download JSON) and Import progress are on the Settings page.
- **Hosting:** GitHub repo → Vercel (auto-deploys on every `git push` to `main`). Preview deploys on branches.
- **Content lives in data files**, never hard-coded in components: `src/content/modules/<module>.ts` and `src/content/trainers/<trainer>.ts`. Adding a question = editing a data file and pushing.
- Responsive: must look designed on a 360 px phone and on a 1440 px desktop. Dark mode + light mode (see `src/lib/theme.ts`). Large tap targets. Keyboard support (Enter = submit, number keys 1-4 = choose MCQ option).
- Accessibility: semantic HTML, focus states, colour never the only signal (✓ / ✗ icons + text alongside colour).

---

## 3. Content data model

See `src/types/content.ts` for the authoritative TypeScript types: `Domain`, `Module`, `Lesson`, `Item` (a union of `McqItem | TypeInItem | MultiTypeInItem | TableFillItem | OrderItem | MatchItem | ScenarioItem`).

### Answer-matching rules for typed answers (critical) — implemented in `src/lib/matching.ts`
- Case-insensitive, trim, collapse spaces, ignore punctuation and hyphens.
- Normalise numbers and ranges: `12-20`, `12 to 20`, `12–20` are equal.
- Synonym/shorthand dictionary in `src/lib/synonyms.ts`.
- Fuzzy match (Levenshtein ≤ 2 for words over 6 letters) counts as correct but is flagged `fuzzy: true`.
- For `multi-typein`, order does not matter; the UI shows which expected answers were hit, which were missed, and any unmatched typed extras.

### Hint ladder (for every typed item) — implemented in `src/components/items/TypeInAnswer.tsx`
1st wrong → contextual hint. 2nd wrong → first-letters hint (`firstLetterHint()` in `matching.ts`). 3rd wrong → reveal full answer + explanation and lock the item; it counts as wrong for spaced repetition (drops to Leitner box 1).

---

## 4. Features (current status: Milestone 1 shipped)

1. **Dashboard** (`src/pages/Dashboard.tsx`): exam countdown, overall readiness %, per-domain mastery bars weighted by exam weight, "Today's plan", streak.
2. **Module page** (`src/pages/ModulePage.tsx`): three tabs — Learn, Type it, Quiz.
3. **Spaced repetition**: Leitner boxes 1→5 in `src/lib/storage.ts` + `src/lib/mastery.ts`. Wrong answers drop to box 1. Weak Spots page lists every item in boxes 1–2.
4. **Special trainers** (`src/pages/trainers/`):
   - Muscle Imbalance Trainer — drill / learn-the-logic / reverse-drill modes, data in `src/content/trainers/muscleImbalanceData.ts`.
   - Acute Variables Grid — fill-in table, data in `src/content/trainers/acuteVariablesData.ts`.
   - VT & Zone Lab — live HR-zone calculator + drill mode, formulas in `src/content/trainers/hrZones.ts`.
   - Stages of Change game, data in `src/content/trainers/stagesOfChangeData.ts`.
   - Communication Sorter (OARS), data in `src/content/trainers/communicationSorterData.ts`.
   - Numbers Vault — auto-built from every lesson's `mustMemorise` bullets, `src/lib/numbersVault.ts`.
5. **Sample Paper** (`src/pages/SamplePaperPage.tsx`, data in `src/content/samplePaper.ts`): all 100 questions from the user's NASM sample paper, each with an original explanation and a why-wrong note per option, browsable sequentially with a jump-to-question slider. Answer-key audit in `ANSWER-KEY-AUDIT.md`. Linked from the Modules page.
6. **Mock Exam** (`src/pages/MockExamPage.tsx`, logic in `src/lib/mockExam.ts`): 120 questions apportioned by domain weight (with proportional shortfall redistribution when a domain's item bank is smaller than its quota — see `VERIFY.md`), 120-minute countdown timer with auto-submit, no feedback until submission, then score by domain + full per-question review with explanations. Attempt history saved and shown on the intro screen. In-progress exams survive a page refresh (session-scoped).
7. **My Questions** (`src/pages/MyQuestionsPage.tsx`): add original MCQ or type-in questions from the UI; stored in `myQuestions` in `storage.ts`, included in export/import, and reviewed through the same spaced-repetition system and Weak Spots page as built-in content.
8. **Search** (`src/pages/SearchPage.tsx`, index in `src/lib/search.ts`): full-text search across every lesson, practice item, sample-paper question, and My Question — matches against complete content text (not just a truncated preview), linking back to the source page.
9. **Settings**: exam date, theme (light/dark/system), export/import/reset progress.

---

## 5. Syllabus map

Domain weights are the widely-cited 7th-edition figures — **VERIFY against the current NASM CPT exam blueprint** before relying on them for exam-day expectations. See `VERIFY.md`.

- **D1 — Basic & Applied Sciences and Nutrition (~19%)**
- **D2 — Assessment (~18%)**
- **D3 — Program Design (~21%)**
- **D4 — Exercise Technique & Training Instruction (~22%)**
- **D5 — Client Relations & Behavioral Coaching (~13%)**
- **D6 — Professional Development & Responsibility (~10%)**

Full topic bullets for each domain are in the original project brief (kept in conversation history / project notes); Milestone 2 will expand `src/content/modules/` to cover every bullet and cross-check against `COVERAGE.md` (to be generated).

---

## 6. Writing rules for all content

1. **Plain first, NASM second.** Every lesson has a `plain` field (short sentences, gym analogies, light `**bold**` markdown) and a `nasm` field (textbook wording).
2. **Explain the logic, not just the fact** (e.g. muscle-imbalance direction rule).
3. **Every MCQ explains why each wrong option is wrong** (`whyWrong` array, parallel to `options`).
4. **No invented facts.** Anything uncertain is listed in `VERIFY.md` rather than guessed.
5. **Original wording for all original questions** — never copy from paid NASM materials. The 100 sample-paper questions are the user's own study material and are used as-is; the surrounding explanations/whyWrong text is original.
6. Target volume: ≥ 25 practice items per module, ≥ 500 items total, plus the 100 sample-paper questions (already added). Current modules average well under 25 items each (~15–20 total across lessons/items per module is typical); topping every module up to ≥25 items is tracked as remaining M2 polish work, not blocking M3.

---

## 7. Canonical facts

Kept as data, not prose, so they can't drift out of sync with the code:
- Resistance/core/balance/plyometric acute variable tables → `src/content/trainers/acuteVariablesData.ts`
- Overhead squat compensation table → `src/content/trainers/muscleImbalanceData.ts`
- Cardio zone/HR formulas → `src/content/trainers/hrZones.ts`
- Stages of change definitions → `src/content/trainers/stagesOfChangeData.ts`

---

## 8. Sample-paper answer key audit

Done — see `ANSWER-KEY-AUDIT.md`. All 100 questions had complete stems in the supplied PDF (no reconstruction needed). Two items are flagged: Q94 ("most preventable cause of death" — key says Obesity, tobacco-use counterpoint noted) and Q47 (WHR high-risk distractor ambiguity). Everything else in the key was cross-checked against `CLAUDE.md` §7 canonical facts and confirmed consistent.

---

## 9. Milestones

**M1 (shipped):** project setup, PWA, storage + export/import, dashboard with countdown, module page (Learn / Type it / Quiz), answer-matching + hint ladder, spaced repetition, and 5 written modules (OPT Model & Periodization, Acute Variables, Muscle Imbalances, VT & Zone Lab, Stages of Change & Communication) plus all 6 special trainers including Numbers Vault. `npm run build` passes with zero TypeScript errors; `npm run validate-content` passes.

**M2 (shipped):** Sample Paper module (100 questions with explanations) + answer-key audit. All 19 modules from the syllabus map (§5) across all 6 domains, each with lessons (plain + NASM wording) and practice items — item counts per module currently range ~5–24, short of the ≥25/module target in some modules; see the note under §6 rule 6 below for the plan to top these up. Route-based code-splitting added (`React.lazy`) to keep the bundle lean as content grew.

**M3 (core features shipped):** 120-question timed mock exam, My Questions, and search — **done**. Still open: onboarding tour, further animation polish, and a real Lighthouse ≥ 90 audit (not yet run in this environment — no Chrome/Lighthouse CLI available; recommend running `npx lighthouse` against the deployed Vercel URL, or Chrome DevTools' Lighthouse panel, before relying on the ≥90 mobile score).

**Acceptance for every milestone:** works offline after first load; no horizontal scroll at 360 px; `npm run build` passes with zero TypeScript errors; `npm run validate-content` checks every MCQ answer index exists, every item has an explanation, and no duplicate IDs.

---

## 10. Commands

```
npm run dev              # start dev server
npm run build             # typecheck + production build
npm run validate-content  # validate all content data files
npm run preview           # preview the production build locally
```
