import type { Module } from '../../types/content'

export const business: Module = {
  id: 'd6-business',
  domainId: 'd6',
  title: 'Business Fundamentals',
  estMinutes: 25,
  lessons: [
    {
      id: 'biz-l1',
      title: 'Employee vs. independent contractor',
      plain: `This distinction shows up on the exam a lot. An **employee** has taxes withheld automatically by their employer and typically works a set schedule set by the employer. An **independent contractor** is responsible for handling and paying their own taxes, and generally has more control/flexibility over their own schedule. Neither role is inherently "better pay" — the key difference tested is tax handling and schedule control, not income level.`,
      nasm: `An employee has income taxes withheld automatically by the employer and generally works a schedule set by the employer. An independent contractor is responsible for paying their own self-employment taxes and typically has greater control over their own working hours and schedule. Pay rate itself is not a defining structural difference between the two classifications.`,
      mustMemorise: ['Independent contractor pays their own taxes; employee has taxes withheld by the employer'],
    },
    {
      id: 'biz-l2',
      title: 'Unique selling proposition and marketing',
      plain: `A **unique selling proposition (USP)** is what makes a trainer's services stand out from every other trainer offering similar services — the specific angle, expertise, or approach that differentiates them in a crowded market. Building extra income often means leveraging skills a trainer already has from a previous career (e.g. a former copywriter marketing fitness content/blogs, rather than starting from zero in an unrelated field).`,
      nasm: `A unique selling proposition (USP) differentiates a fitness professional's services from competitors in the marketplace. Trainers are encouraged to develop additional income streams by leveraging existing skills and prior professional experience, rather than pursuing entirely unrelated opportunities.`,
      mustMemorise: ['USP = what differentiates a trainer\'s services from competitors', 'Additional income streams should leverage the trainer\'s existing skills, not unrelated opportunities'],
    },
    {
      id: 'biz-l3',
      title: 'Client retention basics',
      plain: `Retaining clients long-term comes down to a few fundamentals: delivering real results, communicating well (see the D5 communication module), showing genuine care for the client as a person (not just a paying customer), and being a reliable, professional presence session after session. Business success as a trainer is built on retention as much as new client acquisition.`,
      nasm: `Client retention is driven by consistent results delivery, effective communication, genuine rapport, and professional reliability. Long-term business success depends on retention strategies as much as new client acquisition.`,
      mustMemorise: [],
    },
  ],
  items: [
    { kind: 'typein', id: 'biz-t1', tags: ['employment'], prompt: 'Who is responsible for paying their own taxes: an employee or an independent contractor?', accept: ['independent contractor'], hints: ['Not the one with taxes withheld automatically.', 'I___________ C__________'], explanation: 'An independent contractor is responsible for paying their own taxes.' },
    { kind: 'typein', id: 'biz-t2', tags: ['marketing'], prompt: 'What abbreviation describes what makes a trainer\'s services stand out from competitors?', accept: ['usp', 'unique selling proposition'], hints: ['3 letters.', 'U__'], explanation: 'USP = unique selling proposition.' },
    { kind: 'typein', id: 'biz-t3', tags: ['income'], prompt: 'When looking for additional income streams, what should a trainer prioritize leveraging?', accept: ['their existing skills', 'existing skills', 'skills they already have'], hints: ['Not something totally unrelated.', 'E________ skills'], explanation: 'Trainers should leverage existing skills/experience for additional income streams.' },
    {
      kind: 'mcq', id: 'biz-m1', tags: ['employment'], source: 'original',
      prompt: 'Which of the following indicates a primary difference between working as an independent contractor and working as an employee?',
      options: [
        'An employee can earn more per hour than an independent contractor.',
        'An independent contractor is responsible for paying their own taxes, while an employee has taxes withheld by the employer.',
        'An employee can establish their own hours, while an independent contractor must adhere to a set schedule.',
        'An independent contractor can expect client referrals from a facility, while an employee finds clients on the gym floor.',
      ],
      answer: 1,
      explanation: 'A defining tax distinction: independent contractors handle their own tax withholding, employees have taxes withheld automatically.',
      whyWrong: ['Pay rate is not a defining structural difference between the two classifications.', '', 'This is backwards — independent contractors typically have more schedule flexibility.', 'This is backwards from the typical referral/prospecting dynamic between the two roles.'],
    },
    {
      kind: 'mcq', id: 'biz-m2', tags: ['income'], source: 'original',
      prompt: 'Kim was previously a copywriter and is now an NASM CPT. What is the best way for her to increase her earning potential?',
      options: [
        'Become a college football conditioning coach',
        'Market her writing services to create blogs/social content for her studio and other trainers',
        'Become an NASM Master Instructor',
        'Take an unrelated part-time retail job',
      ],
      answer: 1,
      explanation: 'This directly leverages her existing copywriting skill set alongside her fitness credential.',
      whyWrong: ['This does not leverage her copywriting background and is a large career shift.', '', 'Becoming a Master Instructor is a significant separate undertaking, unrelated to her writing skill.', 'An unrelated job does not leverage her specific professional skill set.'],
    },
  ],
}
