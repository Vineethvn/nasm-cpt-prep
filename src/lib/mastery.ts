import { DOMAINS } from '../content/domains'
import { MODULES } from '../content'
import { getItemProgress, isDue, isWeak } from './storage'

/** Mastery score for one item: box 1-5 mapped to 0-100%. */
function itemMasteryPct(itemId: string): number {
  const box = getItemProgress(itemId).box
  return ((box - 1) / 4) * 100
}

export function domainMastery(domainId: string): number {
  const items = MODULES.filter((m) => m.domainId === domainId).flatMap((m) => m.items)
  if (items.length === 0) return 0
  const sum = items.reduce((acc, it) => acc + itemMasteryPct(it.id), 0)
  return sum / items.length
}

export function overallReadiness(): number {
  const totalWeight = DOMAINS.reduce((a, d) => a + d.examWeight, 0)
  const weighted = DOMAINS.reduce((acc, d) => acc + domainMastery(d.id) * d.examWeight, 0)
  return totalWeight > 0 ? weighted / totalWeight : 0
}

export function dueItemIds(): string[] {
  return MODULES.flatMap((m) => m.items).filter((it) => isDue(it.id)).map((it) => it.id)
}

export function weakItemIds(): string[] {
  return MODULES.flatMap((m) => m.items).filter((it) => isWeak(it.id)).map((it) => it.id)
}

export function unstartedModules() {
  return MODULES.filter((m) => m.items.every((it) => getItemProgress(it.id).timesSeen === 0))
}

export type PlanEntry = { kind: 'due' | 'weak' | 'unstarted'; label: string; moduleId: string }

export function todaysPlan(limit = 6): PlanEntry[] {
  const entries: PlanEntry[] = []
  const due = dueItemIds()
  const weak = weakItemIds()
  for (const m of MODULES) {
    const dueCount = m.items.filter((it) => due.includes(it.id)).length
    if (dueCount > 0) entries.push({ kind: 'due', label: `${dueCount} due in ${m.title}`, moduleId: m.id })
  }
  for (const m of MODULES) {
    const weakCount = m.items.filter((it) => weak.includes(it.id) && it.id).length
    if (weakCount > 0) entries.push({ kind: 'weak', label: `${weakCount} weak items in ${m.title}`, moduleId: m.id })
  }
  for (const m of unstartedModules()) {
    entries.push({ kind: 'unstarted', label: `Start ${m.title}`, moduleId: m.id })
  }
  return entries.slice(0, limit)
}
