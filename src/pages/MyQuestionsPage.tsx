import { useState } from 'react'
import type { Item, McqItem, TypeInItem } from '../types/content'
import { getStore, addMyQuestion, removeMyQuestion } from '../lib/storage'
import { ItemRenderer } from '../components/items/ItemRenderer'

function makeId() {
  return `my-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

export function MyQuestionsPage() {
  const [myQuestions, setMyQuestions] = useState<Item[]>(() => getStore().myQuestions)
  const [kind, setKind] = useState<'mcq' | 'typein'>('mcq')

  function refresh() {
    setMyQuestions([...getStore().myQuestions])
  }

  function handleAddMcq(form: { prompt: string; options: string[]; answer: number; explanation: string }) {
    const item: McqItem = {
      kind: 'mcq',
      id: makeId(),
      prompt: form.prompt,
      options: form.options,
      answer: form.answer,
      explanation: form.explanation,
      whyWrong: form.options.map((_, i) => (i === form.answer ? '' : '')),
      source: 'original',
      tags: ['my-questions'],
    }
    addMyQuestion(item)
    refresh()
  }

  function handleAddTypeIn(form: { prompt: string; accept: string[]; explanation: string }) {
    const item: TypeInItem = {
      kind: 'typein',
      id: makeId(),
      prompt: form.prompt,
      accept: form.accept,
      hints: [],
      explanation: form.explanation,
      tags: ['my-questions'],
    }
    addMyQuestion(item)
    refresh()
  }

  function handleDelete(id: string) {
    removeMyQuestion(id)
    refresh()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Questions</h1>
        <p className="text-sm text-(--color-text-muted)">
          Write your own practice questions. They're saved locally, included in exports, and reviewed with spaced
          repetition just like everything else.
        </p>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 space-y-3">
        <div className="flex gap-1 rounded-lg border border-(--color-border) p-1 w-fit">
          {(['mcq', 'typein'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={
                'rounded-md px-3 py-1.5 text-sm font-medium ' +
                (kind === k ? 'bg-(--color-accent) text-(--color-accent-fg)' : 'text-(--color-text-muted)')
              }
            >
              {k === 'mcq' ? 'Multiple choice' : 'Type-in'}
            </button>
          ))}
        </div>
        {kind === 'mcq' ? <McqForm onAdd={handleAddMcq} /> : <TypeInForm onAdd={handleAddTypeIn} />}
      </div>

      <div className="space-y-3">
        <h2 className="font-medium">Your questions ({myQuestions.length})</h2>
        {myQuestions.length === 0 && <p className="text-sm text-(--color-text-muted)">Nothing added yet.</p>}
        {myQuestions.map((item) => (
          <div key={item.id} className="space-y-1">
            <ItemRenderer item={item} />
            <button className="text-xs text-(--color-danger)" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function McqForm({ onAdd }: { onAdd: (form: { prompt: string; options: string[]; answer: number; explanation: string }) => void }) {
  const [prompt, setPrompt] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [answer, setAnswer] = useState(0)
  const [explanation, setExplanation] = useState('')

  const valid = prompt.trim() && options.every((o) => o.trim()) && explanation.trim()

  function submit() {
    if (!valid) return
    onAdd({ prompt, options, answer, explanation })
    setPrompt('')
    setOptions(['', '', '', ''])
    setAnswer(0)
    setExplanation('')
  }

  return (
    <div className="space-y-2">
      <input
        className="w-full rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
        placeholder="Question prompt…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="radio"
            name="my-mcq-answer"
            checked={answer === i}
            onChange={() => setAnswer(i)}
            aria-label={`Mark option ${i + 1} as correct`}
          />
          <input
            className="flex-1 rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
            placeholder={`Option ${i + 1}${answer === i ? ' (correct)' : ''}`}
            value={opt}
            onChange={(e) => {
              const next = [...options]
              next[i] = e.target.value
              setOptions(next)
            }}
          />
        </div>
      ))}
      <textarea
        className="w-full rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
        placeholder="Explanation…"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <button
        disabled={!valid}
        className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium disabled:opacity-50"
        onClick={submit}
      >
        Add question
      </button>
    </div>
  )
}

function TypeInForm({ onAdd }: { onAdd: (form: { prompt: string; accept: string[]; explanation: string }) => void }) {
  const [prompt, setPrompt] = useState('')
  const [accept, setAccept] = useState('')
  const [explanation, setExplanation] = useState('')

  const acceptList = accept.split(',').map((s) => s.trim()).filter(Boolean)
  const valid = prompt.trim() && acceptList.length > 0 && explanation.trim()

  function submit() {
    if (!valid) return
    onAdd({ prompt, accept: acceptList, explanation })
    setPrompt('')
    setAccept('')
    setExplanation('')
  }

  return (
    <div className="space-y-2">
      <input
        className="w-full rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
        placeholder="Question prompt…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <input
        className="w-full rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
        placeholder="Accepted answers, comma-separated…"
        value={accept}
        onChange={(e) => setAccept(e.target.value)}
      />
      <textarea
        className="w-full rounded-lg border border-(--color-border) bg-transparent px-3 py-2"
        placeholder="Explanation…"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <button
        disabled={!valid}
        className="rounded-lg bg-(--color-accent) px-4 py-2 text-(--color-accent-fg) font-medium disabled:opacity-50"
        onClick={submit}
      >
        Add question
      </button>
    </div>
  )
}
