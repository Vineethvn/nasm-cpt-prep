export type Stage = 'Precontemplation' | 'Contemplation' | 'Preparation' | 'Action' | 'Maintenance'

export const STAGES: { stage: Stage; definition: string }[] = [
  { stage: 'Precontemplation', definition: 'No intention of changing behavior in the next 6 months' },
  { stage: 'Contemplation', definition: 'Intends to change within the next 6 months' },
  { stage: 'Preparation', definition: 'Intends to act within 30 days; may be taking small steps already' },
  { stage: 'Action', definition: 'Has changed behavior within the last 6 months' },
  { stage: 'Maintenance', definition: 'Has sustained the behavior change for more than 6 months' },
]

export type StageScenario = {
  id: string
  quote: string
  correctStage: Stage
  responseOptions: string[]
  bestResponseIndex: number
}

export const STAGE_SCENARIOS: StageScenario[] = [
  {
    id: 'soc-1',
    quote: '"I don\'t really see why I need a trainer, my weight is fine the way it is."',
    correctStage: 'Precontemplation',
    responseOptions: [
      'Push a specific 12-week program on them right away',
      'Build rapport and gently raise awareness of the benefits of exercise, without pressuring them to commit',
      'Ask them to sign up for sessions today',
      'Give them a detailed macro-tracking plan',
    ],
    bestResponseIndex: 1,
  },
  {
    id: 'soc-2',
    quote: '"I know I should probably start working out, I\'ve been thinking about it for months but just haven\'t done it."',
    correctStage: 'Contemplation',
    responseOptions: [
      'Tell them it is now or never',
      'Help them weigh the pros and cons and address their specific barriers to starting',
      'Assume they are ready and book a 5-day-a-week program',
      'Ignore the comment and move to assessments',
    ],
    bestResponseIndex: 1,
  },
  {
    id: 'soc-3',
    quote: '"I bought some workout clothes and I\'m planning to start next Monday."',
    correctStage: 'Preparation',
    responseOptions: [
      'Discourage them since they haven\'t started yet',
      'Help them set a concrete, specific SMART goal and plan for Monday',
      'Tell them to wait until they feel fully ready',
      'Give a lecture on the risks of not exercising',
    ],
    bestResponseIndex: 1,
  },
  {
    id: 'soc-4',
    quote: '"I\'ve been coming to the gym 3 times a week for the last 2 months, I feel great!"',
    correctStage: 'Action',
    responseOptions: [
      'Assume they will stick with it forever without support',
      'Reinforce their progress, help problem-solve barriers, and build confidence to prevent relapse',
      'Increase the difficulty drastically without warning',
      'Stop checking in since they are already exercising',
    ],
    bestResponseIndex: 1,
  },
  {
    id: 'soc-5',
    quote: '"I\'ve kept up this routine for over a year now, it\'s just part of my life."',
    correctStage: 'Maintenance',
    responseOptions: [
      'Assume no further support is needed and disengage',
      'Help them maintain motivation, avoid boredom, and plan for potential lapses or plateaus',
      'Start over from an assessment as if they were a beginner',
      'Warn them exercise is no longer needed',
    ],
    bestResponseIndex: 1,
  },
]
