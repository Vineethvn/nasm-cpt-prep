import { useState } from 'react'
import type { TableFillItem } from '../../types/content'
import { checkTypedAnswer } from '../../lib/matching'
import { recordAnswer } from '../../lib/storage'

export function TableFillAnswer({ item, onDone }: { item: TableFillItem; onDone?: (correct: boolean) => void }) {
  const blankPositions: [number, number][] = []
  item.rows.forEach((row, r) => row.cells.forEach((c, ci) => typeof c !== 'string' && blankPositions.push([r, ci])))

  const [values, setValues] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function key(r: number, c: number) {
    return `${r}-${c}`
  }

  function results(): Record<string, boolean> {
    const res: Record<string, boolean> = {}
    for (const [r, c] of blankPositions) {
      const cell = item.rows[r].cells[c]
      if (typeof cell === 'string') continue
      res[key(r, c)] = checkTypedAnswer(values[key(r, c)] ?? '', cell.accept).correct
    }
    return res
  }

  function submit() {
    setSubmitted(true)
    const res = results()
    const allCorrect = Object.values(res).every(Boolean)
    recordAnswer(item.id, allCorrect)
    onDone?.(allCorrect)
  }

  const res = submitted ? results() : {}

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3 overflow-x-auto">
      <p className="font-medium">{item.title}</p>
      <table className="w-full text-sm border-collapse min-w-[560px]">
        <thead>
          <tr>
            {item.headers.map((h) => (
              <th key={h} className="text-left border-b border-(--color-border) py-1 pr-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {item.rows.map((row, r) => (
            <tr key={r}>
              {row.cells.map((cell, c) => {
                if (typeof cell === 'string') {
                  return <td key={c} className="py-1 pr-2 border-b border-(--color-border)">{cell}</td>
                }
                const k = key(r, c)
                const isCorrect = res[k]
                return (
                  <td key={c} className="py-1 pr-2 border-b border-(--color-border)">
                    <input
                      disabled={submitted}
                      value={values[k] ?? ''}
                      onChange={(e) => setValues((prev) => ({ ...prev, [k]: e.target.value }))}
                      className={
                        'w-24 rounded border px-2 py-1 bg-transparent ' +
                        (submitted
                          ? isCorrect
                            ? 'border-(--color-success)'
                            : 'border-(--color-danger)'
                          : 'border-(--color-border)')
                      }
                    />
                    {submitted && !isCorrect && (
                      <div className="text-xs text-(--color-text-muted)">= {cell.accept[0]}</div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {!submitted && (
        <button className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={submit}>
          Check table
        </button>
      )}
    </div>
  )
}
