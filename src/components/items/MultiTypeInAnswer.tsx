import { useState } from 'react'
import type { MultiTypeInItem } from '../../types/content'
import { checkTypedAnswer } from '../../lib/matching'
import { recordAnswer } from '../../lib/storage'

export function MultiTypeInAnswer({ item, onDone }: { item: MultiTypeInItem; onDone?: (correct: boolean) => void }) {
  const [entries, setEntries] = useState<string[]>(() => item.expected.map(() => ''))
  const [current, setCurrent] = useState('')
  const [hits, setHits] = useState<Set<number>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  function addEntry() {
    if (!current.trim() || submitted) return
    setEntries((prev) => [...prev, current])
    // find first not-yet-hit expected match
    const matchIndex = item.expected.findIndex(
      (exp, i) => !hits.has(i) && checkTypedAnswer(current, [exp.canonical, ...exp.accept]).correct,
    )
    if (matchIndex >= 0) {
      setHits((prev) => new Set(prev).add(matchIndex))
    }
    setCurrent('')
  }

  function finish() {
    if (submitted) return
    setSubmitted(true)
    const passed = hits.size >= item.minToPass
    recordAnswer(item.id, passed)
    onDone?.(passed)
  }

  const wrongExtras = entries.filter(
    (e) => !item.expected.some((exp) => checkTypedAnswer(e, [exp.canonical, ...exp.accept]).correct),
  )

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <p className="font-medium">{item.prompt}</p>
      <p className="text-xs text-(--color-text-muted)">
        Type answers one at a time and press Enter. Need at least {item.minToPass} of {item.expected.length}.
      </p>
      {!submitted && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="flex-1 min-w-0 rounded-lg border border-(--color-border) bg-transparent px-3 py-2 outline-none focus-visible:border-(--color-accent)"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addEntry()}
            placeholder="Type one answer, press Enter…"
            autoComplete="off"
          />
          <div className="flex gap-2">
            <button className="flex-1 sm:flex-none rounded-lg border border-(--color-border) px-3 py-2" onClick={addEntry}>
              Add
            </button>
            <button className="flex-1 sm:flex-none rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={finish}>
              Done
            </button>
          </div>
        </div>
      )}
      <ul className="flex flex-wrap gap-2">
        {item.expected.map((exp, i) => (
          <li
            key={exp.canonical}
            className={
              'rounded-full px-3 py-1 text-sm border ' +
              (hits.has(i)
                ? 'border-(--color-success) bg-(--color-success)/10'
                : submitted
                  ? 'border-(--color-danger) bg-(--color-danger)/10'
                  : 'border-(--color-border) text-(--color-text-muted)')
            }
          >
            {hits.has(i) ? '✓ ' : submitted ? '✗ ' : '? '}
            {exp.canonical}
          </li>
        ))}
      </ul>
      {wrongExtras.length > 0 && (
        <p className="text-xs text-(--color-text-muted)">Not matched: {wrongExtras.join(', ')}</p>
      )}
      {submitted && (
        <p className={hits.size >= item.minToPass ? 'text-(--color-success) text-sm' : 'text-(--color-danger) text-sm'}>
          {hits.size >= item.minToPass ? '✓ ' : '✗ '}
          {hits.size}/{item.expected.length} correct. {item.explanation}
        </p>
      )}
    </div>
  )
}
