export type CommCategory =
  | 'Open-ended question'
  | 'Closed question'
  | 'Affirmation'
  | 'Reflective listening'
  | 'Summary'

export const COMM_CATEGORIES: CommCategory[] = [
  'Open-ended question',
  'Closed question',
  'Affirmation',
  'Reflective listening',
  'Summary',
]

export type CommLine = { id: string; line: string; category: CommCategory }

export const COMM_LINES: CommLine[] = [
  { id: 'c1', line: '"What made you decide to start working on your health now?"', category: 'Open-ended question' },
  { id: 'c2', line: '"Did you drink enough water today?"', category: 'Closed question' },
  { id: 'c3', line: '"You showed up even after a long work day — that says a lot about your commitment."', category: 'Affirmation' },
  { id: 'c4', line: '"It sounds like you\'re frustrated that the scale hasn\'t moved, even though your clothes fit better."', category: 'Reflective listening' },
  { id: 'c5', line: '"So this week you hit two workouts, tried meal prepping, and slept better — that\'s real progress across the board."', category: 'Summary' },
  { id: 'c6', line: '"How do you feel about the progress you\'ve made so far?"', category: 'Open-ended question' },
  { id: 'c7', line: '"Are you ready to schedule next week\'s sessions?"', category: 'Closed question' },
  { id: 'c8', line: '"You\'ve stuck with this plan for six weeks straight — that takes real discipline."', category: 'Affirmation' },
  { id: 'c9', line: '"It seems like missing that workout is bothering you more than you expected."', category: 'Reflective listening' },
  { id: 'c10', line: '"What\'s the hardest part about finding time to exercise?"', category: 'Open-ended question' },
]
