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
5. **Mock exam, Sample Paper module, My Questions, Search** — planned for M2/M3 (see Milestones below). Not yet built.
6. **Settings**: exam date, theme (light/dark/system), export/import/reset progress.

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
5. **Original wording for all original questions** — never copy from paid NASM materials. The sample-PDF questions (once supplied) are the user's own study material and may be used as-is.
6. Target volume: ≥ 25 practice items per module, ≥ 500 items total, plus the sample-paper questions once added.

---

## 7. Canonical facts

Kept as data, not prose, so they can't drift out of sync with the code:
- Resistance/core/balance/plyometric acute variable tables → `src/content/trainers/acuteVariablesData.ts`
- Overhead squat compensation table → `src/content/trainers/muscleImbalanceData.ts`
- Cardio zone/HR formulas → `src/content/trainers/hrZones.ts`
- Stages of change definitions → `src/content/trainers/stagesOfChangeData.ts`

---

## 8. Sample-paper answer key audit

Not yet done — blocked on `source/Questions_of_NASM_CPT.pdf` (98 questions), which the user will provide. Once supplied, parse it into a Sample Paper module with full explanations and produce `ANSWER-KEY-AUDIT.md` per the original spec (Q25/Q86 stems reconstructed from the answer key only, clearly labelled; flag any answer that looks wrong, e.g. the "most preventable cause of death" question).

---

## 9. Milestones

**M1 (shipped):** project setup, PWA, storage + export/import, dashboard with countdown, module page (Learn / Type it / Quiz), answer-matching + hint ladder, spaced repetition, and 5 written modules (OPT Model & Periodization, Acute Variables, Muscle Imbalances, VT & Zone Lab, Stages of Change & Communication) plus all 6 special trainers including Numbers Vault. `npm run build` passes with zero TypeScript errors; `npm run validate-content` passes.

**M2:** all remaining D1–D6 modules with lessons and ≥ 25 items each; Sample Paper module (98 questions with explanations) + answer-key audit — once the source PDF is supplied.

**M3:** 120-question timed mock exam, My Questions, search, polish (animations, empty states, onboarding tour), Lighthouse ≥ 90 on mobile for performance and accessibility.

**Acceptance for every milestone:** works offline after first load; no horizontal scroll at 360 px; `npm run build` passes with zero TypeScript errors; `npm run validate-content` checks every MCQ answer index exists, every item has an explanation, and no duplicate IDs.

---

## 10. Commands

```
npm run dev              # start dev server
npm run build             # typecheck + production build
npm run validate-content  # validate all content data files
npm run preview           # preview the production build locally
```
