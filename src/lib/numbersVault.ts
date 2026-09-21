import { MODULES } from '../content'

export type NumberFlashcard = {
  id: string
  prompt: string
  accept: string[]
  fullFact: string
  moduleTitle: string
}

export type FlipFact = {
  id: string
  fact: string
  moduleTitle: string
}

/**
 * Numbers Vault is auto-built from every lesson's `mustMemorise` bullets.
 * Facts written as "X = Y" become type-in flashcards (recall Y from X);
 * everything else becomes a flip-card fact to review.
 */
export function buildNumbersVault(): { flashcards: NumberFlashcard[]; flipFacts: FlipFact[] } {
  const flashcards: NumberFlashcard[] = []
  const flipFacts: FlipFact[] = []

  for (const mod of MODULES) {
    for (const lesson of mod.lessons) {
      for (const [i, fact] of (lesson.mustMemorise ?? []).entries()) {
        const eqIndex = fact.indexOf('=')
        if (eqIndex > 0 && eqIndex < fact.length - 1) {
          const left = fact.slice(0, eqIndex).trim()
          const right = fact.slice(eqIndex + 1).trim()
          flashcards.push({
            id: `nv-${lesson.id}-${i}`,
            prompt: `${left} = ?`,
            accept: [right, right.replace(/[–—]/g, '-')],
            fullFact: fact,
            moduleTitle: mod.title,
          })
        } else {
          flipFacts.push({ id: `nv-flip-${lesson.id}-${i}`, fact, moduleTitle: mod.title })
        }
      }
    }
  }

  return { flashcards, flipFacts }
}
