import type { Module } from '../types/content'
import { optModel } from './modules/opt-model'
import { acuteVariables } from './modules/acute-variables'
import { muscleImbalances } from './modules/muscle-imbalances'
import { vtZoneLab } from './modules/vt-zone-lab'
import { behaviorChange } from './modules/behavior-change'
import { nervousSkeletalMuscular } from './modules/d1-nervous-skeletal-muscular'
import { endocrineCardiorespBioenergetics } from './modules/d1-endocrine-cardioresp-bioenergetics'
import { biomechanicsHms } from './modules/d1-biomechanics-hms'
import { nutrition } from './modules/d1-nutrition'
import { intakeVitals } from './modules/d2-intake-vitals'
import { performanceTesting } from './modules/d2-performance-testing'
import { specialPopulations } from './modules/d3-special-populations'
import { warmupFlexibility } from './modules/d4-warmup-flexibility'
import { coreBalancePlyoSaq } from './modules/d4-core-balance-plyo-saq'
import { resistanceTechnique } from './modules/d4-resistance-technique'
import { modalities } from './modules/d4-modalities'

export const MODULES: Module[] = [
  optModel,
  acuteVariables,
  muscleImbalances,
  vtZoneLab,
  behaviorChange,
  nervousSkeletalMuscular,
  endocrineCardiorespBioenergetics,
  biomechanicsHms,
  nutrition,
  intakeVitals,
  performanceTesting,
  specialPopulations,
  warmupFlexibility,
  coreBalancePlyoSaq,
  resistanceTechnique,
  modalities,
]

export const MODULE_MAP: Record<string, Module> = Object.fromEntries(MODULES.map((m) => [m.id, m]))

export function getModule(id: string): Module | undefined {
  return MODULE_MAP[id]
}

export function modulesForDomain(domainId: string): Module[] {
  return MODULES.filter((m) => m.domainId === domainId)
}

export function allItems() {
  return MODULES.flatMap((m) => m.items.map((item) => ({ item, moduleId: m.id })))
}

export function allLessons() {
  return MODULES.flatMap((m) => m.lessons.map((lesson) => ({ lesson, moduleId: m.id })))
}
