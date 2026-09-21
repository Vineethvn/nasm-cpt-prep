export function ProgressBar({ pct, label }: { pct: number; label?: string }) {
  const clamped = Math.max(0, Math.min(100, pct))
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-xs text-(--color-text-muted)">
          <span>{label}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-(--color-border) overflow-hidden">
        <div className="h-full rounded-full bg-(--color-accent) transition-all" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
