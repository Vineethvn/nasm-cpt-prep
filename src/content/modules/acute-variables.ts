import type { Module } from '../../types/content'

export const acuteVariables: Module = {
  id: 'd3-acute-variables',
  domainId: 'd3',
  title: 'Acute Variables',
  estMinutes: 30,
  lessons: [
    {
      id: 'av-l1',
      title: 'The 5 knobs you turn every phase',
      plain: `Every workout has 5 dials: **reps** (how many times), **sets** (how many rounds), **intensity** (how heavy, as % of your one-rep max), **tempo** (how slow or fast each rep is), and **rest** (how long you recover between sets). Change these 5 dials together and you get a completely different training effect from the exact same exercise.`,
      nasm: `The acute variables — repetitions, sets, training intensity, repetition tempo, and rest interval — are the most fundamental components of a resistance training program design, and their manipulation determines the specific adaptation elicited.`,
      mustMemorise: ['The 5 acute variables: reps, sets, intensity, tempo, rest'],
    },
    {
      id: 'av-l2',
      title: 'Reading tempo notation',
      plain: `Tempo looks like "4/2/1" and it always reads in the same order: how long you lower the weight, how long you pause, how long you lift it. So "4/2/1" means lower for 4 seconds, pause 2 seconds at the bottom, lift in 1 second. "X/X/X" means "as fast as possible" — that's what you see in Phase 4 and 5 where the goal is force or speed, not control.`,
      nasm: `Repetition tempo is expressed in the order: eccentric / isometric / concentric. An "X" denotes an explosive or as-fast-as-possible tempo, used in Maximal Strength and Power phases.`,
      mustMemorise: ['Tempo order = eccentric / isometric / concentric', 'X/X/X = as fast as possible (Phases 4–5)'],
    },
    {
      id: 'av-l3',
      title: 'Phase 1 vs Phase 4: opposite ends of the spectrum',
      plain: `Phase 1 (Stabilization Endurance) is light weight, lots of reps (12–20), short-to-no rest, and a slow controlled tempo — you're teaching the body control. Phase 4 (Maximal Strength) is the opposite: very heavy (85–100% 1RM), very few reps (1–5), long rest (3–5 min) so you can recover enough to lift near-maximal loads again, and explosive/controlled tempo on the lift.`,
      nasm: `Phase 1 utilizes light loads (50–70% 1RM), high volume (12–20 reps), and minimal rest (0–90 s) to develop stabilization and muscular endurance. Phase 4 utilizes very heavy loads (85–100% 1RM), low volume (1–5 reps), and long rest periods (3–5 min) to maximize motor unit recruitment and neural adaptations for maximal strength.`,
      mustMemorise: [
        'Phase 1: 12–20 reps, 1–3 sets, 50–70% 1RM, 4/2/1 tempo, 0–90s rest',
        'Phase 4: 1–5 reps, 4–6 sets, 85–100% 1RM, X/X/X tempo, 3–5 min rest',
      ],
    },
  ],
  items: [
    {
      kind: 'typein', id: 'av-t1', tags: ['acute-variables', 'phase1'],
      prompt: 'Phase 1 rep range?',
      accept: ['12-20', '12 to 20'],
      hints: ['A wide, high range for endurance.', '1_-2_'],
      explanation: 'Phase 1 (Stabilization Endurance) uses 12–20 reps.',
    },
    {
      kind: 'typein', id: 'av-t2', tags: ['acute-variables', 'phase4'],
      prompt: 'Phase 4 (Maximal Strength) rep range?',
      accept: ['1-5'],
      hints: ['Very low, for near-maximal loads.', '_-_'],
      explanation: 'Phase 4 uses 1–5 reps at 85–100% 1RM.',
    },
    {
      kind: 'typein', id: 'av-t3', tags: ['acute-variables', 'phase1'],
      prompt: 'Phase 1 rest interval?',
      accept: ['0-90 sec', '0-90 seconds', '0-90s', '0 to 90 seconds'],
      hints: ['Short to none — keeps the heart rate up.', '_-__ seconds'],
      explanation: 'Phase 1 rest is 0–90 seconds.',
    },
    {
      kind: 'typein', id: 'av-t4', tags: ['acute-variables', 'phase4'],
      prompt: 'Phase 4 rest interval?',
      accept: ['3-5 min', '3-5 minutes', '3 to 5 minutes'],
      hints: ['Long enough to recover for a near-max lift.', '_-_ minutes'],
      explanation: 'Phase 4 rest is 3–5 minutes to allow full recovery for maximal loads.',
    },
    {
      kind: 'typein', id: 'av-t5', tags: ['acute-variables', 'tempo'],
      prompt: 'What tempo notation is used for Phases 4 and 5 (explosive/as-fast-as-possible)?',
      accept: ['x/x/x', 'xxx'],
      hints: ['Same letter repeated 3 times.', 'X/_/_'],
      explanation: 'X/X/X denotes an explosive, as-fast-as-possible tempo.',
    },
    {
      kind: 'typein', id: 'av-t6', tags: ['acute-variables', 'phase3'],
      prompt: 'Phase 3 (Muscular Development) intensity range as % of 1RM?',
      accept: ['75-85%', '75 to 85 percent', '75-85 percent'],
      hints: ['Between strength-endurance and maximal-strength intensities.', '__-__%'],
      explanation: 'Phase 3 uses 75–85% 1RM.',
    },
    {
      kind: 'table-fill', id: 'av-tf1', tags: ['acute-variables', 'grid'],
      title: 'Fill in the resistance training acute variables for each phase',
      headers: ['Phase', 'Reps', 'Sets', 'Intensity', 'Rest'],
      rows: [
        { cells: ['1 – Stabilization Endurance', { blank: true, accept: ['12-20'] }, { blank: true, accept: ['1-3'] }, { blank: true, accept: ['50-70%', '50-70'] }, { blank: true, accept: ['0-90 sec', '0-90s', '0-90 seconds'] }] },
        { cells: ['2 – Strength Endurance', { blank: true, accept: ['8-12'] }, { blank: true, accept: ['2-4'] }, { blank: true, accept: ['70-80%', '70-80'] }, { blank: true, accept: ['0-60 sec', '0-60s', '0-60 seconds'] }] },
        { cells: ['3 – Muscular Development', { blank: true, accept: ['6-12'] }, { blank: true, accept: ['3-5'] }, { blank: true, accept: ['75-85%', '75-85'] }, { blank: true, accept: ['0-60 sec', '0-60s', '0-60 seconds'] }] },
        { cells: ['4 – Maximal Strength', { blank: true, accept: ['1-5'] }, { blank: true, accept: ['4-6'] }, { blank: true, accept: ['85-100%', '85-100'] }, { blank: true, accept: ['3-5 min', '3-5 minutes'] }] },
      ],
    },
    {
      kind: 'mcq', id: 'av-m1', tags: ['acute-variables'], source: 'original',
      prompt: 'A client training for Maximal Strength (Phase 4) rests 45 seconds between sets. What is the issue?',
      options: [
        'Rest is far too short to recover for near-maximal loads; should be 3–5 minutes',
        'Rest is correct for this phase',
        'Rest should be 0 seconds for true strength gains',
        'Rest only matters in Phase 1',
      ],
      answer: 0,
      explanation: 'Phase 4 loads are 85–100% 1RM and require 3–5 minutes of rest to allow adequate recovery of the phosphagen system between near-maximal efforts.',
      whyWrong: ['', '45 seconds matches Phase 1–3 rest, not Phase 4.', 'Zero rest would prevent any recovery and increase injury risk at these loads.', 'Rest interval is programmed in every phase, just at different durations.'],
    },
  ],
}
