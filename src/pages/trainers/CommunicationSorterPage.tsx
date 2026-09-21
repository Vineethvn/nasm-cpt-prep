import { useState } from 'react'
import { COMM_CATEGORIES, COMM_LINES, type CommCategory } from '../../content/trainers/communicationSorterData'
import clsx from 'clsx'

export function CommunicationSorterPage() {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<CommCategory | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const line = COMM_LINES[index]
  const isCorrect = picked === line.category

  function choose(cat: CommCategory) {
    if (picked) return
    setPicked(cat)
    setScore((s) => ({ correct: s.correct + (cat === line.category ? 1 : 0), total: s.total + 1 }))
  }

  function next() {
    setIndex((i) => (i + 1) % COMM_LINES.length)
    setPicked(null)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Communication Sorter</h1>
      <p className="text-sm text-(--color-text-muted)">Classify each trainer line using OARS and motivational-interviewing categories.</p>

      <p className="text-xs text-(--color-text-muted)">Score: {score.correct}/{score.total}</p>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <p className="text-lg">{line.line}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COMM_CATEGORIES.map((cat) => {
            const show = picked !== null
            const isRight = cat === line.category
            const isPicked = cat === picked
            return (
              <button
                key={cat}
                disabled={picked !== null}
                onClick={() => choose(cat)}
                className={clsx(
                  'text-left rounded-lg border px-3 py-2 text-sm',
                  !show && 'border-(--color-border) hover:border-(--color-accent)',
                  show && isRight && 'border-(--color-success) bg-(--color-success)/10',
                  show && isPicked && !isRight && 'border-(--color-danger) bg-(--color-danger)/10',
                  show && !isRight && !isPicked && 'border-(--color-border) opacity-60',
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>
        {picked && (
          <p className={isCorrect ? 'text-(--color-success) text-sm' : 'text-(--color-danger) text-sm'}>
            {isCorrect ? '✓ Correct.' : `✗ This is ${line.category}.`}
          </p>
        )}
        {picked && (
          <button className="w-full rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={next}>
            Next line →
          </button>
        )}
      </div>
    </div>
  )
}
