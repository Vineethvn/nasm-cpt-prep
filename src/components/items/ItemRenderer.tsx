import type { Item } from '../../types/content'
import { TypeInAnswer } from './TypeInAnswer'
import { McqAnswer } from './McqAnswer'
import { MultiTypeInAnswer } from './MultiTypeInAnswer'
import { OrderAnswer } from './OrderAnswer'
import { MatchAnswer } from './MatchAnswer'
import { TableFillAnswer } from './TableFillAnswer'
import { ScenarioAnswer } from './ScenarioAnswer'

export function ItemRenderer({ item, onDone }: { item: Item; onDone?: (correct: boolean) => void }) {
  switch (item.kind) {
    case 'typein':
      return <TypeInAnswer item={item} onDone={onDone} />
    case 'mcq':
      return <McqAnswer item={item} onDone={onDone} />
    case 'multi-typein':
      return <MultiTypeInAnswer item={item} onDone={onDone} />
    case 'order':
      return <OrderAnswer item={item} onDone={onDone} />
    case 'match':
      return <MatchAnswer item={item} onDone={onDone} />
    case 'table-fill':
      return <TableFillAnswer item={item} onDone={onDone} />
    case 'scenario':
      return <ScenarioAnswer item={item} onDone={onDone} />
  }
}
