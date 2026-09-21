import { useEffect, useState } from 'react'
import { generateMockExam, scoreByDomain, type MockExamQuestion } from '../lib/mockExam'
import { DOMAINS, DOMAIN_MAP } from '../content/domains'
import { getStore, saveMockExamAttempt } from '../lib/storage'
import clsx from 'clsx'

const EXAM_MINUTES = 120
const IN_PROGRESS_KEY = 'nasm-prep:mock-exam-in-progress'

type InProgressExam = {
  questions: MockExamQuestion[]
  answers: Record<string, number>
  startedAt: number
}

function loadInProgress(): InProgressExam | null {
  try {
    const raw = sessionStorage.getItem(IN_PROGRESS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveInProgress(exam: InProgressExam | null) {
  try {
    if (exam) sessionStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(exam))
    else sessionStorage.removeItem(IN_PROGRESS_KEY)
  } catch {
    // sessionStorage unavailable — exam just won't survive a refresh
  }
}

type Phase = 'intro' | 'active' | 'review'

export function MockExamPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<MockExamQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [index, setIndex] = useState(0)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())
  const history = getStore().mockExams

  useEffect(() => {
    const existing = loadInProgress()
    if (existing) {
      setQuestions(existing.questions)
      setAnswers(existing.answers)
      setStartedAt(existing.startedAt)
      setPhase('active')
    }
  }, [])

  useEffect(() => {
    if (phase !== 'active') return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [phase])

  const elapsedMs = startedAt ? now - startedAt : 0
  const remainingMs = Math.max(0, EXAM_MINUTES * 60000 - elapsedMs)

  useEffect(() => {
    if (phase === 'active' && startedAt && remainingMs === 0) {
      finishExam()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingMs, phase])

  function startExam() {
    const q = generateMockExam(120)
    const start = Date.now()
    setQuestions(q)
    setAnswers({})
    setIndex(0)
    setStartedAt(start)
    setPhase('active')
    saveInProgress({ questions: q, answers: {}, startedAt: start })
  }

  function choose(itemId: string, optionIndex: number) {
    const next = { ...answers, [itemId]: optionIndex }
    setAnswers(next)
    saveInProgress({ questions, answers: next, startedAt: startedAt! })
  }

  function finishExam() {
    const byDomain = scoreByDomain(questions, answers)
    const totalCorrect = Object.values(byDomain).reduce((a, d) => a + d.correct, 0)
    const totalQuestions = questions.length
    saveMockExamAttempt({
      id: `exam-${Date.now()}`,
      date: Date.now(),
      scorePct: totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0,
      byDomain,
    })
    saveInProgress(null)
    setPhase('review')
  }

  function abandonExam() {
    saveInProgress(null)
    setPhase('intro')
  }

  const answeredCount = Object.keys(answers).length

  if (phase === 'intro') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Mock Exam</h1>
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
          <p className="text-sm">
            120 questions drawn proportionally by domain weight, 120-minute timer. No feedback is shown until you
            submit — then you get a full score breakdown by domain and a review of every question.
          </p>
          <p className="text-sm text-(--color-text-muted)">Scaled pass mark: 70%.</p>
          <button
            className="w-full rounded-lg bg-(--color-accent) px-4 py-3 text-(--color-accent-fg) font-medium"
            onClick={startExam}
          >
            Start mock exam
          </button>
        </div>

        {history.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-medium">Past attempts</h2>
            {[...history].reverse().map((h) => (
              <div key={h.id} className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 flex justify-between text-sm">
                <span>{new Date(h.date).toLocaleDateString()}</span>
                <span className={h.scorePct >= 70 ? 'text-(--color-success)' : 'text-(--color-danger)'}>
                  {Math.round(h.scorePct)}% {h.scorePct >= 70 ? '(pass)' : '(fail)'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (phase === 'active') {
    const q = questions[index]
    const mins = Math.floor(remainingMs / 60000)
    const secs = Math.floor((remainingMs % 60000) / 1000)
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Mock Exam</h1>
          <div className={clsx('font-mono text-sm', remainingMs < 5 * 60000 ? 'text-(--color-danger)' : 'text-(--color-text-muted)')}>
            {mins}:{secs.toString().padStart(2, '0')}
          </div>
        </div>

        <div className="text-xs text-(--color-text-muted)">
          Question {index + 1} of {questions.length} · {answeredCount} answered
        </div>

        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
          <p className="font-medium">{'story' in q.item ? q.item.story : null}</p>
          <p className="font-medium">{'story' in q.item ? q.item.question : q.item.prompt}</p>
          <div className="grid gap-2">
            {q.item.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(q.item.id, i)}
                className={clsx(
                  'text-left rounded-lg border px-3 py-2',
                  answers[q.item.id] === i ? 'border-(--color-accent) bg-(--color-accent)/10' : 'border-(--color-border)',
                )}
              >
                <span className="font-mono text-xs mr-2 text-(--color-text-muted)">{i + 1}</span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            disabled={index === 0}
            className="rounded-lg border border-(--color-border) px-4 py-2 text-sm disabled:opacity-40"
            onClick={() => setIndex((i) => i - 1)}
          >
            Prev
          </button>
          {index < questions.length - 1 ? (
            <button
              className="flex-1 rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium text-sm"
              onClick={() => setIndex((i) => i + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="flex-1 rounded-lg bg-(--color-success) px-4 py-2 text-white font-medium text-sm"
              onClick={finishExam}
            >
              Submit exam
            </button>
          )}
        </div>

        <details className="text-sm">
          <summary className="cursor-pointer text-(--color-accent)">Jump to question</summary>
          <div className="mt-2 grid grid-cols-8 sm:grid-cols-12 gap-1">
            {questions.map((qq, i) => (
              <button
                key={qq.item.id}
                onClick={() => setIndex(i)}
                className={clsx(
                  'rounded text-xs py-1',
                  answers[qq.item.id] !== undefined ? 'bg-(--color-accent)/20' : 'bg-(--color-border)/40',
                  i === index && 'ring-2 ring-(--color-accent)',
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </details>

        <button className="text-xs text-(--color-danger)" onClick={abandonExam}>
          Abandon exam (progress will be lost)
        </button>
      </div>
    )
  }

  // review
  const byDomain = scoreByDomain(questions, answers)
  const totalCorrect = Object.values(byDomain).reduce((a, d) => a + d.correct, 0)
  const scorePct = questions.length > 0 ? (totalCorrect / questions.length) * 100 : 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Exam Results</h1>
      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-center space-y-1">
        <div className={clsx('text-4xl font-semibold', scorePct >= 70 ? 'text-(--color-success)' : 'text-(--color-danger)')}>
          {Math.round(scorePct)}%
        </div>
        <div className="text-sm text-(--color-text-muted)">
          {totalCorrect} of {questions.length} correct · {scorePct >= 70 ? 'Pass' : 'Below 70% pass mark'}
        </div>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-2">
        <h2 className="font-medium">Score by domain</h2>
        {DOMAINS.map((d) => {
          const s = byDomain[d.id]
          if (!s || s.total === 0) return null
          const pct = (s.correct / s.total) * 100
          return (
            <div key={d.id} className="flex justify-between text-sm">
              <span>{d.title}</span>
              <span className={pct >= 70 ? 'text-(--color-success)' : 'text-(--color-danger)'}>
                {s.correct}/{s.total} ({Math.round(pct)}%)
              </span>
            </div>
          )
        })}
      </div>

      <div className="space-y-3">
        <h2 className="font-medium">Review every question</h2>
        {questions.map((q, i) => {
          const correct = answers[q.item.id] === q.item.answer
          const selected = answers[q.item.id]
          return (
            <div key={q.item.id} className="rounded-xl border border-(--color-border) bg-(--color-surface) p-3 space-y-1 text-sm">
              <p className="text-xs text-(--color-text-muted)">
                Q{i + 1} · {DOMAIN_MAP[q.domainId]?.title}
              </p>
              <p className="font-medium">{'story' in q.item ? q.item.question : q.item.prompt}</p>
              <p className={correct ? 'text-(--color-success)' : 'text-(--color-danger)'}>
                {correct ? '✓' : '✗'} Your answer: {selected !== undefined ? q.item.options[selected] : '(skipped)'}
                {!correct && <> — Correct: {q.item.options[q.item.answer]}</>}
              </p>
              <p className="text-(--color-text-muted)">{q.item.explanation}</p>
            </div>
          )
        })}
      </div>

      <button className="w-full rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium" onClick={() => setPhase('intro')}>
        Back to Mock Exam home
      </button>
    </div>
  )
}
