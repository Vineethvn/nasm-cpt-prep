# Sample Paper Answer Key Audit

Source: `Questions of NASM CPT-011.docx (1) (3) (2) (5) (2) (1).pdf` (100 questions with an answer key, supplied by the user). All 100 questions had complete stems and options in the source — no reconstruction from the answer key alone was needed (the spec's original concern about missing Q25/Q86 stems did not apply to this copy of the paper; both had full text).

Every answer in the key was checked against the canonical facts in `CLAUDE.md` §7 / `VERIFY.md`. Two items are flagged below; everything else in the key is consistent with NASM 7th-edition material as represented in this app.

## Flagged items

### Q94 — "Which common cause of death is the most preventable?"
**Key answer: Obesity.**

This is the same ambiguity called out in the original project brief. Some public-health sources (e.g. CDC-cited research) name **tobacco use**, not obesity, as the single most preventable cause of death — obesity-related mortality is itself often driven by a mix of modifiable and non-modifiable factors. The app keeps the key's answer (`Obesity`) as correct, since that is what the source material specifies, but the item's explanation text notes the discrepancy and it carries a `VERIFY` tag in `src/content/samplePaper.ts` (`sp-94`). If your official NASM material states a different intended answer, update `sp-94` directly.

### Q47 — WHR high-risk category for a female
**Key answer: WHR of 0.88** (options were 0.88, 0.72, 0.78, 0.83).

Per NASM's stated female high-risk threshold (WHR > 0.80, per `CLAUDE.md` §7), **both 0.88 and 0.83** exceed the threshold and would technically place a client in the high-risk category. The key selects 0.88, presumably intending "the clearest/highest-risk value," but the item as written has two technically-correct options. The app keeps the key's answer (0.88) as correct and notes this ambiguity in the item's `whyWrong` text for option d (`sp-47`). Consider rewording the distractor (e.g. 0.79) if this item is reused in a scored exam context.

## Not flagged (verified consistent)

These answers were specifically cross-checked against `CLAUDE.md` canonical facts and confirmed:

- Q18, Q29, Q52 (SAQ rest/sets by population) — match the beginner (15–60s rest), young-athlete (1–4 sets), and weight-loss (3–4 sets) figures already in `VERIFY.md`; those `VERIFY` flags can now be considered confirmed rather than merely carried over.
- Q68 (battle rope diameter, 2 in. for ≤30s strength/power work) — matches `VERIFY.md`.
- Q79 (ISSN protein range, 1.4–2.0 g/kg) — matches `CLAUDE.md` §7.
- Q92 (8 B vitamins), Q97 (10% bone density loss → 2.5x hip fracture risk), Q76 (BP cuff inflation 20–30 mmHg above pulse-disappearance point), Q25 (BMI overweight 25–29.9), Q93 (Tabata: 4 min total, 170% VO2max) — all match `CLAUDE.md` §7 canonical facts.

## Coverage note

All 100 questions are wired into the app as `src/content/samplePaper.ts` (`SAMPLE_PAPER`, id prefix `sp-`) with original explanations and a "why each wrong option is wrong" note for every option, per the spec's content rules (§6). They're browsable at **Sample Paper** (linked from the Modules page) as a sequential MCQ quiz with immediate feedback, and participate in the same Leitner spaced-repetition system as every other item in the app.
