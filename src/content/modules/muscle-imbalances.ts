import type { Module } from '../../types/content'
import { COMPENSATIONS } from '../trainers/muscleImbalanceData'

export const muscleImbalances: Module = {
  id: 'd2-posture-movement',
  domainId: 'd2',
  title: 'Muscle Imbalances & Overhead Squat Assessment',
  estMinutes: 35,
  lessons: [
    {
      id: 'mi-l1',
      title: 'The one rule that explains every compensation',
      plain: `Here's the trick: **the side a joint collapses or moves toward is tight (overactive)**. **The opposite side, the one that should have stopped that movement, is weak (underactive).** Knees cave inward? The inside of the thigh (adductors) is tight, and the outside hip muscle (glute medius) that should hold the knee out is weak. Learn this one rule and you can reason out almost every compensation instead of memorizing 9 separate lists.`,
      nasm: `Altered reciprocal inhibition occurs when an overactive/shortened muscle causes decreased neural drive to its functional antagonist. Relative to the overhead squat assessment, the direction of a compensation typically identifies overactive (tight) musculature on the side toward which the segment deviates, and underactive (weak, inhibited) musculature on the opposing side.`,
      memoryHook: `"Where it goes, it's tight. The other side is weak."`,
      mustMemorise: ['Direction of compensation = overactive side. Opposite = underactive side.'],
    },
    {
      id: 'mi-l2',
      title: 'Why this happens: altered reciprocal inhibition',
      plain: `Muscles work in pairs — when one contracts, its opposite (antagonist) is supposed to relax a little to let the movement happen. If one muscle stays chronically tight (say, from sitting all day), it keeps telling its opposite muscle to "stay quiet," even during exercise. Over time the opposite muscle gets weaker just from disuse. This is called altered reciprocal inhibition, and it's the real mechanism behind every overactive/underactive pair.`,
      nasm: `Reciprocal inhibition is the simultaneous contraction of one muscle and relaxation of its functional antagonist to allow movement. Altered reciprocal inhibition occurs when a tight agonist decreases the neural drive of its antagonist, and synergistic dominance occurs when a synergist compensates for the weakened antagonist, further reinforcing the faulty movement pattern.`,
      mustMemorise: [
        'Altered reciprocal inhibition: a tight muscle decreases neural drive to its opposite (antagonist) muscle',
        'Synergistic dominance: a helper muscle takes over for a weak prime mover',
      ],
    },
    {
      id: 'mi-l3',
      title: 'The overhead squat assessment itself',
      plain: `The trainer watches the client squat with arms overhead from three angles (front, side, back) and looks for specific breakdowns: feet turning out or flattening, knees caving in, leaning too far forward, the low back arching or rounding, arms falling forward, shoulders creeping up, or the head jutting forward. Each one has a predictable overactive/underactive pair behind it.`,
      nasm: `The overhead squat assessment (OHSA) is a dynamic assessment used to identify muscle imbalances and movement dysfunction throughout the kinetic chain. The client is observed from the anterior, lateral, and posterior views while performing repeated squats with the arms overhead, and specific compensations are noted at the feet, knees, LPHC (lumbo-pelvic-hip complex), shoulders, and head.`,
      mustMemorise: ['OHSA is viewed from anterior, lateral, and posterior views'],
    },
  ],
  items: [
    ...COMPENSATIONS.map((c, i) => ({
      kind: 'multi-typein' as const,
      id: `mi-mt-${i}-over`,
      tags: ['muscle-imbalance', 'overactive'],
      prompt: `Overhead squat: "${c.compensation}." Name the OVERACTIVE (tight) muscles.`,
      expected: c.overactive.map((m) => ({ canonical: m, accept: [m] })),
      minToPass: Math.max(1, c.overactive.length - 1),
      explanation: `Overactive: ${c.overactive.join(', ')}. ${c.logic}`,
    })),
    ...COMPENSATIONS.map((c, i) => ({
      kind: 'multi-typein' as const,
      id: `mi-mt-${i}-under`,
      tags: ['muscle-imbalance', 'underactive'],
      prompt: `Overhead squat: "${c.compensation}." Name the UNDERACTIVE (weak) muscles.`,
      expected: c.underactive.map((m) => ({ canonical: m, accept: [m] })),
      minToPass: Math.max(1, c.underactive.length - 1),
      explanation: `Underactive: ${c.underactive.join(', ')}. ${c.logic}`,
    })),
    {
      kind: 'mcq', id: 'mi-m1', tags: ['muscle-imbalance'], source: 'original',
      prompt: 'During the overhead squat assessment, a client\'s knees consistently move inward. Which muscle is most likely underactive?',
      options: ['Gluteus medius', 'Adductor longus', 'Tensor fascia latae', 'Vastus lateralis'],
      answer: 0,
      explanation: 'Gluteus medius abducts and externally rotates the hip, resisting knee valgus. When it is weak, the knees cave inward.',
      whyWrong: ['', 'Adductor longus is typically overactive in this compensation, not underactive.', 'TFL is typically overactive, contributing to the inward pull.', 'Vastus lateralis is typically overactive in this pattern.'],
    },
    {
      kind: 'mcq', id: 'mi-m2', tags: ['muscle-imbalance'], source: 'original',
      prompt: 'A client\'s arms fall forward during the overhead squat. Which pair of muscles is most likely tight (overactive)?',
      options: ['Mid trapezius and rhomboids', 'Latissimus dorsi and pectoralis major', 'Gluteus maximus and hamstrings', 'Anterior tibialis and posterior tibialis'],
      answer: 1,
      explanation: 'Tight lats and pec major pull the shoulders into internal rotation and the arms forward, out of an overhead position.',
      whyWrong: ['Mid trapezius and rhomboids are the underactive muscles in this compensation, not the overactive ones.', '', 'These are lower-body muscles unrelated to arm position.', 'These are foot/ankle muscles unrelated to arm position.'],
    },
    {
      kind: 'typein', id: 'mi-t1', tags: ['muscle-imbalance', 'mechanism'],
      prompt: 'What is the term for a tight muscle decreasing neural drive to its opposite muscle?',
      accept: ['altered reciprocal inhibition'],
      hints: ['It is a variation of "reciprocal inhibition."', 'A_______ R__________ I________'],
      explanation: 'Altered reciprocal inhibition: a chronically tight muscle suppresses activation of its functional antagonist.',
    },
    {
      kind: 'typein', id: 'mi-t2', tags: ['muscle-imbalance', 'mechanism'],
      prompt: 'What is it called when a synergist muscle takes over for a weak prime mover?',
      accept: ['synergistic dominance'],
      hints: ['"Synergist" + a word meaning "taking charge."', 'S__________ D_________'],
      explanation: 'Synergistic dominance occurs when a synergist compensates for an inhibited prime mover.',
    },
  ],
}
