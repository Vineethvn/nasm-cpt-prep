import { useState } from 'react'
import { SAMPLE_PAPER } from '../content/samplePaper'
import { ItemRenderer } from '../components/items/ItemRenderer'
import { getItemProgress } from '../lib/storage'

export function SamplePaperPage() {
  const [index, setIndex] = useState(0)
  const item = SAMPLE_PAPER[index]
  const answeredCount = SAMPLE_PAPER.filter((it) => getItemProgress(it.id).timesSeen > 0).length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Sample Paper</h1>
        <p className="text-sm text-(--color-text-muted)">
          100 questions from your NASM sample paper, with full explanations. {answeredCount}/{SAMPLE_PAPER.length} answered so far.
        </p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <button
          disabled={index === 0}
          className="rounded-lg border border-(--color-border) px-3 py-1.5 disabled:opacity-40"
          onClick={() => setIndex((i) => i - 1)}
        >
          ← Prev
        </button>
        <span className="text-(--color-text-muted)">
          Question {index + 1} of {SAMPLE_PAPER.length}
        </span>
        <button
          disabled={index === SAMPLE_PAPER.length - 1}
          className="rounded-lg border border-(--color-border) px-3 py-1.5 disabled:opacity-40"
          onClick={() => setIndex((i) => i + 1)}
        >
          Next →
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={SAMPLE_PAPER.length - 1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="w-full accent-(--color-accent)"
        aria-label="Jump to question"
      />

      <ItemRenderer key={item.id} item={item} />
    </div>
  )
}
