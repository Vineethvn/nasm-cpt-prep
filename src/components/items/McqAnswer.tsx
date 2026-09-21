import { useState } from 'react'
import type { McqItem } from '../../types/content'
import { recordAnswer } from '../../lib/storage'
import clsx from 'clsx'

export function McqAnswer({ item, onDone }: { item: McqItem; onDone?: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null)

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    const correct = i === item.answer
    recordAnswer(item.id, correct)
    onDone?.(correct)
  }

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <p className="font-medium">{item.prompt}</p>
      <div className="grid gap-2" onKeyDown={(e) => {
        const num = Number(e.key)
        if (num >= 1 && num <= item.options.length) choose(num - 1)
      }}>
        {item.options.map((opt, i) => {
          const isAnswer = i === item.answer
          const isSelected = i === selected
          const showState = selected !== null
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={clsx(
                'text-left rounded-lg border px-3 py-2 flex items-start gap-2 transition-colors',
                !showState && 'border-(--color-border) hover:border-(--color-accent)',
                showState && isAnswer && 'border-(--color-success) bg-(--color-success)/10',
                showState && isSelected && !isAnswer && 'border-(--color-danger) bg-(--color-danger)/10',
                showState && !isAnswer && !isSelected && 'border-(--color-border) opacity-60',
              )}
            >
              <span className="font-mono text-xs mt-0.5 text-(--color-text-muted)">{i + 1}</span>
              <span className="flex-1">{opt}</span>
              {showState && isAnswer && <span aria-hidden>✓</span>}
              {showState && isSelected && !isAnswer && <span aria-hidden>✗</span>}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="text-sm space-y-1">
          <p className={selected === item.answer ? 'text-(--color-success)' : 'text-(--color-danger)'}>
            {selected === item.answer ? '✓ Correct.' : '✗ Not quite.'} {item.explanation}
          </p>
          {selected !== item.answer && item.whyWrong[selected] && (
            <p className="text-(--color-text-muted)">Why your choice is wrong: {item.whyWrong[selected]}</p>
          )}
        </div>
      )}
    </div>
  )
}
