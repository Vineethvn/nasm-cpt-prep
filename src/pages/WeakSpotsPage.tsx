import { Link } from 'react-router-dom'
import { MODULES } from '../content'
import { getItemProgress } from '../lib/storage'

export function WeakSpotsPage() {
  const weakByModule = MODULES.map((m) => ({
    module: m,
    items: m.items.filter((it) => getItemProgress(it.id).box <= 2 && getItemProgress(it.id).timesSeen > 0),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Weak Spots</h1>
      <p className="text-sm text-(--color-text-muted)">Items you've gotten wrong recently, grouped by module (Leitner boxes 1–2).</p>

      {weakByModule.length === 0 && (
        <p className="text-sm text-(--color-text-muted)">No weak items yet — start practicing in Modules to build this list.</p>
      )}

      {weakByModule.map(({ module, items }) => (
        <div key={module.id} className="space-y-2">
          <Link to={`/modules/${module.id}`} className="font-medium hover:text-(--color-accent)">
            {module.title} ({items.length})
          </Link>
          <ul className="space-y-1">
            {items.map((it) => {
              const prompt = 'prompt' in it ? it.prompt : 'title' in it ? it.title : it.story
              return (
                <li key={it.id} className="text-sm rounded-lg border border-(--color-border) px-3 py-2 bg-(--color-surface)">
                  {prompt}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
