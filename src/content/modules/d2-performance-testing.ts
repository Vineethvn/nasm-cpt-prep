import type { Module } from '../../types/content'

export const performanceTesting: Module = {
  id: 'd2-performance-testing',
  domainId: 'd2',
  title: 'Performance Testing & Assessment Sequencing',
  estMinutes: 30,
  lessons: [
    {
      id: 'pt-l1',
      title: 'Cardio fitness tests: picking the right one',
      plain: `Different cardio tests fit different clients. The **YMCA 3-minute step test** and **Rockport 1-mile walk test** are lower-intensity, sub-maximal tests good for general or deconditioned populations. The **1.5-mile (2.4km) run test** is much more demanding — appropriate for already-fit, athletic clients (like a college athlete), not beginners. The **talk test** is a simple, subjective intensity check (can they hold a conversation?) rather than a fitness-level measurement tool.`,
      nasm: `The YMCA 3-minute step test and Rockport 1-mile walk test are sub-maximal cardiorespiratory assessments appropriate for general or lower-fitness populations. The 1.5-mile (2.4 km) run test is a higher-intensity assessment better suited to already-fit, athletic clients. The talk test is a subjective method of gauging exercise intensity based on the ability to hold a conversation, not a standalone fitness-level assessment.`,
      mustMemorise: ['YMCA step test and Rockport walk test = sub-maximal, general population', '1.5-mile run test = for already-fit, athletic clients'],
    },
    {
      id: 'pt-l2',
      title: 'Performance tests: push-up, Davies, shark skill',
      plain: `The **push-up test** is timed at 60 seconds and counts max reps with good form. The **Davies test** measures upper-body agility/stability — the client touches tape marks 36 inches apart as fast as possible in 15 seconds. The **shark skill test** measures lower-body agility/coordination on a grid, with a small time penalty (0.10 sec) for stepping on lines. These, along with vertical jump, 40-yard dash, and pro shuttle, are performance-level assessments — meaning they're physically demanding and always come last in the assessment sequence, after intake, vitals, and movement screens.`,
      nasm: `The push-up test is administered over 60 seconds, counting the maximum number of repetitions performed with proper form. The Davies test assesses upper-extremity plyometric stability using markers placed 36 inches apart, performed over a 15-second interval. The shark skill test assesses lower-body agility and coordination, applying a 0.10-second time penalty for each line touched. Performance assessments, being the most physically demanding, are administered last in the overall assessment sequence.`,
      mustMemorise: [
        'Push-up test: 60 seconds, max reps',
        'Davies test: markers 36 in. apart, 15 seconds',
        'Shark skill test: 0.10 sec penalty per line touch',
        'Performance assessments are always performed last in the assessment sequence',
      ],
    },
    {
      id: 'pt-l3',
      title: 'Sequencing the full assessment',
      plain: `Order matters. General flow: health history/intake first, then resting vitals (heart rate, blood pressure — measured at rest, not after exercise), then body composition, then static posture, then movement assessments (like the overhead squat), and performance assessments (the most demanding) come last. One exception: flexibility is actually better measured after some activity/warm-up rather than cold, since muscles are more pliable once warmed up.`,
      nasm: `The standard assessment sequence progresses from health-history intake, to resting vitals, to body composition, to static posture, to movement assessments, and finally to performance assessments (the most physically demanding, performed last). Flexibility assessments are an exception to a strictly "before activity" sequence, as tissue pliability improves following a brief warm-up, producing more representative results.`,
      mustMemorise: ['Assessment order: intake → vitals → body composition → posture → movement → performance (last)', 'Flexibility assessments are better measured after some activity, not cold'],
    },
  ],
  items: [
    { kind: 'typein', id: 'pt-t1', tags: ['cardio-tests'], prompt: 'Which cardio test is most appropriate for an already-fit, athletic client (e.g. a college athlete)?', accept: ['1.5-mile run test', '1.5 mile run test', '1.5-mile run', 'the 1.5-mile run test'], hints: ['A timed distance run.', '_._-mile run test'], explanation: 'The 1.5-mile run test suits already-fit, athletic populations.' },
    { kind: 'typein', id: 'pt-t2', tags: ['cardio-tests'], prompt: 'Which two cardio tests are sub-maximal and better suited to general/deconditioned populations?', accept: ['ymca step test and rockport walk test', 'ymca 3-minute step test and rockport 1-mile walk test'], hints: ['One is a step test, one is a walk test.', 'YMCA ____ test, R_______ ____ test'], explanation: 'The YMCA 3-minute step test and Rockport 1-mile walk test are sub-maximal, general-population tests.' },
    { kind: 'typein', id: 'pt-t3', tags: ['performance-tests'], prompt: 'How long is the push-up test?', accept: ['60 seconds', '60 sec', '1 minute'], hints: ['One minute.', '__ seconds'], explanation: 'The push-up test is timed at 60 seconds.' },
    { kind: 'typein', id: 'pt-t4', tags: ['performance-tests'], prompt: 'How far apart are the markers in the Davies test?', accept: ['36 inches', '36 in', '36 in.'], hints: ['A distance in inches.', '__ inches'], explanation: 'The Davies test uses markers 36 inches apart.' },
    { kind: 'typein', id: 'pt-t5', tags: ['performance-tests'], prompt: 'What time penalty is applied per line touched in the shark skill test?', accept: ['0.10 seconds', '0.10 sec', '0.1 seconds'], hints: ['A tenth of a second.', '0.__ sec'], explanation: 'The shark skill test applies a 0.10-second penalty per line touched.' },
    { kind: 'typein', id: 'pt-t6', tags: ['sequencing'], prompt: 'Which type of assessment should always be performed last in the overall sequence?', accept: ['performance assessments', 'performance'], hints: ['The most physically demanding.', 'P___________ assessments'], explanation: 'Performance assessments, being most demanding, are performed last.' },
    { kind: 'typein', id: 'pt-t7', tags: ['sequencing'], prompt: 'Which assessment type is better measured after some activity rather than cold?', accept: ['flexibility'], hints: ['Muscles are more pliable warmed up.', 'F___________'], explanation: 'Flexibility is better assessed after some activity, since tissue is more pliable.' },
    {
      kind: 'mcq', id: 'pt-m1', tags: ['sequencing'], source: 'original',
      prompt: 'Which of the following would produce a better result if measured immediately after some activity rather than before?',
      options: ['Resting heart rate', 'Blood pressure', 'Body composition', 'Flexibility'],
      answer: 3,
      explanation: 'Flexibility assessments are more accurate and representative when muscles are warmed up, unlike resting-state measurements.',
      whyWrong: ['Resting heart rate must be measured at rest, by definition.', 'Blood pressure should be measured at rest for a baseline reading.', 'Body composition should be measured under consistent, resting conditions.', ''],
    },
    {
      kind: 'mcq', id: 'pt-m2', tags: ['performance-tests'], source: 'original',
      prompt: 'A trainer wants to measure the overall fitness of a fit, college-aged rugby athlete. Which test is most appropriate?',
      options: ['YMCA 3-minute step test', 'The talk test', 'Rockport 1-mile walk test', '1.5-mile (2.4 km) run test'],
      answer: 3,
      explanation: 'The 1.5-mile run test is a higher-intensity assessment appropriate for an already-fit, competitive athlete.',
      whyWrong: ['The YMCA step test is sub-maximal, better suited to general/deconditioned populations.', 'The talk test is a subjective intensity check, not a standalone fitness measurement.', 'The Rockport walk test is designed for lower-fitness populations, not competitive athletes.', ''],
    },
  ],
}
