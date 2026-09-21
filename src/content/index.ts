import type { Module } from '../types/content'
import { optModel } from './modules/opt-model'
import { acuteVariables } from './modules/acute-variables'
import { muscleImbalances } from './modules/muscle-imbalances'
import { vtZoneLab } from './modules/vt-zone-lab'
import { behaviorChange } from './modules/behavior-change'

export const MODULES: Module[] = [optModel, acuteVariables, muscleImbalances, vtZoneLab, behaviorChange]

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
