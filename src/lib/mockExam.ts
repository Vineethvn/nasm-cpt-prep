import type { McqItem, ScenarioItem } from '../types/content'
import { MODULES } from '../content'
import { SAMPLE_PAPER } from '../content/samplePaper'
import { DOMAINS } from '../content/domains'

export type ExamMcq = McqItem | ScenarioItem
export type ExamPoolEntry = { item: ExamMcq; domainId: string }

const DOMAIN_IDS = DOMAINS.map((d) => d.id)

function isDomainId(tag: string): tag is (typeof DOMAIN_IDS)[number] {
  return DOMAIN_IDS.includes(tag as (typeof DOMAIN_IDS)[number])
}

/** Full pool of exam-eligible (MCQ/scenario) items app-wide, tagged with domain. */
export function buildExamPool(): ExamPoolEntry[] {
  const pool: ExamPoolEntry[] = []

  for (const m of MODULES) {
    for (const item of m.items) {
      if (item.kind === 'mcq' || item.kind === 'scenario') {
        pool.push({ item, domainId: m.domainId })
      }
    }
  }

  for (const item of SAMPLE_PAPER) {
    const domainTag = item.tags.find(isDomainId)
    if (domainTag) pool.push({ item, domainId: domainTag })
  }

  return pool
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Largest-remainder apportionment of `total` across domains by exam weight. */
function apportion(total: number): Record<string, number> {
  const raw = DOMAINS.map((d) => ({ id: d.id, exact: d.examWeight * total }))
  const floors = raw.map((r) => ({ id: r.id, base: Math.floor(r.exact), remainder: r.exact - Math.floor(r.exact) }))
  let assigned = floors.reduce((sum, f) => sum + f.base, 0)
  const sorted = [...floors].sort((a, b) => b.remainder - a.remainder)
  let i = 0
  while (assigned < total) {
    sorted[i % sorted.length].base += 1
    assigned++
    i++
  }
  return Object.fromEntries(floors.map((f) => [f.id, f.base]))
}

export type MockExamQuestion = { item: ExamMcq; domainId: string }

/** Builds a mock exam of `total` questions, apportioned by domain weight where the item bank allows. */
export function generateMockExam(total = 120): MockExamQuestion[] {
  const pool = buildExamPool()
  const byDomain: Record<string, ExamPoolEntry[]> = {}
  for (const entry of pool) {
    byDomain[entry.domainId] ??= []
    byDomain[entry.domainId].push(entry)
  }

  const quotas = apportion(total)
  const selected: MockExamQuestion[] = []
  // Remaining, not-yet-selected pool per domain, shuffled once up front.
  const remaining: Record<string, ExamPoolEntry[]> = {}
  for (const domainId of DOMAIN_IDS) remaining[domainId] = shuffle(byDomain[domainId] ?? [])

  for (const domainId of Object.keys(quotas)) {
    const take = remaining[domainId].splice(0, quotas[domainId])
    selected.push(...take.map((e) => ({ item: e.item, domainId: e.domainId })))
  }

  // If some domains' banks were smaller than their quota, redistribute the shortfall
  // proportionally (by exam weight) among domains that still have leftover items,
  // rather than dumping it all into whichever domain happens to have the biggest bank.
  let shortfall = total - selected.length
  while (shortfall > 0) {
    const domainsWithLeftover = DOMAIN_IDS.filter((id) => remaining[id].length > 0)
    if (domainsWithLeftover.length === 0) break
    const weightSum = domainsWithLeftover.reduce((sum, id) => sum + (DOMAINS.find((d) => d.id === id)?.examWeight ?? 0), 0)
    let takenThisPass = 0
    for (const domainId of domainsWithLeftover) {
      if (shortfall - takenThisPass <= 0) break
      const weight = DOMAINS.find((d) => d.id === domainId)?.examWeight ?? 0
      const share = weightSum > 0 ? Math.max(1, Math.round((weight / weightSum) * shortfall)) : 1
      const take = remaining[domainId].splice(0, Math.min(share, remaining[domainId].length, shortfall - takenThisPass))
      selected.push(...take.map((e) => ({ item: e.item, domainId: e.domainId })))
      takenThisPass += take.length
    }
    if (takenThisPass === 0) break // safety: no progress possible, avoid infinite loop
    shortfall -= takenThisPass
  }

  return shuffle(selected)
}

export type DomainScore = { correct: number; total: number }

export function scoreByDomain(
  questions: MockExamQuestion[],
  answers: Record<string, number>,
): Record<string, DomainScore> {
  const result: Record<string, DomainScore> = {}
  for (const { item, domainId } of questions) {
    result[domainId] ??= { correct: 0, total: 0 }
    result[domainId].total++
    if (answers[item.id] === item.answer) result[domainId].correct++
  }
  return result
}
