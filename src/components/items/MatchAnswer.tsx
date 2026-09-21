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

export function MatchAnswer({ item, onDone }: { item: MatchItem; onDone?: (correct: boolean) => void }) {
  const lefts = item.pairs.map((p) => p[0])
  const rights = useMemo(() => shuffle(item.pairs.map((p) => p[1])), [item.pairs])
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [activeLeft, setActiveLeft] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function pickRight(right: string) {
    if (submitted || !activeLeft) return
    setSelections((prev) => ({ ...prev, [activeLeft]: right }))
    setActiveLeft(null)
  }

  const allAssigned = lefts.every((l) => selections[l])
  const correctCount = lefts.filter((l) => {
    const pair = item.pairs.find((p) => p[0] === l)
    return pair && selections[l] === pair[1]
  }).length

  function submit() {
    setSubmitted(true)
    const correct = correctCount === lefts.length
    recordAnswer(item.id, correct)
    onDone?.(correct)
  }

  const usedRights = new Set(Object.values(selections))

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <p className="font-medium">{item.prompt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          {lefts.map((l) => {
            const pair = item.pairs.find((p) => p[0] === l)
            const isRight = submitted && pair && selections[l] === pair[1]
            return (
              <button
                key={l}
                onClick={() => setActiveLeft(l)}
                disabled={submitted}
                className={
                  'w-full text-left rounded-lg border px-3 py-2 ' +
                  (activeLeft === l
                    ? 'border-(--color-accent)'
                    : submitted
                      ? isRight
                        ? 'border-(--color-success) bg-(--color-success)/10'
                        : 'border-(--color-danger) bg-(--color-danger)/10'
                      : 'border-(--color-border)')
                }
              >
                <div className="font-medium">{l}</div>
                <div className="text-sm text-(--color-text-muted)">{selections[l] ?? '— tap to match —'}</div>
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {rights.map((r) => (
            <button
              key={r}
              onClick={() => pickRight(r)}
              disabled={submitted || usedRights.has(r)}
              className={
                'w-full text-left rounded-lg border px-3 py-2 text-sm ' +
                (usedRights.has(r) ? 'opacity-40 border-(--color-border)' : 'border-(--color-border) hover:border-(--color-accent)')
              }
            >
              {r}
            </button>
          ))}
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
