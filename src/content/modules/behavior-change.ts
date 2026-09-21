import type { Module } from '../../types/content'

export const behaviorChange: Module = {
  id: 'd5-behavior-change',
  domainId: 'd5',
  title: 'Stages of Change & Communication',
  estMinutes: 25,
  lessons: [
    {
      id: 'bc-l1',
      title: 'The Transtheoretical Model (Stages of Change)',
      plain: `People don't just flip a switch from "couch potato" to "gym regular" — they move through predictable stages. Someone who's never thought about exercising is in a totally different headspace than someone who's already been going for 3 months. Your job as a trainer is to meet them exactly where they are, not where you wish they were.`,
      nasm: `The Transtheoretical Model of Behavior Change identifies five stages a client moves through when adopting a new behavior: Precontemplation, Contemplation, Preparation, Action, and Maintenance. Trainers should tailor communication strategies to the client's current stage to maximize adherence.`,
      memoryHook: `"Pre-Con-Prep-Act-Maintain" — say it like a chant. Each stage is defined by a timeframe: 6 months away, within 6 months, within 30 days, doing it <6 months, doing it >6 months.`,
      mustMemorise: [
        'Precontemplation = no intent to change in the next 6 months',
        'Contemplation = intends to change within 6 months',
        'Preparation = intends to act within 30 days, small steps possible',
        'Action = changed behavior for less than 6 months',
        'Maintenance = sustained behavior for more than 6 months',
      ],
    },
    {
      id: 'bc-l2',
      title: 'OARS: the toolkit of motivational interviewing',
      plain: `OARS is a simple toolkit for talking to clients in a way that gets them to convince *themselves* to change, instead of you lecturing them. Open-ended questions get people talking. Affirmations point out real strengths. Reflective listening shows you actually heard them. Summaries tie it all together.`,
      nasm: `OARS represents the four core communication techniques of Motivational Interviewing: Open-ended questions, Affirmations, Reflective listening, and Summaries. These techniques help elicit "change talk" from the client and build self-efficacy.`,
      mustMemorise: ['OARS = Open-ended questions, Affirmations, Reflective listening, Summaries'],
    },
  ],
  items: [
    {
      kind: 'typein', id: 'bc-t1', tags: ['behavior-change', 'stages'],
      prompt: 'Which stage of change involves no intention to change in the next 6 months?',
      accept: ['precontemplation'],
      hints: ['"Pre" means before even thinking about it.', 'P____________'],
      explanation: 'Precontemplation: the client has no intention of changing within 6 months.',
    },
    {
      kind: 'typein', id: 'bc-t2', tags: ['behavior-change', 'stages'],
      prompt: 'Which stage of change involves intending to act within 30 days?',
      accept: ['preparation'],
      hints: ['They are getting ready.', 'P___________'],
      explanation: 'Preparation: intends to take action within 30 days.',
    },
    {
      kind: 'typein', id: 'bc-t3', tags: ['behavior-change', 'stages'],
      prompt: 'Which stage of change means the client has sustained the new behavior for more than 6 months?',
      accept: ['maintenance'],
      hints: ['They are keeping it going.', 'M___________'],
      explanation: 'Maintenance: behavior sustained for more than 6 months.',
    },
    {
      kind: 'typein', id: 'bc-t4', tags: ['behavior-change', 'communication'],
      prompt: 'What does the "O" in OARS stand for?',
      accept: ['open-ended questions', 'open ended questions'],
      hints: ['Questions that can\'t be answered with yes/no.', 'O___ E_____ Q_________'],
      explanation: 'O = Open-ended questions.',
    },
    {
      kind: 'typein', id: 'bc-t5', tags: ['behavior-change', 'communication'],
      prompt: 'What does the "R" in OARS stand for?',
      accept: ['reflective listening'],
      hints: ['Mirroring back what the client said/felt.', 'R_________ L________'],
      explanation: 'R = Reflective listening.',
    },
    {
      kind: 'mcq', id: 'bc-m1', tags: ['behavior-change', 'stages'], source: 'original',
      prompt: 'A client says: "I bought running shoes last week and I\'m starting a couch-to-5K plan this Monday." What stage of change are they in?',
      options: ['Precontemplation', 'Contemplation', 'Preparation', 'Maintenance'],
      answer: 2,
      explanation: 'Buying equipment and planning to start within days/weeks is classic Preparation-stage behavior.',
      whyWrong: ['Precontemplation clients show no intent to change.', 'Contemplation clients are still weighing whether to change, not yet taking concrete steps.', '', 'Maintenance requires more than 6 months of sustained behavior.'],
    },
    {
      kind: 'match', id: 'bc-match1', tags: ['behavior-change', 'oars'],
      prompt: 'Match each OARS technique to its example.',
      pairs: [
        ['Open-ended question', '"What motivates you to keep coming back each week?"'],
        ['Affirmation', '"You showed real discipline sticking to your plan this week."'],
        ['Reflective listening', '"It sounds like you\'re proud of the progress, even if the scale hasn\'t moved."'],
        ['Summary', '"So this month you worked out 3x/week and improved your sleep — great progress."'],
      ],
      explanation: 'OARS = Open-ended questions, Affirmations, Reflective listening, Summaries.',
    },
  ],
}
