import { useState } from 'react'
import type { TypeInItem } from '../../types/content'
import { checkTypedAnswer, firstLetterHint } from '../../lib/matching'
import { recordAnswer } from '../../lib/storage'

export function TypeInAnswer({ item, onDone }: { item: TypeInItem; onDone?: (correct: boolean) => void }) {
  const [value, setValue] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [fuzzy, setFuzzy] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [locked, setLocked] = useState(false)

  function submit() {
    if (locked) return
    const result = checkTypedAnswer(value, item.accept)
    if (result.correct) {
      setStatus('correct')
      setFuzzy(result.fuzzy)
      setLocked(true)
      recordAnswer(item.id, true)
      onDone?.(true)
    } else {
      const nextAttempts = attempts + 1
      setAttempts(nextAttempts)
      setStatus('wrong')
      if (nextAttempts >= 3) {
        setRevealed(true)
        setLocked(true)
        recordAnswer(item.id, false)
        onDone?.(false)
      }
    }
  }

  const hintText =
    attempts === 1 ? item.hints[0] : attempts >= 2 ? item.hints[1] ?? firstLetterHint(item.accept[0]) : null

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <p className="font-medium">{item.prompt}</p>
      {!locked && (
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2 outline-none focus-visible:border-(--color-accent)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Type your answer…"
            autoComplete="off"
          />
          <button
            className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium"
            onClick={submit}
          >
            Check
          </button>
        </div>
      )}
      {status === 'wrong' && !revealed && (
        <p className="text-(--color-danger) text-sm">✗ Not quite. {hintText}</p>
      )}
      {status === 'correct' && (
        <p className="text-(--color-success) text-sm">✓ Correct{fuzzy ? ' (close spelling accepted)' : ''}! {item.explanation}</p>
      )}
      {revealed && (
        <div className="text-sm space-y-1">
          <p className="text-(--color-danger)">✗ Correct answer: <strong>{item.accept[0]}</strong></p>
          <p className="text-(--color-text-muted)">{item.explanation}</p>
        </div>
      )}
    </div>
  )
}
