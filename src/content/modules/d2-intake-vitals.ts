import type { Module } from '../../types/content'

export const intakeVitals: Module = {
  id: 'd2-intake-vitals',
  domainId: 'd2',
  title: 'Client Intake, Vitals & Body Composition',
  estMinutes: 40,
  lessons: [
    {
      id: 'iv-l1',
      title: 'Health screening before anything else',
      plain: `Before a single exercise, every client fills out a health-history questionnaire called the **PAR-Q+**. This flags red flags (heart conditions, joint issues, medications) that might need a doctor's sign-off before training begins. It's especially non-negotiable for older adults. Trainers also collect subjective info (what the client tells you — goals, lifestyle, pain) and objective info (measurable data — blood pressure, body fat %). Informed consent (a client acknowledging the risks of exercise and agreeing to participate) rounds out the intake process.`,
      nasm: `The Physical Activity Readiness Questionnaire Plus (PAR-Q+) is a standardized health-history screening tool used to identify individuals who should seek medical clearance before beginning an exercise program. Intake information is categorized as subjective (client-reported, e.g., goals, pain, lifestyle) or objective (measurable data, e.g., blood pressure, body composition). Older adults must complete the PAR-Q+ prior to initiating an exercise program with a Certified Personal Trainer. Informed consent documents that the client understands and accepts the risks associated with exercise participation.`,
      mustMemorise: ['PAR-Q+ must be completed before starting an exercise program, especially for older adults'],
    },
    {
      id: 'iv-l2',
      title: 'Resting vitals: heart rate and blood pressure',
      plain: `Resting heart rate is measured with the client calm and seated, not right after exercise. Blood pressure is measured with a cuff — you inflate it 20-30 mmHg above the point where you can no longer feel the pulse at the wrist, then slowly release while listening/feeling for the pulse to return. Blood pressure categories run from normal (below 120/80) up through 3 stages of elevated/high readings.`,
      nasm: `Resting heart rate should be measured with the client seated and relaxed, not following exercise. Blood pressure is measured using a sphygmomanometer, with the cuff inflated to 20–30 mmHg above the point at which the radial pulse is no longer palpable, then slowly deflated. Blood pressure categories: normal is systolic below 120 and diastolic below 80; elevated is systolic 120–129 with diastolic below 80; stage 1 hypertension is systolic 130–139 or diastolic 80–89; stage 2 hypertension is systolic 140 or higher or diastolic 90 or higher.`,
      table: {
        headers: ['Category', 'Systolic', 'Diastolic'],
        rows: [
          ['Normal', '< 120', '< 80'],
          ['Elevated', '120–129', '< 80'],
          ['Stage 1', '130–139', 'or 80–89'],
          ['Stage 2', '≥ 140', 'or ≥ 90'],
        ],
      },
      mustMemorise: [
        'BP cuff inflated 20–30 mmHg above the point the radial pulse disappears',
        'Normal BP: < 120 / < 80',
        'Stage 2 hypertension: ≥ 140 or ≥ 90',
      ],
    },
    {
      id: 'iv-l3',
      title: 'Body composition: skinfolds, BMI, and waist-to-hip ratio',
      plain: `Skinfold calipers pinch a fold of skin+fat at specific sites and measure thickness in millimeters. Take **at least 2 measurements per site**, and they must agree within 1-2mm before averaging — if they don't agree, take a third. Common protocols include Jackson-Pollock and the Durnin-Womersley 4-site method. **BMI** (body mass index) is a quick, rough screen: 18.5-24.9 is "normal," 25-29.9 is "overweight," 30+ is "obese" — but BMI doesn't distinguish muscle from fat, so it can mislabel a muscular athlete as "overweight." **Waist-to-hip ratio (WHR)** flags cardiovascular risk based on where fat is carried: above 0.80 for women or 0.95 for men is considered high risk.`,
      nasm: `Skinfold measurements should be taken a minimum of two times at each site, with each measurement required to fall within 1–2 mm of the other before averaging (a third measurement is taken if they disagree beyond that range). Common protocols include the 3-site and 7-site Jackson-Pollock methods and the Durnin-Womersley 4-site method. Body mass index (BMI) categories: normal weight 18.5–24.9, overweight 25–29.9, obese ≥30. BMI does not distinguish lean mass from fat mass. Waist-to-hip ratio (WHR) values above 0.80 in women or 0.95 in men are classified as high risk for cardiovascular disease.`,
      mustMemorise: [
        'Take ≥2 skinfold measurements per site, within 1–2 mm of each other',
        'BMI normal 18.5–24.9, overweight 25–29.9, obese ≥ 30',
        'WHR high risk: > 0.80 women, > 0.95 men',
      ],
    },
  ],
  items: [
    { kind: 'typein', id: 'iv-t1', tags: ['intake'], prompt: 'What health-screening questionnaire must be completed before starting an exercise program?', accept: ['par-q+', 'parq+', 'par-q plus'], hints: ['Has a "+" in the name.', 'PAR-Q_'], explanation: 'The PAR-Q+ health-screening questionnaire must be completed before starting exercise.' },
    { kind: 'typein', id: 'iv-t2', tags: ['vitals'], prompt: 'How far above the point the radial pulse disappears is a blood pressure cuff inflated?', accept: ['20-30 mmhg', '20 to 30 mmhg', '20-30'], hints: ['A range in mmHg.', '__-__ mmHg'], explanation: 'The cuff is inflated 20–30 mmHg above the point the radial pulse disappears.' },
    { kind: 'typein', id: 'iv-t3', tags: ['vitals'], prompt: 'What is the systolic/diastolic cutoff for "normal" blood pressure?', accept: ['below 120/80', '<120/80', 'under 120 over 80'], hints: ['Both numbers under a threshold.', '< ___/__'], explanation: 'Normal BP is systolic below 120 and diastolic below 80.' },
    { kind: 'typein', id: 'iv-t4', tags: ['body-composition'], prompt: 'How many skinfold measurements should be taken at minimum per site?', accept: ['2', 'two'], hints: ['A single digit.', '_'], explanation: 'A minimum of 2 measurements should be taken per site.' },
    { kind: 'typein', id: 'iv-t5', tags: ['body-composition'], prompt: 'Skinfold measurements at a site must agree within how many mm before averaging?', accept: ['1-2mm', '1 to 2 mm', '1-2 mm'], hints: ['A small range.', '_-_ mm'], explanation: 'Skinfold measurements must agree within 1–2 mm before averaging.' },
    { kind: 'typein', id: 'iv-t6', tags: ['body-composition'], prompt: 'BMI range considered "overweight"?', accept: ['25-29.9', '25 to 29.9'], hints: ['Just above "normal."', '__-__.9'], explanation: 'BMI 25–29.9 is classified as overweight.' },
    { kind: 'typein', id: 'iv-t7', tags: ['body-composition'], prompt: 'BMI threshold considered "obese"?', accept: ['30', '>=30', '30 or above'], hints: ['A round number.', '__'], explanation: 'BMI of 30 or above is classified as obese.' },
    { kind: 'typein', id: 'iv-t8', tags: ['body-composition'], prompt: 'WHR threshold considered high-risk for women?', accept: ['0.80', '>0.80', 'above 0.80'], hints: ['A decimal.', '0.__'], explanation: 'WHR above 0.80 is high risk for women.' },
    { kind: 'typein', id: 'iv-t9', tags: ['body-composition'], prompt: 'WHR threshold considered high-risk for men?', accept: ['0.95', '>0.95', 'above 0.95'], hints: ['Higher than the female threshold.', '0.__'], explanation: 'WHR above 0.95 is high risk for men.' },
    {
      kind: 'mcq', id: 'iv-m1', tags: ['body-composition'], source: 'original',
      prompt: 'A muscular athlete has a BMI of 27, which technically falls in the "overweight" category. What is the main limitation of BMI being demonstrated here?',
      options: [
        'BMI does not account for height.',
        'BMI does not distinguish lean muscle mass from fat mass.',
        'BMI is only accurate for older adults.',
        'BMI cannot be calculated for athletes.',
      ],
      answer: 1,
      explanation: 'BMI is based only on height and weight, so it can\'t tell the difference between a heavy, muscular athlete and someone with excess body fat.',
      whyWrong: ['BMI does account for height — that is part of its calculation.', '', 'BMI applies to all adults, this is not an age-specific limitation.', 'BMI can be calculated for anyone; the issue is interpretation, not calculation.'],
    },
    {
      kind: 'mcq', id: 'iv-m2', tags: ['vitals'], source: 'original',
      prompt: 'A client has a resting blood pressure of 135/85. What category does this fall into?',
      options: ['Normal', 'Elevated', 'Stage 1 hypertension', 'Stage 2 hypertension'],
      answer: 2,
      explanation: 'Systolic 130–139 or diastolic 80–89 falls into Stage 1 hypertension; 135 systolic qualifies here.',
      whyWrong: ['Normal requires both numbers below 120/80.', 'Elevated requires systolic 120–129 with diastolic below 80 — this reading is higher.', '', 'Stage 2 requires systolic ≥140 or diastolic ≥90 — this reading is lower.'],
    },
  ],
}
