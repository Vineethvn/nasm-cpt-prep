export type Domain = {
  id: string
  title: string
  examWeight: number
  modules: string[]
}

export type Lesson = {
  id: string
  title: string
  plain: string
  nasm: string
  memoryHook?: string
  mustMemorise?: string[]
  table?: { headers: string[]; rows: string[][] }
}

export type McqItem = {
  kind: 'mcq'
  id: string
  prompt: string
  options: string[]
  answer: number
  explanation: string
  whyWrong: string[]
  source?: 'sample-pdf' | 'original'
  tags: string[]
}

export type TypeInItem = {
  kind: 'typein'
  id: string
  prompt: string
  accept: string[]
  hints: string[]
  explanation: string
  tags: string[]
}

export type MultiTypeInItem = {
  kind: 'multi-typein'
  id: string
  prompt: string
  expected: { canonical: string; accept: string[] }[]
  minToPass: number
  explanation: string
  tags: string[]
}

export type TableFillItem = {
  kind: 'table-fill'
  id: string
  title: string
  headers: string[]
  rows: { cells: (string | { blank: true; accept: string[] })[] }[]
  tags: string[]
}

export type OrderItem = {
  kind: 'order'
  id: string
  prompt: string
  correctOrder: string[]
  explanation: string
  tags: string[]
}

export type MatchItem = {
  kind: 'match'
  id: string
  prompt: string
  pairs: [string, string][]
  explanation: string
  tags: string[]
}

export type ScenarioItem = {
  kind: 'scenario'
  id: string
  story: string
  question: string
  options: string[]
  answer: number
  explanation: string
  tags: string[]
}

export type Item =
  | McqItem
  | TypeInItem
  | MultiTypeInItem
  | TableFillItem
  | OrderItem
  | MatchItem
  | ScenarioItem

export type Module = {
  id: string
  domainId: string
  title: string
  estMinutes: number
  lessons: Lesson[]
  items: Item[]
}
