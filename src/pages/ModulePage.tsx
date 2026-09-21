import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getModule } from '../content'
import { ItemRenderer } from '../components/items/ItemRenderer'
import { isLessonDone, markLessonDone } from '../lib/storage'
import { MarkdownLite } from '../components/MarkdownLite'
import clsx from 'clsx'

type Tab = 'learn' | 'typeit' | 'quiz'

export function ModulePage() {
  const { moduleId } = useParams()
  const mod = moduleId ? getModule(moduleId) : undefined
  const [tab, setTab] = useState<Tab>('learn')
  const [lessonIndex, setLessonIndex] = useState(0)
  const [showNasm, setShowNasm] = useState(false)

  if (!mod) return <Navigate to="/modules" replace />

  const typeItems = mod.items.filter((i) => i.kind !== 'mcq' && i.kind !== 'scenario')
  const quizItems = mod.items.filter((i) => i.kind === 'mcq' || i.kind === 'scenario')

  const lesson = mod.lessons[lessonIndex]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">{mod.title}</h1>
        <p className="text-sm text-(--color-text-muted)">{mod.estMinutes} min · {mod.items.length} practice items</p>
      </div>

      <div className="flex gap-1 rounded-lg border border-(--color-border) p-1">
        {(['learn', 'typeit', 'quiz'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'flex-1 rounded-md px-3 py-1.5 text-sm font-medium',
              tab === t ? 'bg-(--color-accent) text-(--color-accent-fg)' : 'text-(--color-text-muted)',
            )}
          >
            {t === 'learn' ? 'Learn' : t === 'typeit' ? 'Type it' : 'Quiz'}
          </button>
        ))}
      </div>

      {tab === 'learn' && lesson && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
            <span>Lesson {lessonIndex + 1} of {mod.lessons.length}</span>
            {isLessonDone(lesson.id) && <span className="text-(--color-success)">✓ done</span>}
          </div>
          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
            <h2 className="font-semibold text-lg">{lesson.title}</h2>
            <div>
              <p className="text-xs uppercase tracking-wide text-(--color-text-muted) mb-1">In plain terms</p>
              <MarkdownLite text={lesson.plain} className="whitespace-pre-line" />
            </div>
            <button className="text-xs text-(--color-accent)" onClick={() => setShowNasm((v) => !v)}>
              {showNasm ? 'Hide' : 'Show'} exact NASM wording
            </button>
            {showNasm && (
              <div className="rounded-lg bg-(--color-border)/30 p-3">
                <p className="text-xs uppercase tracking-wide text-(--color-text-muted) mb-1">NASM textbook wording</p>
                <MarkdownLite text={lesson.nasm} className="whitespace-pre-line" />
              </div>
            )}
            {lesson.memoryHook && (
              <p className="text-sm italic text-(--color-accent)">💡 {lesson.memoryHook}</p>
            )}
            {lesson.table && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse min-w-[480px]">
                  <thead>
                    <tr>
                      {lesson.table.headers.map((h) => (
                        <th key={h} className="text-left border-b border-(--color-border) py-1 pr-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="py-1 pr-2 border-b border-(--color-border)">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {lesson.mustMemorise && lesson.mustMemorise.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wide text-(--color-text-muted) mb-1">Must memorise</p>
                <ul className="list-disc list-inside text-sm space-y-0.5">
                  {lesson.mustMemorise.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              disabled={lessonIndex === 0}
              className="rounded-lg border border-(--color-border) px-4 py-2 text-sm disabled:opacity-40"
              onClick={() => setLessonIndex((i) => i - 1)}
            >
              Back
            </button>
            <button
              className="flex-1 rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium text-sm"
              onClick={() => {
                markLessonDone(lesson.id)
                setShowNasm(false)
                if (lessonIndex < mod.lessons.length - 1) setLessonIndex((i) => i + 1)
                else setTab('typeit')
              }}
            >
              {lessonIndex < mod.lessons.length - 1 ? "Got it — next lesson" : 'Got it — start Type it'}
            </button>
          </div>
        </div>
      )}

      {tab === 'typeit' && (
        <div className="space-y-4">
          {typeItems.length === 0 && <p className="text-sm text-(--color-text-muted)">No typed items yet.</p>}
          {typeItems.map((item) => (
            <ItemRenderer key={item.id} item={item} />
          ))}
        </div>
      )}

      {tab === 'quiz' && (
        <div className="space-y-4">
          {quizItems.length === 0 && <p className="text-sm text-(--color-text-muted)">No quiz items yet.</p>}
          {quizItems.map((item) => (
            <ItemRenderer key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
