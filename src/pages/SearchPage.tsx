import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildSearchIndex, search } from '../lib/search'

const KIND_LABEL: Record<string, string> = {
  lesson: 'Lesson',
  item: 'Practice item',
  'sample-paper': 'Sample Paper',
  'my-question': 'My Question',
}

export function SearchPage() {
  const [query, setQuery] = useState('')
  const index = useMemo(() => buildSearchIndex(), [])
  const results = useMemo(() => search(query, index), [query, index])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Search</h1>
      <input
        autoFocus
        className="w-full rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
        placeholder="Search lessons, questions, sample paper…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() && (
        <p className="text-xs text-(--color-text-muted)">{results.length} result{results.length === 1 ? '' : 's'}</p>
      )}

      <div className="space-y-2">
        {results.map((r) => (
          <Link
            key={`${r.kind}-${r.id}`}
            to={r.link}
            className="block rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 hover:border-(--color-accent)"
          >
            <div className="text-xs text-(--color-accent)">{KIND_LABEL[r.kind]}</div>
            <div className="font-medium text-sm">{r.title}</div>
            <div className="text-xs text-(--color-text-muted)">{r.snippet}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
