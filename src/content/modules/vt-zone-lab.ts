import type { Module } from '../../types/content'

export const vtZoneLab: Module = {
  id: 'd3-cardio-programming',
  domainId: 'd3',
  title: 'VT & Zone Lab: Cardiorespiratory Training',
  estMinutes: 30,
  lessons: [
    {
      id: 'vt-l1',
      title: 'Finding max heart rate',
      plain: `The quick-and-dirty way to estimate someone's max heart rate is "220 minus their age." A 40-year-old's estimated max is 180 bpm. It's not perfect, but it's the number NASM wants you to know cold.`,
      nasm: `Maximum heart rate (HRmax) is commonly estimated using the age-predicted formula: 220 − age. An alternative formula, 208 − (0.7 × age), may provide a more accurate estimate for some populations.`,
      mustMemorise: ['HRmax = 220 − age', 'Alternate: HRmax = 208 − (0.7 × age)'],
    },
    {
      id: 'vt-l2',
      title: 'Karvonen formula: using resting heart rate too',
      plain: `Straight percentage of max heart rate ignores how fit someone already is. The Karvonen formula fixes that by first finding "heart rate reserve" (max minus resting), taking a percentage of THAT, then adding resting heart rate back. It personalizes the target to the individual, not just their age.`,
      nasm: `The Karvonen formula calculates target heart rate using heart rate reserve (HRR): Target HR = ((HRmax − HRrest) × intensity%) + HRrest. This method accounts for individual differences in resting heart rate and cardiorespiratory fitness.`,
      mustMemorise: ['Karvonen: Target HR = ((HRmax − HRrest) × %) + HRrest'],
    },
    {
      id: 'vt-l3',
      title: 'The three training zones',
      plain: `Zone 1 is easy — you can hold a full conversation, this is where fat burns best and where beginners live. Zone 2 is the gray zone where talking gets hard; it sits between two invisible thresholds called VT1 and VT2. Zone 3 is hard effort where you can't talk at all, mostly fueled by carbs.`,
      nasm: `Zone 1 training occurs below the first ventilatory threshold (VT1) at approximately 65–75% HRmax, with the talk test indicating comfortable conversation. Zone 2 occurs between VT1 and VT2 (76–85% HRmax), where conversation becomes difficult. Zone 3 occurs above VT2 (86–95% HRmax), where talking is not possible.`,
      table: {
        headers: ['Zone', '% HRmax', 'Talk test', 'Fuel'],
        rows: [
          ['1', '65–75%', 'Comfortable conversation', 'Mostly fat'],
          ['2', '76–85%', 'Difficult to talk', 'Mixed fat + carb'],
          ['3', '86–95%', 'Cannot talk', 'Mostly carbohydrate'],
        ],
      },
      mustMemorise: [
        'Zone 1 = 65–75% HRmax, below VT1',
        'Zone 2 = 76–85% HRmax, VT1 to VT2',
        'Zone 3 = 86–95% HRmax, above VT2',
      ],
    },
    {
      id: 'vt-l4',
      title: 'VT2 and the three training stages',
      plain: `VT2 is the hardest pace someone can hold for a real amount of time without completely blowing up — think of it as "comfortably hard becomes just hard." NASM also groups clients into 3 stages: Stage I clients only do Zone 1 until they can sustain it for 30 minutes, 3 times a week. Stage II adds Zone 2 intervals. Stage III (advanced clients) uses all three zones.`,
      nasm: `The second ventilatory threshold (VT2) represents the highest exercise intensity that can be sustained aerobically for more than a few minutes before a rapid shift toward anaerobic metabolism. Training is organized into three stages: Stage I (Zone 1 only, progressing to Stage II once 30 minutes can be sustained 3x/week), Stage II (Zone 1–2 interval training), and Stage III (Zone 1–3, for advanced clients).`,
      mustMemorise: [
        'VT2 = highest sustainable steady-state intensity for more than a few minutes',
        'Stage I = Zone 1 only; progress once 30 min sustained, 3x/week',
        'Stage II = Zones 1–2 intervals',
        'Stage III = Zones 1–3 (advanced)',
      ],
    },
  ],
  items: [
    {
      kind: 'typein', id: 'vt-t1', tags: ['cardio', 'hrmax'],
      prompt: 'Formula for estimated maximum heart rate (the classic one)?',
      accept: ['220-age', '220 minus age', '220 - age'],
      hints: ['One number minus their age.', '2__ − age'],
      explanation: 'HRmax = 220 − age.',
    },
    {
      kind: 'typein', id: 'vt-t2', tags: ['cardio', 'karvonen'],
      prompt: 'What is the name of the formula that uses heart rate reserve (HRmax − HRrest) to set a target heart rate?',
      accept: ['karvonen', 'karvonen formula'],
      hints: ['Named after its creator.', 'K_______'],
      explanation: 'The Karvonen formula: Target HR = ((HRmax − HRrest) × %) + HRrest.',
    },
    {
      kind: 'typein', id: 'vt-t3', tags: ['cardio', 'zones'],
      prompt: '% HRmax range for Zone 1?',
      accept: ['65-75%', '65-75 percent', '65 to 75%'],
      hints: ['The easiest, most conversational zone.', '__-__%'],
      explanation: 'Zone 1 = 65–75% HRmax.',
    },
    {
      kind: 'typein', id: 'vt-t4', tags: ['cardio', 'zones'],
      prompt: '% HRmax range for Zone 3?',
      accept: ['86-95%', '86-95 percent', '86 to 95%'],
      hints: ['The hardest zone, cannot talk.', '__-__%'],
      explanation: 'Zone 3 = 86–95% HRmax.',
    },
    {
      kind: 'typein', id: 'vt-t5', tags: ['cardio', 'stages'],
      prompt: 'Which training stage uses Zone 1 only?',
      accept: ['stage 1', 'stage i'],
      hints: ['The beginner stage.', 'Stage _'],
      explanation: 'Stage I uses Zone 1 only, until 30 minutes can be sustained 3x/week.',
    },
    {
      kind: 'mcq', id: 'vt-m1', tags: ['cardio', 'karvonen'], source: 'original',
      prompt: 'A 35-year-old client has a resting HR of 60 bpm. Using Karvonen at 70% intensity, what is the target heart rate? (HRmax = 220 − age)',
      options: ['148 bpm', '130 bpm', '185 bpm', '166 bpm'],
      answer: 0,
      explanation: 'HRmax = 220−35 = 185. HRR = 185−60 = 125. 125×0.70 = 87.5 ≈ 88. Target = 88+60 = 148 bpm.',
      whyWrong: ['', 'This is straight 70% of HRmax (185×0.7≈130), which ignores resting heart rate — not the Karvonen method.', 'This is HRmax itself, not a 70% target.', 'This overshoots the correct Karvonen target.'],
    },
    {
      kind: 'mcq', id: 'vt-m2', tags: ['cardio', 'zones'], source: 'original',
      prompt: 'A client says talking has become difficult but they are not gasping for air. Which zone are they most likely in?',
      options: ['Zone 1', 'Zone 2', 'Zone 3', 'They are resting'],
      answer: 1,
      explanation: 'Difficulty talking (but not complete inability) is the hallmark talk-test description of Zone 2, between VT1 and VT2.',
      whyWrong: ['Zone 1 allows comfortable conversation.', '', 'Zone 3 means the client cannot talk at all.', 'This describes active cardio effort, not rest.'],
    },
  ],
}
