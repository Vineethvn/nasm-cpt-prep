import type { Item } from '../types/content'

const STORAGE_KEY = 'nasm-prep:v1'

export type LeitnerBox = 1 | 2 | 3 | 4 | 5

export type ItemProgress = {
  box: LeitnerBox
  dueAt: number // epoch ms
  lastSeen: number
  timesSeen: number
  timesWrong: number
}

export type MockExamAttempt = {
  id: string
  date: number
  scorePct: number
  byDomain: Record<string, { correct: number; total: number }>
}

export type Settings = {
  examDate: string | null // ISO date
  theme: 'light' | 'dark' | 'system'
}

export type StoreShape = {
  version: 1
  settings: Settings
  itemProgress: Record<string, ItemProgress>
  lessonsDone: Record<string, boolean>
  myQuestions: Item[]
  mockExams: MockExamAttempt[]
  streak: { current: number; longest: number; lastActiveDate: string | null }
}

function defaultStore(): StoreShape {
  return {
    version: 1,
    settings: { examDate: null, theme: 'system' },
    itemProgress: {},
    lessonsDone: {},
    myQuestions: [],
    mockExams: [],
    streak: { current: 0, longest: 0, lastActiveDate: null },
  }
}

let cache: StoreShape | null = null

function load(): StoreShape {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      cache = defaultStore()
      return cache
    }
    const parsed = JSON.parse(raw) as Partial<StoreShape>
    cache = { ...defaultStore(), ...parsed }
    return cache
  } catch {
    cache = defaultStore()
    return cache
  }
}

function save(store: StoreShape) {
  cache = store
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // localStorage unavailable (private mode, quota) - fail silently, state stays in-memory
  }
}

export function getStore(): StoreShape {
  return load()
}

export function updateStore(mutator: (store: StoreShape) => void) {
  const store = load()
  mutator(store)
  save(store)
  bumpStreak()
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function bumpStreak() {
  const store = load()
  const today = todayISO()
  if (store.streak.lastActiveDate === today) return
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (store.streak.lastActiveDate === yesterday) {
    store.streak.current += 1
  } else {
    store.streak.current = 1
  }
  store.streak.longest = Math.max(store.streak.longest, store.streak.current)
  store.streak.lastActiveDate = today
  save(store)
}

// --- Leitner spaced repetition ---
// Box interval in days: 1=same day (due immediately), 2=1d, 3=3d, 4=7d, 5=14d
const BOX_INTERVAL_DAYS: Record<LeitnerBox, number> = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 }

export function getItemProgress(itemId: string): ItemProgress {
  const store = load()
  return (
    store.itemProgress[itemId] ?? {
      box: 1,
      dueAt: Date.now(),
      lastSeen: 0,
      timesSeen: 0,
      timesWrong: 0,
    }
  )
}

export function recordAnswer(itemId: string, correct: boolean) {
  updateStore((store) => {
    const prev = store.itemProgress[itemId] ?? {
      box: 1 as LeitnerBox,
      dueAt: Date.now(),
      lastSeen: 0,
      timesSeen: 0,
      timesWrong: 0,
    }
    const nextBox: LeitnerBox = correct
      ? (Math.min(5, prev.box + 1) as LeitnerBox)
      : 1
    const intervalDays = BOX_INTERVAL_DAYS[nextBox]
    store.itemProgress[itemId] = {
      box: nextBox,
      dueAt: Date.now() + intervalDays * 86400000,
      lastSeen: Date.now(),
      timesSeen: prev.timesSeen + 1,
      timesWrong: prev.timesWrong + (correct ? 0 : 1),
    }
  })
}

export function isDue(itemId: string): boolean {
  const p = getItemProgress(itemId)
  return p.dueAt <= Date.now()
}

export function isWeak(itemId: string): boolean {
  return getItemProgress(itemId).box <= 2
}

// --- Lessons ---
export function markLessonDone(lessonId: string) {
  updateStore((store) => {
    store.lessonsDone[lessonId] = true
  })
}

export function isLessonDone(lessonId: string): boolean {
  return !!load().lessonsDone[lessonId]
}

// --- Settings ---
export function getSettings(): Settings {
  return load().settings
}

export function updateSettings(patch: Partial<Settings>) {
  updateStore((store) => {
    store.settings = { ...store.settings, ...patch }
  })
}

// --- My Questions ---
export function addMyQuestion(item: Item) {
  updateStore((store) => {
    store.myQuestions.push(item)
  })
}

export function removeMyQuestion(itemId: string) {
  updateStore((store) => {
    store.myQuestions = store.myQuestions.filter((q) => q.id !== itemId)
  })
}

// --- Mock exams ---
export function saveMockExamAttempt(attempt: MockExamAttempt) {
  updateStore((store) => {
    store.mockExams.push(attempt)
  })
}

// --- Export / Import / Reset ---
export function exportProgress(): string {
  return JSON.stringify(load(), null, 2)
}

export function importProgress(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as Partial<StoreShape>
    if (typeof parsed !== 'object' || parsed === null) throw new Error('Invalid file')
    const merged: StoreShape = { ...defaultStore(), ...parsed }
    save(merged)
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Could not parse file' }
  }
}

export function resetProgress() {
  save(defaultStore())
}
