# Items flagged for verification against the current NASM 7th-edition textbook / candidate handbook

These were carried over as widely-cited figures from the project brief but should be
double-checked against the current official materials before the exam, since NASM
updates numbers between editions/printings.

1. **Domain exam weights** (`src/content/domains.ts`) — D1 19%, D2 18%, D3 21%, D4 22%, D5 13%, D6 10%. Verify against the current NASM CPT candidate handbook / exam blueprint.
2. **Exam format** — 120 questions (100 scored + 20 unscored), 120 minutes, 70% scaled pass. Verify against the current candidate handbook.
3. **Alternate HRmax formula** — 208 − (0.7 × age). Confirm this alternate is present/emphasized in the current 7th-edition text (the primary 220 − age formula is used throughout the app's items).
4. **SMR hold duration** — app currently teaches "~30 s"; some 7th-ed text may state 30–90 s. Confirm exact wording before treating it as an exam answer.
5. **SAQ sets/rest by population** (beginners 15–60 s rest; young athletes 1–4 sets; weight-loss clients 3–4 sets) — **confirmed** by the sample-paper answer key (Q18, Q29, Q52) and now built into `src/content/modules/d4-core-balance-plyo-saq.ts`.
6. **Battle rope diameters** (2 in. for strength/power ≤ 30 s; 1.5 in. for longer endurance work) — the 2 in. figure is **confirmed** by the sample-paper key (Q68) and built into `src/content/modules/d4-modalities.ts`; the 1.5 in. endurance figure is still unconfirmed against the textbook itself (only used as a distractor value, not asserted as fact elsewhere).
7. **"Most preventable cause of death" sample-paper question** — resolved in `ANSWER-KEY-AUDIT.md`: the key says Obesity; the app keeps that answer but flags the tobacco-use counterpoint in the item text and tags (`sp-94`).
8. **WHR high-risk distractor ambiguity (sample-paper Q47)** — see `ANSWER-KEY-AUDIT.md`; both 0.88 and 0.83 technically exceed the >0.80 female high-risk threshold in item `sp-47`.
9. **Mock exam domain distribution** (`src/lib/mockExam.ts`) — the 120-question mock exam apportions questions by domain exam weight, but D5 and D6 currently have smaller item banks than their quota requires (D5 ~13% of 120 ≈ 16 questions needed, D6 ~10% ≈ 12), so the shortfall is redistributed proportionally from other domains' surplus. This means a given mock exam's actual per-domain question count may drift a few points from the exact weight until more D5/D6 content is added — check the "Score by domain" totals on the results screen rather than assuming exact proportions.

None of the above block any shipped milestone (items 7–9 are explained in-app or self-correcting as content grows, not blocking). Re-check items 1–4 before relying on the app close to exam day.
