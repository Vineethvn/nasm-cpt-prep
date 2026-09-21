import { useMemo, useState } from 'react'
import { COMPENSATIONS } from '../../content/trainers/muscleImbalanceData'
import { MODULES } from '../../content'
import { ItemRenderer } from '../../components/items/ItemRenderer'
import { checkTypedAnswer } from '../../lib/matching'
import clsx from 'clsx'

const miModule = MODULES.find((m) => m.id === 'd2-posture-movement')!

function itemFor(id: string) {
  return miModule.items.find((it) => it.id === id)!
}

export function MuscleImbalanceTrainerPage() {
  const [mode, setMode] = useState<'drill' | 'learn' | 'reverse'>('drill')
  const [index, setIndex] = useState(0)
  const compensation = COMPENSATIONS[index]

  function next() {
    setIndex((i) => (i + 1) % COMPENSATIONS.length)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Muscle Imbalance Trainer</h1>
      <p className="text-sm text-(--color-text-muted)">Based on the overhead squat assessment. The side a joint moves toward is tight; the opposite side is weak.</p>

      <div className="flex gap-1 rounded-lg border border-(--color-border) p-1">
        {(['drill', 'learn', 'reverse'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={clsx(
              'flex-1 rounded-md px-3 py-1.5 text-sm font-medium capitalize',
              mode === m ? 'bg-(--color-accent) text-(--color-accent-fg)' : 'text-(--color-text-muted)',
            )}
          >
            {m === 'drill' ? 'Drill' : m === 'learn' ? 'Learn the logic' : 'Reverse drill'}
          </button>
        ))}
      </div>

      {mode === 'drill' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-(--color-accent) bg-(--color-accent)/5 p-3 text-sm">
            <span className="uppercase text-xs text-(--color-text-muted)">{compensation.view} view</span>
            <p className="font-medium">{compensation.compensation}</p>
          </div>
          <ItemRenderer key={`${compensation.id}-over`} item={itemFor(`mi-mt-${index}-over`)} />
          <ItemRenderer key={`${compensation.id}-under`} item={itemFor(`mi-mt-${index}-under`)} />
          <p className="text-sm text-(--color-text-muted) italic">{compensation.logic}</p>
          <button className="w-full rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={next}>
            Next compensation →
          </button>
        </div>
      )}

      {mode === 'learn' && (
        <div className="space-y-3">
          {COMPENSATIONS.map((c) => (
            <div key={c.id} className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-1">
              <span className="uppercase text-xs text-(--color-text-muted)">{c.view} view</span>
              <p className="font-medium">{c.compensation}</p>
              <p className="text-sm"><strong className="text-(--color-danger)">Overactive:</strong> {c.overactive.join(', ')}</p>
              <p className="text-sm"><strong className="text-(--color-accent)">Underactive:</strong> {c.underactive.join(', ')}</p>
              <p className="text-sm text-(--color-text-muted) italic">{c.logic}</p>
            </div>
          ))}
        </div>
      )}

      {mode === 'reverse' && <ReverseDrill />}
    </div>
  )
}

function ReverseDrill() {
  const [muscleIndex, setMuscleIndex] = useState(0)
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const underactiveMuscles = useMemo(() => {
    const set = new Set<string>()
    COMPENSATIONS.forEach((c) => c.underactive.forEach((m) => set.add(m)))
    return Array.from(set)
  }, [])

  const muscle = underactiveMuscles[muscleIndex % underactiveMuscles.length]
  const causedBy = COMPENSATIONS.filter((c) => c.underactive.includes(muscle))

  function check() {
    setSubmitted(true)
  }

  function next() {
    setMuscleIndex((i) => i + 1)
    setValue('')
    setSubmitted(false)
  }

  const gotIt = submitted && causedBy.some((c) => checkTypedAnswer(value, [c.compensation]).correct)

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <p className="font-medium">
          <strong>{muscle}</strong> is underactive. Name one overhead-squat compensation this could cause.
        </p>
        {!submitted && (
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && check()}
              placeholder="e.g. knees move inward…"
            />
            <button className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={check}>
              Check
            </button>
          </div>
        )}
        {submitted && (
          <div className="text-sm space-y-1">
            <p className={gotIt ? 'text-(--color-success)' : 'text-(--color-danger)'}>{gotIt ? '✓ Correct.' : '✗ Not quite.'}</p>
            <p className="text-(--color-text-muted)">Possible compensations: {causedBy.map((c) => c.compensation).join(', ')}</p>
          </div>
        )}
      </div>
      {submitted && (
        <button className="w-full rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={next}>
          Next muscle →
        </button>
      )}
    </div>
  )
}
