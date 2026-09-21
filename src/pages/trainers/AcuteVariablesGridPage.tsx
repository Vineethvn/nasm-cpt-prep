import { MODULES } from '../../content'
import { ItemRenderer } from '../../components/items/ItemRenderer'
import { CORE_BALANCE_TABLE, PLYOMETRIC_TABLE, TEMPO_EXPLAINER } from '../../content/trainers/acuteVariablesData'

const avModule = MODULES.find((m) => m.id === 'd3-acute-variables')!
const gridItem = avModule.items.find((it) => it.id === 'av-tf1')!

export function AcuteVariablesGridPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Acute Variables Grid</h1>
      <p className="text-sm text-(--color-text-muted)">{TEMPO_EXPLAINER}</p>

      <ItemRenderer item={gridItem} />

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <h2 className="font-medium">Core & balance training</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left border-b border-(--color-border) py-1">Category</th>
              <th className="text-left border-b border-(--color-border) py-1">Reps</th>
              <th className="text-left border-b border-(--color-border) py-1">Sets</th>
              <th className="text-left border-b border-(--color-border) py-1">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {CORE_BALANCE_TABLE.map((r) => (
              <tr key={r.category}>
                <td className="py-1 border-b border-(--color-border)">{r.category}</td>
                <td className="py-1 border-b border-(--color-border)">{r.reps}</td>
                <td className="py-1 border-b border-(--color-border)">{r.sets}</td>
                <td className="py-1 border-b border-(--color-border)">{r.tempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <h2 className="font-medium">Plyometric training</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left border-b border-(--color-border) py-1">Category</th>
              <th className="text-left border-b border-(--color-border) py-1">Reps</th>
              <th className="text-left border-b border-(--color-border) py-1">Sets</th>
              <th className="text-left border-b border-(--color-border) py-1">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {PLYOMETRIC_TABLE.map((r) => (
              <tr key={r.category}>
                <td className="py-1 border-b border-(--color-border)">{r.category}</td>
                <td className="py-1 border-b border-(--color-border)">{r.reps}</td>
                <td className="py-1 border-b border-(--color-border)">{r.sets}</td>
                <td className="py-1 border-b border-(--color-border)">{r.tempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
