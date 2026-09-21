import type { Domain } from '../types/content'

// Weights per current NASM CPT exam blueprint — VERIFY before exam if you have
// access to the latest candidate handbook; these are the widely-cited 7th-ed figures.
export const DOMAINS: Domain[] = [
  {
    id: 'd1',
    title: 'Basic & Applied Sciences and Nutrition',
    examWeight: 0.19,
    modules: ['d1-nervous-skeletal-muscular', 'd1-endocrine-cardioresp-bioenergetics', 'd1-biomechanics-hms', 'd1-nutrition'],
  },
  {
    id: 'd2',
    title: 'Assessment',
    examWeight: 0.18,
    modules: ['d2-intake-vitals', 'd2-posture-movement', 'd2-performance-testing'],
  },
  {
    id: 'd3',
    title: 'Program Design',
    examWeight: 0.21,
    modules: ['d3-opt-model', 'd3-acute-variables', 'd3-cardio-programming', 'd3-special-populations'],
  },
  {
    id: 'd4',
    title: 'Exercise Technique & Training Instruction',
    examWeight: 0.22,
    modules: ['d4-warmup-flexibility', 'd4-core-balance-plyo-saq', 'd4-resistance-technique', 'd4-modalities'],
  },
  {
    id: 'd5',
    title: 'Client Relations & Behavioral Coaching',
    examWeight: 0.13,
    modules: ['d5-behavior-change', 'd5-communication'],
  },
  {
    id: 'd6',
    title: 'Professional Development & Responsibility',
    examWeight: 0.1,
    modules: ['d6-scope-ethics', 'd6-business'],
  },
]

export const DOMAIN_MAP: Record<string, Domain> = Object.fromEntries(DOMAINS.map((d) => [d.id, d]))
