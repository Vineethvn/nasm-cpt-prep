import { MODULES } from '../content'
import { SAMPLE_PAPER } from '../content/samplePaper'
import { getStore } from './storage'
import type { Item, Lesson } from '../types/content'

export type SearchResult = {
  id: string
  kind: 'lesson' | 'item' | 'sample-paper' | 'my-question'
  title: string
  snippet: string
  link: string
  searchText: string
}

function itemPromptText(item: unknown): string {
  if (typeof item !== 'object' || item === null) return ''
  const it = item as Record<string, unknown>
  if (typeof it.prompt === 'string') return it.prompt
  if (typeof it.title === 'string') return it.title
  if (typeof it.story === 'string') return `${it.story} ${it.question ?? ''}`
  return ''
}

/** Full searchable text for an item: prompt/story + explanation + any accepted answers/options. */
function itemSearchText(item: Item): string {
  const parts: string[] = [itemPromptText(item)]
  if ('explanation' in item) parts.push(item.explanation)
  if (item.kind === 'mcq') parts.push(...item.options)
  if (item.kind === 'scenario') parts.push(...item.options)
  if (item.kind === 'typein') parts.push(...item.accept)
  if (item.kind === 'multi-typein') parts.push(...item.expected.map((e) => e.canonical))
  return parts.filter(Boolean).join(' ')
}

function lessonSearchText(lesson: Lesson): string {
  return [lesson.title, lesson.plain, lesson.nasm, lesson.memoryHook ?? '', ...(lesson.mustMemorise ?? [])].join(' ')
}

export function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = []

  for (const m of MODULES) {
    for (const lesson of m.lessons) {
      results.push({
        id: lesson.id,
        kind: 'lesson',
        title: lesson.title,
        snippet: lesson.plain.slice(0, 140),
        link: `/modules/${m.id}`,
        searchText: lessonSearchText(lesson),
      })
    }
    for (const item of m.items) {
      results.push({
        id: item.id,
        kind: 'item',
        title: itemPromptText(item) || `Item in ${m.title}`,
        snippet: m.title,
        link: `/modules/${m.id}`,
        searchText: itemSearchText(item),
      })
    }
  }

  SAMPLE_PAPER.forEach((item, index) => {
    results.push({
      id: item.id,
      kind: 'sample-paper',
      title: item.prompt,
      snippet: `Sample Paper · Question ${index + 1}`,
      link: `/sample-paper?q=${index}`,
      searchText: itemSearchText(item),
    })
  })

  for (const item of getStore().myQuestions) {
    results.push({
      id: item.id,
      kind: 'my-question',
      title: itemPromptText(item) || 'My question',
      snippet: 'My Questions',
      link: '/my-questions',
      searchText: itemSearchText(item),
    })
  }

  return results
}

export function search(query: string, index: SearchResult[]): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return index.filter((r) => r.title.toLowerCase().includes(q) || r.searchText.toLowerCase().includes(q)).slice(0, 50)
}
