import { useMemo, useState } from 'react'
import type { MatchItem } from '../../types/content'
import { recordAnswer } from '../../lib/storage'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Right-hand answers are tracked by index, not by value: some items legitimately
 * repeat an answer (e.g. carbohydrate and protein are both "4 kcal/g"), and keying
 * or de-duplicating by value would collapse those into a single unusable option.
 */
type RightOption = { value: string; index: number }

export function MatchAnswer({ item, onDone }: { item: MatchItem; onDone?: (correct: boolean) => void }) {
  const lefts = item.pairs.map((p) => p[0])
  const rights = useMemo<RightOption[]>(
    () => shuffle(item.pairs.map((p, index) => ({ value: p[1], index }))),
    [item.pairs],
  )
  // left index -> right option index
  const [selections, setSelections] = useState<Record<number, number>>({})
  const [activeLeft, setActiveLeft] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function pickRight(rightIndex: number) {
    if (submitted || activeLeft === null) return
    setSelections((prev) => ({ ...prev, [activeLeft]: rightIndex }))
    setActiveLeft(null)
  }

  const allAssigned = lefts.every((_, i) => selections[i] !== undefined)

  // A pairing is correct when the chosen right-hand TEXT matches this left's correct text,
  // so duplicate answers (e.g. two "4 kcal/g" options) both count as correct.
  function isPairCorrect(leftIndex: number) {
    const chosen = selections[leftIndex]
    if (chosen === undefined) return false
    return item.pairs[chosen][1] === item.pairs[leftIndex][1]
  }

  const correctCount = lefts.filter((_, i) => isPairCorrect(i)).length

  function submit() {
    setSubmitted(true)
    const correct = correctCount === lefts.length
    recordAnswer(item.id, correct)
    onDone?.(correct)
  }

  const usedRightIndexes = new Set(Object.values(selections))

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <p className="font-medium">{item.prompt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          {lefts.map((l, i) => {
            const chosen = selections[i]
            const correct = submitted && isPairCorrect(i)
            return (
              <button
                key={`left-${i}`}
                onClick={() => setActiveLeft(i)}
                disabled={submitted}
                className={
                  'w-full text-left rounded-lg border px-3 py-2 ' +
                  (activeLeft === i
                    ? 'border-(--color-accent)'
                    : submitted
                      ? correct
                        ? 'border-(--color-success) bg-(--color-success)/10'
                        : 'border-(--color-danger) bg-(--color-danger)/10'
                      : 'border-(--color-border)')
                }
              >
                <div className="font-medium">{l}</div>
                <div className="text-sm text-(--color-text-muted)">
                  {chosen !== undefined ? item.pairs[chosen][1] : '— tap to match —'}
                </div>
                {submitted && !correct && (
                  <div className="text-xs text-(--color-text-muted)">Correct: {item.pairs[i][1]}</div>
                )}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {rights.map((r) => {
            const used = usedRightIndexes.has(r.index)
            return (
              <button
                key={`right-${r.index}`}
                onClick={() => pickRight(r.index)}
                disabled={submitted || used}
                className={
                  'w-full text-left rounded-lg border px-3 py-2 text-sm ' +
                  (used ? 'opacity-40 border-(--color-border)' : 'border-(--color-border) hover:border-(--color-accent)')
                }
              >
                {r.value}
              </button>
            )
          })}
        </div>
      </div>
      {!submitted && (
        <button
          disabled={!allAssigned}
          className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium disabled:opacity-50"
          onClick={submit}
        >
          Check matches
        </button>
      )}
      {submitted && (
        <p className={correctCount === lefts.length ? 'text-(--color-success) text-sm' : 'text-(--color-danger) text-sm'}>
          {correctCount}/{lefts.length} correct. {item.explanation}
        </p>
      )}
    </div>
  )
}
