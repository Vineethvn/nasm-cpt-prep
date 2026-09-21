import { useRef, useState } from 'react'
import { exportProgress, importProgress, resetProgress, getSettings, updateSettings } from '../lib/storage'
import { useTheme } from '../lib/theme'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [examDate, setExamDate] = useState(getSettings().examDate ?? '')
  const [importMsg, setImportMsg] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function download() {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nasm-prep-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = importProgress(String(reader.result))
      setImportMsg(result.ok ? 'Progress imported successfully.' : `Import failed: ${result.error}`)
      if (result.ok) window.location.reload()
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <label className="text-sm font-medium block">Exam date</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
          />
          <button
            className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium"
            onClick={() => updateSettings({ examDate: examDate || null })}
          >
            Save
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <label className="text-sm font-medium block">Theme</label>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={
                'flex-1 rounded-lg border px-3 py-2 text-sm capitalize ' +
                (theme === t ? 'border-(--color-accent) text-(--color-accent)' : 'border-(--color-border)')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <label className="text-sm font-medium block">Progress data</label>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-(--color-border) px-4 py-2 text-sm" onClick={download}>
            Export progress
          </button>
          <button className="rounded-lg border border-(--color-border) px-4 py-2 text-sm" onClick={() => fileRef.current?.click()}>
            Import progress
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </div>
        {importMsg && <p className="text-sm text-(--color-text-muted)">{importMsg}</p>}

        <div className="pt-2 border-t border-(--color-border)">
          {!confirmReset ? (
            <button className="text-sm text-(--color-danger)" onClick={() => setConfirmReset(true)}>
              Reset all progress
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm">Are you sure? This can't be undone.</span>
              <button
                className="rounded-lg bg-(--color-danger) px-3 py-1 text-white text-sm"
                onClick={() => {
                  resetProgress()
                  window.location.reload()
                }}
              >
                Yes, reset
              </button>
              <button className="text-sm text-(--color-text-muted)" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
