import type { Module } from '../../types/content'

export const warmupFlexibility: Module = {
  id: 'd4-warmup-flexibility',
  domainId: 'd4',
  title: 'Warm-Up, SMR & Flexibility',
  estMinutes: 35,
  lessons: [
    {
      id: 'wf-l1',
      title: 'The standard workout order',
      plain: `A full OPT workout follows a set order: warm-up (SMR + flexibility) → core → balance → plyometric (reactive) → SAQ → resistance training → cool-down. The warm-up itself has two parts: **self-myofascial release (SMR)**, using a foam roller to release tight tissue, followed by **flexibility work** to prep the muscles that need it for that day's session.`,
      nasm: `The standard OPT workout sequence is: warm-up (self-myofascial release followed by flexibility techniques), core training, balance training, plyometric (reactive) training, speed/agility/quickness (SAQ) training, resistance training, and cool-down.`,
      mustMemorise: ['Workout order: warm-up (SMR + flexibility) → core → balance → plyometric → SAQ → resistance → cool-down'],
    },
    {
      id: 'wf-l2',
      title: 'How SMR actually works',
      plain: `Foam rolling (self-myofascial release) works by stimulating nerve receptors in the tissue you're rolling, which triggers relaxation and reduces pain/tension in that area. It is not a hormone-release mechanism and it doesn't build muscle — it's purely a neurological/tissue-relaxation tool, typically used before flexibility work as part of the warm-up.`,
      nasm: `Self-myofascial release (SMR) works by stimulating mechanoreceptors and nerve receptors within the fascia and muscle tissue, producing a neurophysiological relaxation response that reduces tension and pain sensitivity in the treated tissue. SMR is typically performed prior to flexibility exercises as part of the warm-up.`,
      mustMemorise: ['SMR mechanism: stimulating nerve receptors → tissue relaxation and reduced pain, not a hormonal or hypertrophy effect'],
    },
    {
      id: 'wf-l3',
      title: 'SMR roller placements',
      plain: `Knowing where to roll for which muscle is a common exam topic. Example: rolling the front and slightly outside (lateral) part of the upper thigh, just below the pelvis, targets the **tensor fascia latae (TFL)**. Other common placements include the calves (gastrocnemius/soleus), IT band, lats, and glutes/piriformis.`,
      nasm: `Common SMR roller placements include: front-lateral upper thigh just below the pelvis for the tensor fascia latae; posterior lower leg for the gastrocnemius/soleus; lateral thigh for the IT band; and the gluteal region for the piriformis.`,
      mustMemorise: ['Front-lateral upper thigh (just below pelvis) roller placement = tensor fascia latae'],
    },
    {
      id: 'wf-l4',
      title: 'Three types of flexibility training',
      plain: `NASM programs 3 tiers of flexibility work, matched to OPT phase. **Corrective flexibility**: SMR + static stretching (holding a stretch, roughly 30 seconds) — used in Phase 1, to fix tight, overactive muscles. **Active flexibility**: SMR + active-isolated stretching (briefer holds, 1-2 seconds, for 5-10 reps, actively moving the joint) — used in Phases 2-3, improving flexibility through a full range of motion during movement. **Functional flexibility**: SMR + dynamic stretching (moving through a range of motion for about 10 reps across several exercises) — used in Phases 4-5, prepping the body for high-intensity, multi-planar movement.`,
      nasm: `Corrective flexibility combines SMR with static stretching (holding a stretch, generally around 30 seconds) and is utilized in Phase 1 to address overactive/shortened tissue. Active flexibility combines SMR with active-isolated stretching (brief 1–2 second holds for 5–10 repetitions) and is utilized in Phases 2–3. Functional flexibility combines SMR with dynamic stretching (approximately 10 repetitions across multiple exercises) and is utilized in Phases 4–5 to prepare the body for high-intensity, multiplanar movement.`,
      table: {
        headers: ['Type', 'Technique', 'OPT phase(s)'],
        rows: [
          ['Corrective', 'SMR + static (hold ~30s)', 'Phase 1'],
          ['Active', 'SMR + active-isolated (1–2s hold, 5–10 reps)', 'Phases 2–3'],
          ['Functional', 'SMR + dynamic (10 reps, 3–10 exercises)', 'Phases 4–5'],
        ],
      },
      mustMemorise: [
        'Corrective flexibility = SMR + static stretch (~30s hold), Phase 1',
        'Active flexibility = SMR + active-isolated stretch (1–2s hold, 5–10 reps), Phases 2–3',
        'Functional flexibility = SMR + dynamic stretch (10 reps), Phases 4–5',
      ],
    },
    {
      id: 'wf-l5',
      title: 'What to consider before prescribing flexibility',
      plain: `Before choosing flexibility exercises, the most important thing to check is any medical precautions or contraindications flagged during the client's intake — not just their goals or general lifestyle. Safety comes before programming preference.`,
      nasm: `Prior to prescribing flexibility exercises, the fitness professional must first consider any medical precautions or contraindications identified during client intake and screening, prioritizing this over general lifestyle or goal-based programming decisions.`,
      mustMemorise: ['Before prescribing flexibility, check medical precautions/contraindications first'],
    },
  ],
  items: [
    { kind: 'typein', id: 'wf-t1', tags: ['workout-order'], prompt: 'What comes right after the warm-up in the standard OPT workout order?', accept: ['core', 'core training'], hints: ['Comes before balance.', 'C___ training'], explanation: 'Core training comes right after the warm-up.' },
    { kind: 'order', id: 'wf-o1', tags: ['workout-order'], prompt: 'Put the components of a standard OPT workout in order.', correctOrder: ['Warm-up', 'Core', 'Balance', 'Plyometric', 'SAQ', 'Resistance training', 'Cool-down'], explanation: 'Standard order: warm-up → core → balance → plyometric → SAQ → resistance training → cool-down.' },
    { kind: 'typein', id: 'wf-t2', tags: ['smr'], prompt: 'What is the neurophysiological mechanism by which SMR relaxes tissue?', accept: ['stimulating nerve receptors', 'stimulates nerve receptors'], hints: ['Involves nerve receptors, not hormones.', 'S___________ nerve receptors'], explanation: 'SMR works by stimulating nerve receptors, producing relaxation and reduced pain.' },
    { kind: 'typein', id: 'wf-t3', tags: ['smr'], prompt: 'Rolling the front-lateral upper thigh, just below the pelvis, targets which muscle?', accept: ['tensor fascia latae', 'tfl'], hints: ['Abbreviated TFL.', 'T_____ F_____ L_____'], explanation: 'The front-lateral upper thigh SMR placement targets the tensor fascia latae.' },
    { kind: 'typein', id: 'wf-t4', tags: ['flexibility'], prompt: 'Which type of flexibility training combines SMR with static stretching, used in Phase 1?', accept: ['corrective flexibility', 'corrective'], hints: ['"Fixes" tight muscles.', 'C_________ flexibility'], explanation: 'Corrective flexibility = SMR + static stretching, used in Phase 1.' },
    { kind: 'typein', id: 'wf-t5', tags: ['flexibility'], prompt: 'Which type of flexibility training combines SMR with dynamic stretching, used in Phases 4-5?', accept: ['functional flexibility', 'functional'], hints: ['Preps for high-intensity movement.', 'F________ flexibility'], explanation: 'Functional flexibility = SMR + dynamic stretching, used in Phases 4–5.' },
    { kind: 'typein', id: 'wf-t6', tags: ['flexibility'], prompt: 'Roughly how long is a static stretch held in corrective flexibility?', accept: ['30 seconds', '30 sec', '~30 seconds'], hints: ['Half a minute.', '__ seconds'], explanation: 'Static stretches in corrective flexibility are held for roughly 30 seconds.' },
    { kind: 'typein', id: 'wf-t7', tags: ['flexibility'], prompt: 'What should a trainer check first before prescribing flexibility exercises?', accept: ['medical precautions or contraindications', 'medical precautions', 'contraindications'], hints: ['Safety-related, from intake.', 'M______ precautions/contraindications'], explanation: 'Check any medical precautions or contraindications first.' },
    {
      kind: 'mcq', id: 'wf-m1', tags: ['flexibility'], source: 'original',
      prompt: 'Which flexibility type uses active-isolated stretching (brief 1-2 second holds, 5-10 reps) and is used in Phases 2-3?',
      options: ['Corrective flexibility', 'Active flexibility', 'Functional flexibility', 'Static flexibility'],
      answer: 1,
      explanation: 'Active flexibility uses SMR + active-isolated stretching and is used in Phases 2–3.',
      whyWrong: ['Corrective flexibility uses static stretching in Phase 1, not active-isolated stretching.', '', 'Functional flexibility uses dynamic stretching in Phases 4–5, not active-isolated stretching.', '"Static flexibility" is not one of the three NASM flexibility categories.'],
    },
    {
      kind: 'match', id: 'wf-match1', tags: ['flexibility'],
      prompt: 'Match each flexibility type to its OPT phase.',
      pairs: [
        ['Corrective flexibility', 'Phase 1'],
        ['Active flexibility', 'Phases 2–3'],
        ['Functional flexibility', 'Phases 4–5'],
      ],
      explanation: 'Corrective (Phase 1) → Active (Phases 2–3) → Functional (Phases 4–5).',
    },
  ],
}
