import { useMemo, useState } from 'react'
import { buildNumbersVault } from '../../lib/numbersVault'
import { checkTypedAnswer } from '../../lib/matching'
import { recordAnswer } from '../../lib/storage'

export function NumbersVaultPage() {
  const { flashcards, flipFacts } = useMemo(() => buildNumbersVault(), [])
  const [order] = useState(() => shuffleIndices(flashcards.length))
  const [pos, setPos] = useState(0)
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showFlip, setShowFlip] = useState(false)

  const card = flashcards[order[pos % order.length]]
  const correct = submitted && card && checkTypedAnswer(value, card.accept).correct

  function check() {
    if (!card || submitted) return
    setSubmitted(true)
    recordAnswer(card.id, checkTypedAnswer(value, card.accept).correct)
  }

  function next() {
    setPos((p) => p + 1)
    setValue('')
    setSubmitted(false)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Numbers Vault</h1>
      <p className="text-sm text-(--color-text-muted)">
        Rapid-fire flashcards auto-built from every "must memorise" fact across the app. {flashcards.length} numeric cards, {flipFacts.length} extra facts.
      </p>

      {card ? (
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
          <p className="text-xs text-(--color-text-muted)">{card.moduleTitle} · card {pos + 1}</p>
          <p className="text-lg font-medium">{card.prompt}</p>
          {!submitted ? (
            <div className="flex gap-2">
              <input
                autoFocus
                className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && check()}
                placeholder="Type your answer…"
              />
              <button className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={check}>
                Check
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className={correct ? 'text-(--color-success) text-sm' : 'text-(--color-danger) text-sm'}>
                {correct ? '✓ Correct!' : `✗ ${card.fullFact}`}
              </p>
              <button className="w-full rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={next}>
                Next card →
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-(--color-text-muted)">No numeric facts yet — add more lessons with mustMemorise entries.</p>
      )}

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
        <button className="text-sm text-(--color-accent)" onClick={() => setShowFlip((v) => !v)}>
          {showFlip ? 'Hide' : 'Show'} other must-memorise facts ({flipFacts.length})
        </button>
        {showFlip && (
          <ul className="mt-3 space-y-1 text-sm">
            {flipFacts.map((f) => (
              <li key={f.id} className="text-(--color-text-muted)">
                <span className="text-(--color-text)">{f.fact}</span> — {f.moduleTitle}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
