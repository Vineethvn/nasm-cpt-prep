import type { Module } from '../../types/content'

export const modalities: Module = {
  id: 'd4-modalities',
  domainId: 'd4',
  title: 'Training Modalities & Equipment',
  estMinutes: 30,
  lessons: [
    {
      id: 'mod-l1',
      title: 'Battle ropes',
      plain: `Rope thickness changes the training effect. **2-inch ropes** are heavier and best for strength, power, and anaerobic work in short bouts (≤30 seconds). **1.5-inch ropes** are lighter, suited to longer, more endurance-oriented sets. Thicker = heavier = more strength/power demand; thinner = lighter = more endurance-friendly.`,
      nasm: `Battle rope diameter influences training adaptation: 2-inch diameter ropes are appropriate for strength, power, and anaerobic adaptations in bouts of 30 seconds or less, due to their greater mass and resistance. 1.5-inch diameter ropes are better suited to longer-duration, endurance-oriented work.`,
      mustMemorise: ['2 in. battle rope = strength/power/anaerobic, ≤30 sec bouts', '1.5 in. battle rope = longer, endurance-oriented work'],
    },
    {
      id: 'mod-l2',
      title: 'ViPR, medicine balls, and other loaded/explosive tools',
      plain: `**ViPR** (a weighted cylindrical tube) is specifically designed for "loaded movement training" — combining external load with dynamic, functional, multi-planar movement patterns, unlike a fixed-path machine. **Medicine balls** are ideal for pure explosive power work because they're thrown/released — no eccentric deceleration needed, unlike a dumbbell or barbell you have to control and re-rack. **Kettlebells** still require eccentric control (you have to catch/lower them), so they don't offer the same "no deceleration" benefit as a thrown medicine ball.`,
      nasm: `ViPR (Vitality, Performance, Reconditioning) tools are purpose-built for loaded movement training, combining external resistance with dynamic, functional, multiplanar movement. Medicine balls allow for maximally explosive movement without the need for eccentric deceleration, since the implement is released rather than caught or racked, distinguishing them from kettlebells or dumbbells which require eccentric control.`,
      mustMemorise: ['ViPR = purpose-built tool for loaded movement training', 'Medicine balls allow fully explosive movement with no eccentric deceleration needed'],
    },
    {
      id: 'mod-l3',
      title: 'Suspension trainers and other modalities',
      plain: `Suspended bodyweight training (like a TRX) uses the body's own weight anchored to a strap, challenging stability through an unstable, moving anchor point — but it still requires eccentric control as the body lowers, unlike a thrown medicine ball. Other common modalities: sandbags (shifting, unstable load), sleds (pure horizontal-force training, no eccentric component on the push), BOSU and stability balls (instability training), resistance bands (variable resistance, increasing tension through the range of motion), and wrist-worn heart rate monitors — which can give inaccurate readings during exercises with rapid, repetitive wrist motion (like catching and passing a medicine ball), since that motion disrupts the sensor.`,
      nasm: `Suspended bodyweight training utilizes an anchored strap system to challenge stability using the body's own mass, requiring eccentric control unlike a released implement. Additional modalities include sandbags (shifting/unstable load), sleds (horizontal force production), BOSU and stability balls (instability training), and resistance bands (variable/accommodating resistance). Wrist-worn heart rate monitors are prone to inaccurate readings during exercises involving rapid, repetitive wrist motion, such as catching and passing a medicine ball, due to sensor disruption.`,
      mustMemorise: ['Wrist-worn HR monitors are inaccurate during exercises with rapid wrist motion (e.g. medicine ball catch and pass)'],
    },
  ],
  items: [
    { kind: 'typein', id: 'mod-t1', tags: ['battle-ropes'], prompt: 'Which battle rope diameter is best for strength/power/anaerobic work in bouts of 30 seconds or less?', accept: ['2 in', '2 inches', '2 in.'], hints: ['The thicker rope.', '_ in.'], explanation: '2-inch ropes suit strength/power/anaerobic work in short bouts.' },
    { kind: 'typein', id: 'mod-t2', tags: ['battle-ropes'], prompt: 'Which battle rope diameter suits longer, endurance-oriented work?', accept: ['1.5 in', '1.5 inches', '1.5 in.'], hints: ['The thinner rope.', '_._ in.'], explanation: '1.5-inch ropes suit longer, endurance-oriented work.' },
    { kind: 'typein', id: 'mod-t3', tags: ['modalities'], prompt: 'Which training tool is purpose-built for "loaded movement training"?', accept: ['vipr'], hints: ['A weighted cylindrical tube.', 'V___'], explanation: 'ViPR is purpose-built for loaded movement training.' },
    { kind: 'typein', id: 'mod-t4', tags: ['modalities'], prompt: 'Which modality allows movement to be as explosive as possible without needing eccentric deceleration?', accept: ['medicine ball'], hints: ['Thrown, not caught and controlled.', 'M_______ B___'], explanation: 'Medicine balls allow fully explosive movement since there\'s no need to decelerate them eccentrically.' },
    { kind: 'typein', id: 'mod-t5', tags: ['modalities'], prompt: 'What exercise/motion may cause inaccurate readings on a wrist-worn heart rate monitor?', accept: ['medicine ball catch and pass', 'rapid wrist motion', 'catching and passing a medicine ball'], hints: ['Involves rapid, repetitive wrist movement.', 'M_______ ball catch and pass'], explanation: 'Rapid, repetitive wrist motion like medicine ball catch-and-pass disrupts wrist-worn HR monitor accuracy.' },
    {
      kind: 'mcq', id: 'mod-m1', tags: ['modalities'], source: 'original',
      prompt: 'Which of the following modality/exercise combinations provides the most demand on explosive power?',
      options: ['Barbell squat', 'Sandbag step-up', 'Medicine ball chest pass', 'Suspended bodyweight push-up'],
      answer: 2,
      explanation: 'A medicine ball chest pass is thrown explosively with no eccentric deceleration required, maximizing explosive power demand.',
      whyWrong: ['A controlled barbell squat is a strength movement, not a maximally explosive throw.', 'A sandbag step-up is a strength/stability exercise, not primarily explosive.', '', 'A suspended push-up is a stability-challenge exercise, not primarily an explosive-power one.'],
    },
    {
      kind: 'mcq', id: 'mod-m2', tags: ['battle-ropes'], source: 'original',
      prompt: 'When using battle ropes for strength/power/anaerobic adaptations in sets of 30 seconds or less, what rope diameter is best?',
      options: ['0.5 in.', '1 in.', '1.5 in.', '2 in.'],
      answer: 3,
      explanation: 'The thicker 2-inch rope is heavier and better suited to short, high-intensity strength/power work.',
      whyWrong: ['This is far too thin for strength/power work.', 'This is thinner than recommended for short, high-intensity sets.', 'This thickness suits longer, endurance-oriented sets, not short strength/power sets.', ''],
    },
  ],
}
