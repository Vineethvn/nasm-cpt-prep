import { useState } from 'react'
import { STAGES, STAGE_SCENARIOS, type Stage } from '../../content/trainers/stagesOfChangeData'
import clsx from 'clsx'

export function StagesOfChangePage() {
  const [index, setIndex] = useState(0)
  const [stagePicked, setStagePicked] = useState<Stage | null>(null)
  const [responsePicked, setResponsePicked] = useState<number | null>(null)

  const scenario = STAGE_SCENARIOS[index]
  const stageCorrect = stagePicked === scenario.correctStage

  function next() {
    setIndex((i) => (i + 1) % STAGE_SCENARIOS.length)
    setStagePicked(null)
    setResponsePicked(null)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Stages of Change Game</h1>
      <p className="text-sm text-(--color-text-muted)">Read the client quote, pick the stage, then pick the best trainer response.</p>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <p className="italic text-lg">{scenario.quote}</p>

        <div>
          <p className="text-sm font-medium mb-2">Which stage is this?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STAGES.map((s) => {
              const isPicked = stagePicked === s.stage
              const show = stagePicked !== null
              const isRight = s.stage === scenario.correctStage
              return (
                <button
                  key={s.stage}
                  disabled={stagePicked !== null}
                  onClick={() => setStagePicked(s.stage)}
                  className={clsx(
                    'text-left rounded-lg border px-3 py-2 text-sm',
                    !show && 'border-(--color-border) hover:border-(--color-accent)',
                    show && isRight && 'border-(--color-success) bg-(--color-success)/10',
                    show && isPicked && !isRight && 'border-(--color-danger) bg-(--color-danger)/10',
                    show && !isRight && !isPicked && 'border-(--color-border) opacity-60',
                  )}
                >
                  <div className="font-medium">{s.stage}</div>
                  <div className="text-xs text-(--color-text-muted)">{s.definition}</div>
                </button>
              )
            })}
          </div>
        </div>

        {stagePicked && (
          <div>
            <p className="text-sm font-medium mb-2">
              {stageCorrect ? '✓ Correct stage. ' : `✗ This is actually ${scenario.correctStage}. `}
              Now pick the best trainer response:
            </p>
            <div className="space-y-2">
              {scenario.responseOptions.map((opt, i) => {
                const show = responsePicked !== null
                const isRight = i === scenario.bestResponseIndex
                const isPicked = i === responsePicked
                return (
                  <button
                    key={i}
                    disabled={responsePicked !== null}
                    onClick={() => setResponsePicked(i)}
                    className={clsx(
                      'w-full text-left rounded-lg border px-3 py-2 text-sm',
                      !show && 'border-(--color-border) hover:border-(--color-accent)',
                      show && isRight && 'border-(--color-success) bg-(--color-success)/10',
                      show && isPicked && !isRight && 'border-(--color-danger) bg-(--color-danger)/10',
                      show && !isRight && !isPicked && 'border-(--color-border) opacity-60',
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {responsePicked !== null && (
          <button className="w-full rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={next}>
            Next scenario →
          </button>
        )}
      </div>
    </div>
  )
}
