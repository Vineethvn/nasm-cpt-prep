import { Link } from 'react-router-dom'
import { DOMAINS } from '../content/domains'
import { modulesForDomain } from '../content'
import { domainMastery } from '../lib/mastery'
import { ProgressBar } from '../components/ProgressBar'

export function ModuleListPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Modules</h1>
      {DOMAINS.map((domain) => {
        const modules = modulesForDomain(domain.id)
        return (
          <div key={domain.id} className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h2 className="font-medium">{domain.title}</h2>
              <span className="text-xs text-(--color-text-muted)">{Math.round(domain.examWeight * 100)}% of exam</span>
            </div>
            <ProgressBar pct={domainMastery(domain.id)} />
            {modules.length === 0 && (
              <p className="text-sm text-(--color-text-muted)">Coming in Milestone 2.</p>
            )}
            <ul className="space-y-2">
              {modules.map((m) => (
                <li key={m.id}>
                  <Link
                    to={`/modules/${m.id}`}
                    className="flex items-center justify-between rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 hover:border-(--color-accent)"
                  >
                    <span>{m.title}</span>
                    <span className="text-xs text-(--color-text-muted)">{m.estMinutes} min · {m.items.length} items</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
