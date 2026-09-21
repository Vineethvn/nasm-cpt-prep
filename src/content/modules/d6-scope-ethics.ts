import type { Module } from '../../types/content'

export const scopeEthics: Module = {
  id: 'd6-scope-ethics',
  domainId: 'd6',
  title: 'Scope of Practice & Professional Ethics',
  estMinutes: 30,
  lessons: [
    {
      id: 'se-l1',
      title: 'Scope of practice: what a trainer can and can\'t do',
      plain: `Scope of practice is the boundary of what a certified personal trainer is qualified and legally permitted to do. Inside scope: general fitness programming, general nutrition guidance, motivation and behavior-change coaching. Outside scope: diagnosing injuries or medical conditions, prescribing specific diets/supplements/medications, treating injuries (that's physical therapy), or advising on performance-enhancing drugs. When a client's need falls outside scope, the correct move is always to **refer** — to a doctor, registered dietitian, physical therapist, or other licensed professional — never to guess or improvise.`,
      nasm: `Scope of practice defines the boundaries of services a Certified Personal Trainer is qualified and legally authorized to provide, generally encompassing fitness assessment, program design, and general lifestyle/nutrition guidance, while excluding diagnosis, medical treatment, individualized medical nutrition therapy, and rehabilitation. When a client's needs exceed scope of practice, the trainer must refer the client to an appropriately licensed professional.`,
      mustMemorise: ['When a client\'s need is outside scope of practice, always refer to a licensed professional'],
    },
    {
      id: 'se-l2',
      title: 'Confidentiality, liability, and waivers',
      plain: `Client information (health history, goals, personal details) must be kept confidential — shared only with the client's consent or as legally required. Trainers carry **liability** risk (legal responsibility if a client is injured due to negligence), which is why **waivers** (documents where clients acknowledge and accept the risks of exercise) and **liability insurance** are standard business practice. **Negligence** specifically means failing to exercise the standard of care a reasonably prudent trainer would use in the same situation.`,
      nasm: `Client information must be kept confidential in accordance with professional and legal standards. Liability refers to legal responsibility for harm resulting from a trainer's actions or omissions. Negligence is the failure to exercise the standard of care that a reasonably prudent professional would exercise under similar circumstances. Waivers and liability insurance are standard risk-management practices used to document informed consent and mitigate financial risk.`,
      mustMemorise: ['Negligence = failing to use the standard of care a reasonably prudent trainer would use'],
    },
    {
      id: 'se-l3',
      title: 'CPR/AED and recertification',
      plain: `Every Certified Personal Trainer must maintain current CPR/AED certification — this is non-negotiable given the physical nature of the work. To keep an NASM certification active, trainers must recertify by earning **2.0 continuing education units (CEUs) every 2 years**.`,
      nasm: `Certified Personal Trainers are required to maintain current CPR/AED certification. NASM certification recertification requires earning 2.0 continuing education units (CEUs) every 2 years.`,
      mustMemorise: ['NASM recertification: 2.0 CEUs every 2 years'],
    },
  ],
  items: [
    { kind: 'typein', id: 'se-t1', tags: ['scope'], prompt: 'What should a trainer do when a client\'s need falls outside their scope of practice?', accept: ['refer them to a licensed professional', 'refer', 'refer to a licensed professional'], hints: ['Send them elsewhere.', 'R____'], explanation: 'The trainer should refer the client to an appropriately licensed professional.' },
    { kind: 'typein', id: 'se-t2', tags: ['ethics'], prompt: 'What term describes failing to use the standard of care a reasonably prudent trainer would use?', accept: ['negligence'], hints: ['A legal term.', 'N_________'], explanation: 'Negligence is failing to exercise the standard of care a reasonably prudent trainer would use.' },
    { kind: 'typein', id: 'se-t3', tags: ['ethics'], prompt: 'What document has a client acknowledge and accept the risks of exercise?', accept: ['waiver'], hints: ['Signed before training begins.', 'W______'], explanation: 'A waiver documents the client\'s acknowledgment and acceptance of exercise risk.' },
    { kind: 'typein', id: 'se-t4', tags: ['certification'], prompt: 'How many CEUs are required to recertify an NASM CPT credential, and over what period?', accept: ['2.0 ceus every 2 years', '2 ceus every 2 years', '2.0 every 2 years'], hints: ['Same number twice.', '_.0 CEUs / _ years'], explanation: 'NASM recertification requires 2.0 CEUs every 2 years.' },
    { kind: 'typein', id: 'se-t5', tags: ['certification'], prompt: 'What certification must every personal trainer maintain, related to emergency response?', accept: ['cpr/aed', 'cpr and aed', 'cpr aed'], hints: ['Two abbreviations.', 'CPR/A__'], explanation: 'Trainers must maintain current CPR/AED certification.' },
    {
      kind: 'mcq', id: 'se-m1', tags: ['scope'], source: 'original',
      prompt: 'A client asks their trainer to design a specific meal plan with exact macronutrient targets for a medical condition. What is the correct response?',
      options: [
        'Design the plan, since nutrition is within a trainer\'s scope of practice.',
        'Politely decline and refer the client to a registered dietitian or physician.',
        'Suggest general foods only, without any macronutrient detail.',
        'Ignore the request entirely.',
      ],
      answer: 1,
      explanation: 'Individualized medical nutrition therapy is outside a trainer\'s scope of practice and should be referred to a qualified professional.',
      whyWrong: ['General nutrition guidance is within scope, but individualized medical nutrition planning is not.', '', 'This avoids the issue rather than properly referring the client.', 'Ignoring the request is not an appropriate professional response.'],
    },
    {
      kind: 'mcq', id: 'se-m2', tags: ['certification'], source: 'original',
      prompt: 'How often must an NASM Certified Personal Trainer recertify, and with how many CEUs?',
      options: ['1.0 CEU every year', '2.0 CEUs every 2 years', '5.0 CEUs every 5 years', '0.5 CEUs every 6 months'],
      answer: 1,
      explanation: 'NASM recertification requires 2.0 CEUs every 2 years.',
      whyWrong: ['This does not match the NASM recertification cycle.', '', 'This does not match the NASM recertification cycle.', 'This does not match the NASM recertification cycle.'],
    },
  ],
}
