import type { Module } from '../../types/content'

export const resistanceTechnique: Module = {
  id: 'd4-resistance-technique',
  domainId: 'd4',
  title: 'Resistance Training Technique & Exercise Selection',
  estMinutes: 40,
  lessons: [
    {
      id: 'rt-l1',
      title: 'Matching exercises to OPT phase',
      plain: `Every exercise fits somewhere on the stabilization-to-power spectrum. Phase 1 exercises emphasize control on unstable/challenging surfaces (e.g. a stability ball push-up). Phase 3-4 exercises emphasize heavy, stable, well-grooved compound lifts (e.g. a barbell squat, shoulder/military press). Phase 5 exercises emphasize speed and explosiveness with lighter loads (e.g. a squat jump, medicine ball throw). Picking the right exercise for a phase is a common exam trap — e.g. a shoulder/military press fits Phase 4 (Maximal Strength) far better than a stability-ball push-up (which is a Phase 1 stabilization exercise) or a squat jump (Phase 5 power).`,
      nasm: `Exercise selection should align with the acute variables and training goal of the current OPT phase. Phase 1 exercises typically incorporate unstable or destabilizing elements (e.g., stability ball push-up) to build stabilization capacity. Phases 3–4 emphasize stable, heavily loadable compound movements (e.g., barbell squat, shoulder/military press) for hypertrophy and maximal strength. Phase 5 emphasizes lighter-load, high-velocity movements (e.g., squat jump, medicine ball throw) to develop power.`,
      mustMemorise: ['Phase 1 exercises emphasize instability/control; Phase 4 emphasizes heavy stable compound lifts; Phase 5 emphasizes light, fast, explosive movements'],
    },
    {
      id: 'rt-l2',
      title: 'Common power-focused exercises',
      plain: `Power exercises move a lighter load as fast/explosively as possible. Classic examples: medicine ball soccer throw, medicine ball chest pass, squat jump. These contrast with strength-focused exercises like a bench press or barbell squat performed at a controlled tempo, which build maximal force rather than speed. Among power options, a *thrown* implement like a medicine ball demands the most pure explosive power, since there's no need to decelerate it eccentrically the way you would a barbell — it's released rather than caught and controlled.`,
      nasm: `Power-focused resistance training exercises, such as the medicine ball soccer throw, chest pass, or squat jump, emphasize maximal velocity movement with lighter loads. Thrown implements such as medicine balls place the greatest demand on pure explosive power output, as they require no eccentric deceleration of the load, unlike a caught or racked implement.`,
      mustMemorise: ['Medicine ball throws demand the most explosive power since no eccentric deceleration is needed'],
    },
    {
      id: 'rt-l3',
      title: 'Local vs. global core, and floor bridge technique',
      plain: `(Cross-reference with the Core/Balance/Plyo/SAQ module.) One frequently tested detail: on a floor bridge, don't raise the hips too far off the floor — doing so hyperextends (arches) the lumbar spine, placing excessive stress on the low back. The correct cue is to keep the body in a straight line from shoulders to knees, not arched.`,
      nasm: `During the floor bridge exercise, excessive hip elevation places the lumbar spine into hyperextension, creating undue stress. Proper technique maintains a neutral spine with a straight line from shoulders through knees at the top of the movement.`,
      mustMemorise: ['Floor bridge: don\'t raise hips too high — risks lumbar hyperextension, not hyperflexion'],
    },
    {
      id: 'rt-l4',
      title: 'Global core exercise extensibility: the medicine ball pullover throw',
      plain: `Some exercises require adequate flexibility in a specific muscle before they can be performed safely. The medicine ball pullover throw moves the arms from overhead down and back — this requires good extensibility (length) in the **latissimus dorsi**, a global core/shoulder muscle. If the lats are too tight, this throw can strain the shoulder or force compensation elsewhere.`,
      nasm: `Proper extensibility of the latissimus dorsi is a prerequisite for safely performing the medicine ball pullover throw, given the muscle's role in controlling the overhead-to-extended shoulder pattern the exercise requires.`,
      mustMemorise: ['Medicine ball pullover throw requires good latissimus dorsi extensibility'],
    },
  ],
  items: [
    { kind: 'typein', id: 'rt-t1', tags: ['exercise-selection'], prompt: 'Which OPT phase is a stability ball push-up most appropriate for?', accept: ['phase 1', '1'], hints: ['The stabilization phase.', 'Phase _'], explanation: 'A stability ball push-up is a Phase 1 stabilization-emphasis exercise.' },
    { kind: 'typein', id: 'rt-t2', tags: ['exercise-selection'], prompt: 'Which OPT phase is a squat jump most appropriate for?', accept: ['phase 5', '5'], hints: ['The power phase.', 'Phase _'], explanation: 'A squat jump is a Phase 5 power exercise.' },
    { kind: 'typein', id: 'rt-t3', tags: ['exercise-selection'], prompt: 'Name a common power-focused resistance exercise using a thrown implement.', accept: ['medicine ball soccer throw', 'medicine ball chest pass', 'medicine ball throw'], hints: ['Involves a medicine ball.', 'M_______ B___ throw'], explanation: 'Medicine ball throws (soccer throw, chest pass) are classic power-focused exercises.' },
    { kind: 'typein', id: 'rt-t4', tags: ['technique'], prompt: 'On a floor bridge, raising the hips too high risks what spinal issue?', accept: ['lumbar hyperextension', 'hyperextension of the lumbar spine'], hints: ['Arching, not rounding.', 'L_____ H____________'], explanation: 'Excessive hip elevation on a floor bridge risks lumbar hyperextension.' },
    { kind: 'typein', id: 'rt-t5', tags: ['technique'], prompt: 'Good extensibility of which muscle is needed before a medicine ball pullover throw?', accept: ['latissimus dorsi', 'lats'], hints: ['A large back muscle.', 'L_________ D____'], explanation: 'The latissimus dorsi needs good extensibility for a safe medicine ball pullover throw.' },
    {
      kind: 'mcq', id: 'rt-m1', tags: ['exercise-selection'], source: 'original',
      prompt: 'Which exercise is most appropriate for a maximal strength movement in Phase 4?',
      options: ['Single-leg dumbbell curl to shoulder press', 'Stability ball push-up', 'Shoulder/military press', 'Squat jump'],
      answer: 2,
      explanation: 'A straightforward, heavily-loadable compound lift like the shoulder/military press fits Phase 4\'s heavy, low-rep focus.',
      whyWrong: ['This multi-step, stabilization-focused exercise fits Phase 1–2, not heavy Phase 4 loading.', 'A stability ball push-up is a Phase 1 stabilization exercise, not a max-strength loadable movement.', '', 'A squat jump is a Phase 5 power exercise, not a maximal-strength one.'],
    },
    {
      kind: 'mcq', id: 'rt-m2', tags: ['technique'], source: 'original',
      prompt: 'Why should you avoid raising the hips too far off the floor during a floor bridge?',
      options: [
        'It may place too much stress on the lumbar spine through hyperflexion.',
        'It may place too much stress on the cervical spine.',
        'It may place excessive stress on the thoracic spine.',
        'It may place excessive stress on the lumbar spine through hyperextension.',
      ],
      answer: 3,
      explanation: 'Raising the hips too high arches (hyperextends) the lower back.',
      whyWrong: ['The risk is hyperextension, not hyperflexion.', 'The cervical spine is not the primary concern here.', 'The thoracic spine is not the primary concern here.', ''],
    },
  ],
}
