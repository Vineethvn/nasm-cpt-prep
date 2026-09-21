import { Link } from 'react-router-dom'
import { Countdown } from '../components/Countdown'
import { ProgressBar } from '../components/ProgressBar'
import { DOMAINS } from '../content/domains'
import { getModule } from '../content'
import { domainMastery, overallReadiness, todaysPlan } from '../lib/mastery'
import { getSettings } from '../lib/storage'

export function Dashboard() {
  const settings = getSettings()
  const readiness = overallReadiness()
  const plan = todaysPlan()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Countdown examDate={settings.examDate} />

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <ProgressBar pct={readiness} label="Overall readiness" />
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <h2 className="font-medium">Mastery by domain</h2>
        {DOMAINS.map((d) => (
          <ProgressBar key={d.id} pct={domainMastery(d.id)} label={`${d.title} (${Math.round(d.examWeight * 100)}% of exam)`} />
        ))}
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <h2 className="font-medium">Today's plan</h2>
        {plan.length === 0 && <p className="text-sm text-(--color-text-muted)">Nothing due — nice work. Explore Modules to keep going.</p>}
        <ul className="space-y-2">
          {plan.map((entry, i) => {
            const mod = getModule(entry.moduleId)
            return (
              <li key={i}>
                <Link
                  to={`/modules/${entry.moduleId}`}
                  className="flex items-center justify-between rounded-lg border border-(--color-border) px-3 py-2 text-sm hover:border-(--color-accent)"
                >
                  <span>{entry.label}</span>
                  <span className="text-(--color-text-muted)">{mod?.estMinutes} min →</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
