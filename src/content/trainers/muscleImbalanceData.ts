// Overhead-squat assessment compensations, per NASM-Portal-SPEC.md §7 canonical table.

export type Compensation = {
  id: string
  compensation: string
  view: 'anterior' | 'lateral' | 'posterior'
  overactive: string[]
  underactive: string[]
  logic: string
}

export const COMPENSATIONS: Compensation[] = [
  {
    id: 'feet-turn-out',
    compensation: 'Feet turn out',
    view: 'anterior',
    overactive: ['Soleus', 'Lateral gastrocnemius', 'Biceps femoris (short head)'],
    underactive: ['Medial gastrocnemius', 'Medial hamstrings', 'Gracilis', 'Sartorius', 'Popliteus'],
    logic: 'The lateral (outside) structures pull the foot into external rotation because they are tight/overactive; the medial (inside) structures that would resist this rotation are underactive and lengthened.',
  },
  {
    id: 'feet-flatten',
    compensation: 'Feet flatten (arch collapses)',
    view: 'anterior',
    overactive: ['Peroneals', 'Lateral gastrocnemius', 'Biceps femoris (short head)', 'Tensor fascia latae'],
    underactive: ['Anterior tibialis', 'Posterior tibialis', 'Gluteus medius', 'Gluteus maximus'],
    logic: 'Muscles that evert/pronate the foot are overactive and pull the arch down; the muscles that support the arch and control the hip above it (tibialis pair, glutes) are underactive.',
  },
  {
    id: 'knees-inward',
    compensation: 'Knees move inward (valgus)',
    view: 'anterior',
    overactive: ['Adductor complex', 'Biceps femoris (short head)', 'Tensor fascia latae', 'Vastus lateralis'],
    underactive: ['Gluteus medius', 'Gluteus maximus', 'Vastus medialis oblique (VMO)', 'Anterior tibialis', 'Posterior tibialis'],
    logic: 'The classic hip-stability breakdown: the hip abductor (glute medius) is too weak to keep the femur tracking straight, so the adductors and lateral thigh pull the knee inward unopposed.',
  },
  {
    id: 'forward-lean',
    compensation: 'Excessive forward lean',
    view: 'lateral',
    overactive: ['Soleus', 'Gastrocnemius', 'Hip flexor complex', 'Abdominal complex'],
    underactive: ['Anterior tibialis', 'Gluteus maximus', 'Erector spinae'],
    logic: 'Tight calves block ankle dorsiflexion, so the whole body tips forward at the hip to keep the squat balanced; tight hip flexors reinforce that forward tip while the glutes and low-back extensors that would keep the torso upright are underactive.',
  },
  {
    id: 'low-back-arches',
    compensation: 'Low back arches (excessive lumbar extension)',
    view: 'lateral',
    overactive: ['Hip flexor complex', 'Erector spinae', 'Latissimus dorsi'],
    underactive: ['Gluteus maximus', 'Hamstrings', 'Intrinsic core stabilizers'],
    logic: 'Tight hip flexors tilt the pelvis forward (anterior pelvic tilt), which arches the low back; the glutes/hamstrings that would hold the pelvis level, and the deep core that would resist the arch, are underactive.',
  },
  {
    id: 'low-back-rounds',
    compensation: 'Low back rounds (excessive lumbar flexion)',
    view: 'lateral',
    overactive: ['Hamstrings', 'Adductor magnus', 'Rectus abdominis', 'External obliques'],
    underactive: ['Gluteus maximus', 'Erector spinae', 'Hip flexor complex', 'Intrinsic core stabilizers'],
    logic: 'Tight hamstrings/adductor magnus tuck the pelvis under (posterior pelvic tilt), rounding the low back; overactive abdominals reinforce the flexed spine while the glutes and erector spinae are underactive.',
  },
  {
    id: 'arms-fall-forward',
    compensation: 'Arms fall forward',
    view: 'lateral',
    overactive: ['Latissimus dorsi', 'Pectoralis major', 'Pectoralis minor', 'Teres major', 'Coracobrachialis'],
    underactive: ['Mid trapezius', 'Lower trapezius', 'Rhomboids', 'Rotator cuff', 'Posterior deltoid'],
    logic: 'Tight chest/lat/internal-rotator muscles pull the arms and shoulders forward; the mid-back muscles that would hold the arms overhead and the shoulder blades back are underactive.',
  },
  {
    id: 'shoulders-elevate',
    compensation: 'Shoulders elevate (shrug up toward ears)',
    view: 'posterior',
    overactive: ['Upper trapezius', 'Levator scapulae', 'Sternocleidomastoid', 'Scalenes'],
    underactive: ['Mid trapezius', 'Lower trapezius', 'Serratus anterior'],
    logic: 'When the shoulder blade cannot rotate upward properly (weak mid/lower traps and serratus anterior), the neck muscles take over to help raise the arm, hiking the shoulders up.',
  },
  {
    id: 'head-forward',
    compensation: 'Head moves forward',
    view: 'lateral',
    overactive: ['Upper trapezius', 'Levator scapulae', 'Sternocleidomastoid', 'Scalenes'],
    underactive: ['Deep cervical flexors'],
    logic: 'The same tight neck/shoulder muscles that elevate the shoulders also pull the head forward, unopposed by the weak deep neck flexors that would hold the head stacked over the spine.',
  },
]
