import { useState } from 'react'
import { updateSettings } from '../lib/storage'

export function Countdown({ examDate }: { examDate: string | null }) {
  const [editing, setEditing] = useState(!examDate)
  const [value, setValue] = useState(examDate ?? '')

  if (editing) {
    return (
      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <label className="text-sm font-medium block">When is your exam?</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
          />
          <button
            className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium"
            onClick={() => {
              if (!value) return
              updateSettings({ examDate: value })
              setEditing(false)
            }}
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  const days = Math.ceil((new Date(examDate!).getTime() - Date.now()) / 86400000)

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 flex items-center justify-between">
      <div>
        <div className="text-3xl font-semibold">{days >= 0 ? days : 0}</div>
        <div className="text-sm text-(--color-text-muted)">{days >= 0 ? 'days until your exam' : 'exam date has passed'}</div>
      </div>
      <button className="text-xs text-(--color-accent)" onClick={() => setEditing(true)}>
        Change date
      </button>
    </div>
  )
}
