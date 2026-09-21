import { SYNONYMS } from './synonyms'

/** Lowercase, trim, collapse whitespace, strip punctuation/hyphens, normalize dashes/ranges. */
export function normalize(raw: string): string {
  let s = raw.toLowerCase().trim()
  // unify en/em dashes and "to" into a plain hyphen for ranges like "12-20"
  s = s.replace(/[‒-―‐‑]/g, '-')
  s = s.replace(/\s*(?:-|to)\s*/g, '-')
  // strip punctuation except hyphen (kept for ranges) and spaces/word chars
  s = s.replace(/[^\w\s-]/g, '')
  // collapse multiple spaces
  s = s.replace(/\s+/g, ' ').trim()
  // drop hyphens that aren't between two digits (e.g. word hyphens), keep numeric ranges
  s = s.replace(/(\D)-(\D)/g, '$1 $2')
  return s
}

/** Expand a normalized string via the synonym dictionary if a whole-string match exists. */
function applySynonym(s: string): string {
  return SYNONYMS[s] ?? s
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j]
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
      prev = tmp
    }
  }
  return dp[n]
}

export type MatchResult = { correct: boolean; fuzzy: boolean }

/** Checks a single typed answer against one accepted answer string. */
function matchesOne(typed: string, accepted: string): MatchResult {
  const a = applySynonym(normalize(typed))
  const b = applySynonym(normalize(accepted))
  if (a === b) return { correct: true, fuzzy: false }
  // fuzzy: only for longer words, to avoid false positives on short terms
  if (a.length > 6 && b.length > 6) {
    const dist = levenshtein(a, b)
    if (dist <= 2) return { correct: true, fuzzy: true }
  }
  return { correct: false, fuzzy: false }
}

/** Checks a typed answer against a list of accepted answers/synonyms. */
export function checkTypedAnswer(typed: string, accept: string[]): MatchResult {
  if (!typed.trim()) return { correct: false, fuzzy: false }
  for (const accepted of accept) {
    const result = matchesOne(typed, accepted)
    if (result.correct) return result
  }
  return { correct: false, fuzzy: false }
}

/** Builds a first-letter hint, e.g. "gluteus medius" -> "G_____ M______". */
export function firstLetterHint(canonical: string): string {
  return canonical
    .split(' ')
    .map((word) => (word.length ? word[0].toUpperCase() + '_'.repeat(word.length - 1) : word))
    .join(' ')
}
