import type { Module } from '../../types/content'

export const communication: Module = {
  id: 'd5-communication',
  domainId: 'd5',
  title: 'Communication & Motivational Interviewing',
  estMinutes: 30,
  lessons: [
    {
      id: 'comm-l1',
      title: 'Questions that promote change vs. questions that shut it down',
      plain: `How you ask a question matters as much as what you ask. Open, curious, non-judgmental questions ("What might you want to change?") invite the client to talk themselves into motivation. Confrontational or "why" questions that challenge the client ("Why can't you make this change?" or "Why don't you just do this?") tend to trigger defensiveness instead of progress, even when well-intentioned.`,
      nasm: `Questions that promote change are open, non-judgmental, and invite client reflection (e.g., "What might you want to change?"). Confrontational or directive phrasing (e.g., "Why can't you...", "Why don't you just...") tends to elicit defensiveness ("sustain talk") rather than client-driven change talk, and should be avoided in motivational interviewing.`,
      mustMemorise: ['Change-promoting questions are open and non-judgmental, not confrontational "why can\'t you" phrasing'],
    },
    {
      id: 'comm-l2',
      title: 'Closed vs. open-ended questions',
      plain: `A **closed-ended** question can be answered with a single word (often yes/no) — "Did you drink enough water today?" An **open-ended** question requires the client to explain, elaborate, reflect — "Why do you want to lose weight?" is technically phrased with "why," but functionally it's still open-ended because it requires an explanatory answer, not a yes/no.`,
      nasm: `Closed-ended questions can be answered with a brief, often binary response. Open-ended questions require elaboration and cannot be answered with a simple yes or no, even when phrased starting with "why," "what," or "how" — the defining feature is whether the response requires explanation.`,
      mustMemorise: ['Open-ended questions require explanation; closed-ended questions can be answered in one word'],
    },
    {
      id: 'comm-l3',
      title: 'Reflections vs. reflective listening vs. active listening',
      plain: `These three terms are related but distinct, and exam questions love testing the difference. **Active listening** is the overall skill/practice of fully attending to what someone says. **Reflective listening** is specifically restating the client's goals/words back to confirm understanding ("So it sounds like you want to feel stronger for your kids"). A **reflection** is a statement that helps the listener express the supposed underlying meaning of what was just said (going a layer deeper than just repeating words — naming the feeling or meaning behind them).`,
      nasm: `Active listening is the general practice of fully attending to and processing what a client communicates. Reflective listening is the specific technique of restating a client's stated content back to them to confirm understanding. A reflection is a statement that articulates the supposed underlying meaning or feeling behind what the client has expressed, going beyond simple restatement.`,
      mustMemorise: [
        'Active listening = the general skill of attentive listening',
        'Reflective listening = restating the client\'s words back to confirm understanding',
        'Reflections = expressing the underlying meaning behind what was said',
      ],
    },
    {
      id: 'comm-l4',
      title: 'Leadership qualities',
      plain: `NASM frames good trainer leadership around a specific set of traits — being optimistic, empathetic, knowledgeable, and a genuine role model for a healthy, balanced life. This bundle of traits is referred to specifically as the leader's qualities (distinct from "leadership style," which is about how a leader manages/interacts, not the underlying character traits themselves).`,
      nasm: `Leader's qualities refer to the personal characteristics that make a trainer an effective role model and leader, including optimism, empathy, and knowledge, exemplified by living a healthy and balanced life. This is distinct from leadership style, which describes behavioral approach rather than underlying character traits.`,
      mustMemorise: ['Leader\'s qualities = optimistic, empathetic, knowledgeable, role model for a healthy/balanced life'],
    },
  ],
  items: [
    { kind: 'typein', id: 'comm-t1', tags: ['questions'], prompt: 'What kind of question can be answered with a single word, often yes/no?', accept: ['closed-ended', 'closed ended', 'closed'], hints: ['The opposite of open-ended.', 'C_____-E____'], explanation: 'A closed-ended question can be answered briefly, often yes/no.' },
    { kind: 'typein', id: 'comm-t2', tags: ['questions'], prompt: 'What kind of question requires the client to explain or elaborate?', accept: ['open-ended', 'open ended', 'open'], hints: ['Can\'t be answered with one word.', 'O___-E____'], explanation: 'Open-ended questions require elaboration.' },
    { kind: 'typein', id: 'comm-t3', tags: ['listening'], prompt: 'What is it called when a trainer restates the client\'s words back to confirm understanding?', accept: ['reflective listening'], hints: ['Involves "reflective."', 'R__________ L________'], explanation: 'Reflective listening is restating a client\'s words back to confirm understanding.' },
    { kind: 'typein', id: 'comm-t4', tags: ['listening'], prompt: 'What term describes a statement expressing the underlying meaning behind what a client said?', accept: ['reflection', 'reflections'], hints: ['Singular, not "reflective listening."', 'R_________'], explanation: 'A reflection expresses the underlying meaning behind what was said.' },
    { kind: 'typein', id: 'comm-t5', tags: ['leadership'], prompt: 'What term describes a trainer\'s optimism, empathy, knowledge, and role-modeling of a healthy life?', accept: ['leaders qualities', 'leader\'s qualities'], hints: ['Two words.', 'L______\'s Q________'], explanation: 'These traits are called the leader\'s qualities.' },
    {
      kind: 'mcq', id: 'comm-m1', tags: ['questions'], source: 'original',
      prompt: 'Which of the following is a question that may promote change?',
      options: ['What might you want to change?', 'Why can\'t you make this change to your schedule?', 'What makes you think that you\'re not at risk?', 'Why don\'t you just do this?'],
      answer: 0,
      explanation: 'Open, non-judgmental questions that invite the client to reflect promote change talk.',
      whyWrong: ['', 'A "why can\'t you" framing is confrontational and tends to trigger defensiveness.', 'This is a challenging, judgmental framing.', 'This is a directive framing that pushes the trainer\'s agenda rather than eliciting the client\'s own motivation.'],
    },
    {
      kind: 'mcq', id: 'comm-m2', tags: ['listening'], source: 'original',
      prompt: 'A trainer listens to a client\'s goals, then restates those goals back to the client. What is this an example of?',
      options: ['Reflective listening', 'Motivational interviewing', 'Nonverbal communication', 'A reflection'],
      answer: 0,
      explanation: 'Restating what the client said back to them, to confirm understanding, is reflective listening.',
      whyWrong: ['', 'Motivational interviewing is the broader counseling style, of which reflective listening is one technique.', 'Restating the client\'s words is verbal, not nonverbal.', 'A reflection would articulate the underlying meaning/feeling, not just restate the content.'],
    },
    {
      kind: 'match', id: 'comm-match1', tags: ['listening'],
      prompt: 'Match each communication term to its definition.',
      pairs: [
        ['Active listening', 'The general skill of fully attending to what a client says'],
        ['Reflective listening', 'Restating the client\'s stated content back to confirm understanding'],
        ['Reflection', 'A statement expressing the underlying meaning behind what was said'],
      ],
      explanation: 'Active listening is the general skill; reflective listening restates content; a reflection goes deeper to name the underlying meaning.',
    },
  ],
}
