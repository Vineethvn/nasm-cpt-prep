import { Link } from 'react-router-dom'

const TRAINERS = [
  { to: '/trainers/muscle-imbalance', title: 'Muscle Imbalance Trainer', desc: 'Overhead squat compensations — overactive vs. underactive muscles.' },
  { to: '/trainers/acute-variables', title: 'Acute Variables Grid', desc: 'Fill in reps/sets/intensity/rest for each OPT phase.' },
  { to: '/trainers/vt-zone-lab', title: 'VT & Zone Lab', desc: 'Interactive heart-rate zone calculator + drill mode.' },
  { to: '/trainers/stages-of-change', title: 'Stages of Change Game', desc: 'Pick the stage, then the best trainer response.' },
  { to: '/trainers/communication-sorter', title: 'Communication Sorter', desc: 'Classify lines using OARS and motivational interviewing.' },
  { to: '/trainers/numbers-vault', title: 'Numbers Vault', desc: 'Rapid-fire flashcards for every number in the syllabus.' },
]

export function TrainersHubPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Trainers</h1>
      <p className="text-sm text-(--color-text-muted)">Interactive drills for the trickiest, most exam-heavy topics.</p>
      <div className="grid gap-3">
        {TRAINERS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 hover:border-(--color-accent)"
          >
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-(--color-text-muted)">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
