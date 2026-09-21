import type { McqItem, ScenarioItem } from '../types/content'
import { MODULES } from '../content'
import { SAMPLE_PAPER } from '../content/samplePaper'
import { DOMAINS } from '../content/domains'
import { getItemProgress } from './storage'

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
  // Weights are approximate blueprint figures and don't sum to exactly 1.0, so normalize —
  // otherwise floors can already exceed `total` and the exam ends up over-length.
  const weightSum = DOMAINS.reduce((s, d) => s + d.examWeight, 0)
  const raw = DOMAINS.map((d) => ({ id: d.id, exact: (d.examWeight / weightSum) * total }))
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

/** An item is "unseen" if it has never been answered anywhere in the app — practice tabs, sample paper, or a prior mock exam. */
export function isUnseen(itemId: string): boolean {
  return getItemProgress(itemId).timesSeen === 0
}

/** How much of the exam-eligible pool the user has never been tested on. */
export function countUnseenInPool(): { unseen: number; total: number } {
  const pool = buildExamPool()
  return { unseen: pool.filter((e) => isUnseen(e.item.id)).length, total: pool.length }
}

export type GenerateOptions = {
  /**
   * When true, never-answered items fill each domain's quota before previously seen ones.
   * This keeps the score an honest readiness signal after days of drilling the same bank —
   * otherwise a late-week score partly measures memory of specific questions.
   */
  preferUnseen?: boolean
}

/**
 * Selects up to `total` items from `pool`, apportioned by domain weight, redistributing
 * any domain's shortfall proportionally across the domains that still have items.
 * May return fewer than `total` if the whole pool is smaller than that.
 */
function selectProportionally(pool: ExamPoolEntry[], total: number): MockExamQuestion[] {
  if (total <= 0) return []
  const byDomain: Record<string, ExamPoolEntry[]> = {}
  for (const entry of pool) {
    byDomain[entry.domainId] ??= []
    byDomain[entry.domainId].push(entry)
  }

  const quotas = apportion(total)
  const selected: MockExamQuestion[] = []
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

  return selected
}

/** Builds a mock exam of `total` questions, apportioned by domain weight where the item bank allows. */
export function generateMockExam(total = 120, opts: GenerateOptions = {}): MockExamQuestion[] {
  const pool = buildExamPool()

  if (!opts.preferUnseen) {
    return shuffle(selectProportionally(pool, total))
  }

  // Two passes: fill the exam from never-answered items first (proportionally by domain),
  // and only fall back to previously seen items if the unseen bank can't fill it. This
  // maximizes how much of the exam is genuinely new rather than merely keeping unseen
  // items first *within* each domain, which would let a small, fully-drilled domain
  // (D5/D6) pull in seen questions while other domains still had plenty unseen.
  const unseenPool = pool.filter((e) => isUnseen(e.item.id))
  const seenPool = pool.filter((e) => !isUnseen(e.item.id))

  const fromUnseen = selectProportionally(unseenPool, total)
  if (fromUnseen.length >= total) return shuffle(fromUnseen)

  const fromSeen = selectProportionally(seenPool, total - fromUnseen.length)
  return shuffle([...fromUnseen, ...fromSeen])
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
