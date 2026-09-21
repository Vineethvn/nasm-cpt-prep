import { Link } from 'react-router-dom'
import { MODULES } from '../content'
import { SAMPLE_PAPER } from '../content/samplePaper'
import { getItemProgress, getStore } from '../lib/storage'

function promptOf(it: { prompt?: string; title?: string; story?: string }) {
  return it.prompt ?? it.title ?? it.story ?? ''
}

export function WeakSpotsPage() {
  const isWeak = (id: string) => getItemProgress(id).box <= 2 && getItemProgress(id).timesSeen > 0

  const weakByModule = MODULES.map((m) => ({
    title: m.title,
    link: `/modules/${m.id}`,
    items: m.items.filter((it) => isWeak(it.id)),
  })).filter((g) => g.items.length > 0)

  const weakSamplePaper = SAMPLE_PAPER.filter((it) => isWeak(it.id))
  const weakMyQuestions = getStore().myQuestions.filter((it) => isWeak(it.id))

  const groups = [
    ...weakByModule,
    ...(weakSamplePaper.length > 0 ? [{ title: 'Sample Paper', link: '/sample-paper', items: weakSamplePaper }] : []),
    ...(weakMyQuestions.length > 0 ? [{ title: 'My Questions', link: '/my-questions', items: weakMyQuestions }] : []),
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Weak Spots</h1>
      <p className="text-sm text-(--color-text-muted)">Items you've gotten wrong recently, grouped by source (Leitner boxes 1–2).</p>

      {groups.length === 0 && (
        <p className="text-sm text-(--color-text-muted)">No weak items yet — start practicing in Modules to build this list.</p>
      )}

      {groups.map((g) => (
        <div key={g.title} className="space-y-2">
          <Link to={g.link} className="font-medium hover:text-(--color-accent)">
            {g.title} ({g.items.length})
          </Link>
          <ul className="space-y-1">
            {g.items.map((it) => (
              <li key={it.id} className="text-sm rounded-lg border border-(--color-border) px-3 py-2 bg-(--color-surface)">
                {promptOf(it)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
