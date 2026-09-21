import { useMemo, useState } from 'react'
import type { OrderItem } from '../../types/content'
import { recordAnswer } from '../../lib/storage'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function OrderAnswer({ item, onDone }: { item: OrderItem; onDone?: (correct: boolean) => void }) {
  const [items, setItems] = useState<string[]>(() => shuffle(item.correctOrder))
  const [submitted, setSubmitted] = useState(false)
  const isCorrect = useMemo(() => items.every((v, i) => v === item.correctOrder[i]), [items, item.correctOrder])

  function move(i: number, dir: -1 | 1) {
    if (submitted) return
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }

  function submit() {
    setSubmitted(true)
    recordAnswer(item.id, isCorrect)
    onDone?.(isCorrect)
  }

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <p className="font-medium">{item.prompt}</p>
      <ol className="space-y-2">
        {items.map((val, i) => (
          <li
            key={val}
            className={
              'flex items-center gap-2 rounded-lg border px-3 py-2 ' +
              (submitted
                ? val === item.correctOrder[i]
                  ? 'border-(--color-success) bg-(--color-success)/10'
                  : 'border-(--color-danger) bg-(--color-danger)/10'
                : 'border-(--color-border)')
            }
          >
            <span className="font-mono text-xs text-(--color-text-muted)">{i + 1}</span>
            <span className="flex-1 text-left">{val}</span>
            {!submitted && (
              <span className="flex gap-1">
                <button aria-label="Move up" onClick={() => move(i, -1)} className="px-2">↑</button>
                <button aria-label="Move down" onClick={() => move(i, 1)} className="px-2">↓</button>
              </span>
            )}
          </li>
        ))}
      </ol>
      {!submitted && (
        <button className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={submit}>
          Check order
        </button>
      )}
      {submitted && (
        <p className={isCorrect ? 'text-(--color-success) text-sm' : 'text-(--color-danger) text-sm'}>
          {isCorrect ? '✓ Correct order!' : '✗ Not quite.'} {item.explanation}
        </p>
      )}
    </div>
  )
}
