import { useState } from 'react'
import { hrMax, karvonenTarget, zoneForPct, ZONES } from '../../content/trainers/hrZones'
import { checkTypedAnswer } from '../../lib/matching'

export function VTZoneLabPage() {
  const [age, setAge] = useState(35)
  const [restingHr, setRestingHr] = useState(65)
  const [pct, setPct] = useState(70)

  const max = hrMax(age)
  const target = karvonenTarget(age, restingHr, pct / 100)
  const zone = zoneForPct(pct / 100)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">VT & Zone Lab</h1>
      <p className="text-sm text-(--color-text-muted)">Adjust the sliders to see how age, resting heart rate, and intensity shape a client's cardio targets.</p>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-4">
        <SliderRow label={`Age: ${age}`} min={13} max={80} value={age} onChange={setAge} />
        <SliderRow label={`Resting HR: ${restingHr} bpm`} min={40} max={100} value={restingHr} onChange={setRestingHr} />
        <SliderRow label={`Intensity: ${pct}% (Karvonen)`} min={50} max={95} value={pct} onChange={setPct} />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Stat label="HRmax (220 − age)" value={`${max} bpm`} />
          <Stat label="Karvonen target HR" value={`${target} bpm`} />
          <Stat label="Zone" value={zone.label} />
          <Stat label="Talk test" value={zone.talkTest} />
          <Stat label="Dominant fuel" value={zone.fuel} />
          <Stat label="Training stage" value={zone.stage} />
        </div>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <h2 className="font-medium">Zones at a glance</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left border-b border-(--color-border) py-1">Zone</th>
              <th className="text-left border-b border-(--color-border) py-1">% HRmax</th>
              <th className="text-left border-b border-(--color-border) py-1">Talk test</th>
            </tr>
          </thead>
          <tbody>
            {ZONES.map((z) => (
              <tr key={z.zone}>
                <td className="py-1 border-b border-(--color-border)">{z.zone}</td>
                <td className="py-1 border-b border-(--color-border)">{Math.round(z.pctHrMaxRange[0] * 100)}–{Math.round(z.pctHrMaxRange[1] * 100)}%</td>
                <td className="py-1 border-b border-(--color-border)">{z.talkTest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DrillMode />
    </div>
  )
}

function SliderRow({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-(--color-accent)" />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-(--color-border)/30 p-2">
      <div className="text-xs text-(--color-text-muted)">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}

function randomScenario() {
  const age = 20 + Math.floor(Math.random() * 40)
  const restingHr = 55 + Math.floor(Math.random() * 20)
  const pct = [60, 65, 70, 75, 80][Math.floor(Math.random() * 5)]
  return { age, restingHr, pct, answer: karvonenTarget(age, restingHr, pct / 100) }
}

function DrillMode() {
  const [scenario, setScenario] = useState(randomScenario)
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const correct = submitted && checkTypedAnswer(value, [String(scenario.answer), String(scenario.answer - 1), String(scenario.answer + 1)]).correct

  function next() {
    setScenario(randomScenario())
    setValue('')
    setSubmitted(false)
  }

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
      <h2 className="font-medium">Drill mode</h2>
      <p className="text-sm">
        Client is {scenario.age}, resting HR {scenario.restingHr}, needs {scenario.pct}% via Karvonen. Type the target HR (bpm).
      </p>
      {!submitted ? (
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSubmitted(true)}
            placeholder="Target HR…"
          />
          <button className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={() => setSubmitted(true)}>
            Check
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className={correct ? 'text-(--color-success) text-sm' : 'text-(--color-danger) text-sm'}>
            {correct ? '✓ Correct!' : `✗ Correct answer: ${scenario.answer} bpm`} (±1 bpm accepted for rounding)
          </p>
          <button className="rounded-lg border border-(--color-border) px-4 py-2 text-sm" onClick={next}>
            New scenario
          </button>
        </div>
      )}
    </div>
  )
}
