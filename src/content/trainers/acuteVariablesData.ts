// Canonical acute-variable tables per NASM-Portal-SPEC.md §7. Do not alter
// without re-checking the 7th-edition textbook.

export type AcuteVariableRow = {
  phase: string
  reps: string
  sets: string
  intensity: string
  tempo: string
  rest: string
}

export const RESISTANCE_TABLE: AcuteVariableRow[] = [
  { phase: '1 – Stabilization Endurance', reps: '12–20', sets: '1–3', intensity: '50–70% 1RM', tempo: '4/2/1', rest: '0–90 s' },
  { phase: '2 – Strength Endurance', reps: '8–12', sets: '2–4', intensity: '70–80%', tempo: '2/0/2 (strength) + 4/2/1 (stab) superset', rest: '0–60 s' },
  { phase: '3 – Muscular Development', reps: '6–12', sets: '3–5', intensity: '75–85%', tempo: '2/0/2', rest: '0–60 s' },
  { phase: '4 – Maximal Strength', reps: '1–5', sets: '4–6', intensity: '85–100%', tempo: 'X/X/X', rest: '3–5 min' },
  { phase: '5 – Power', reps: '1–5 strength / 8–10 power', sets: '3–5', intensity: '85–100% (strength) / 30–45% or ~10% BW (power)', tempo: 'X/X/X', rest: '3–5 min between pairs' },
]

export type SupportTableRow = {
  category: 'Stabilization' | 'Strength' | 'Power'
  reps: string
  sets: string
  tempo: string
}

// Applies to core, balance, and plyometric training (plyo stabilization reps/hold noted separately)
export const CORE_BALANCE_TABLE: SupportTableRow[] = [
  { category: 'Stabilization', reps: '12–20', sets: '1–4', tempo: 'Slow' },
  { category: 'Strength', reps: '8–12', sets: '2–3', tempo: 'Medium' },
  { category: 'Power', reps: '8–12', sets: '2–3', tempo: 'Fast / controlled' },
]

export const PLYOMETRIC_TABLE: SupportTableRow[] = [
  { category: 'Stabilization', reps: '5–8 (3–5 s landing hold)', sets: '1–3', tempo: 'Slow, controlled landing' },
  { category: 'Strength', reps: '8–10', sets: '2–3', tempo: 'Medium' },
  { category: 'Power', reps: '8–10', sets: '2–3', tempo: 'Fast / explosive' },
]

export const TEMPO_EXPLAINER = 'Tempo is written as eccentric / isometric / concentric (e.g. 4/2/1 = 4s lowering, 2s pause, 1s lifting).'
