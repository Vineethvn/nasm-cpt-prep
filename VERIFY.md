# Items flagged for verification against the current NASM 7th-edition textbook / candidate handbook

These were carried over as widely-cited figures from the project brief but should be
double-checked against the current official materials before the exam, since NASM
updates numbers between editions/printings.

1. **Domain exam weights** (`src/content/domains.ts`) — D1 19%, D2 18%, D3 21%, D4 22%, D5 13%, D6 10%. Verify against the current NASM CPT candidate handbook / exam blueprint.
2. **Exam format** — 120 questions (100 scored + 20 unscored), 120 minutes, 70% scaled pass. Verify against the current candidate handbook.
3. **Alternate HRmax formula** — 208 − (0.7 × age). Confirm this alternate is present/emphasized in the current 7th-edition text (the primary 220 − age formula is used throughout the app's items).
4. **SMR hold duration** — app currently teaches "~30 s"; some 7th-ed text may state 30–90 s. Confirm exact wording before treating it as an exam answer.
5. **SAQ sets/rest by population** (beginners 15–60 s rest; young athletes 1–4 sets; weight-loss clients 3–4 sets) — ~~not yet built into content~~ **confirmed** by the sample-paper answer key (Q18, Q29, Q52 in `src/content/samplePaper.ts`); still not yet built into a dedicated D4 SAQ lesson module (M2).
6. **Battle rope diameters** (2 in. for strength/power ≤ 30 s; 1.5 in. for longer endurance work) — the 2 in. figure is **confirmed** by the sample-paper key (Q68); the 1.5 in. endurance figure is still unconfirmed. Not yet built into a dedicated D4 modalities lesson module (M2).
7. **"Most preventable cause of death" sample-paper question** — resolved in `ANSWER-KEY-AUDIT.md`: the key says Obesity; the app keeps that answer but flags the tobacco-use counterpoint in the item text and tags (`sp-94`).
8. **WHR high-risk distractor ambiguity (sample-paper Q47)** — see `ANSWER-KEY-AUDIT.md`; both 0.88 and 0.83 technically exceed the >0.80 female high-risk threshold in item `sp-47`.

None of the above block Milestone 1 or the sample-paper module (items 7–8 are explained in-app, not blocking). Re-check items 1–4 before relying on the app close to exam day.
