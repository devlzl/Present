import { TextAtom, TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { MapStore } from '@Kernel/Store/MapStore'

export class TextBoxBlock extends Block {
  constructor(x: number, y: number) {
    super('TextBox', x, y, 300, 100)
    ;(this.store.get('props') as MapStore).set('text', new TextStore())
  }

  get text(): TextStore {
    return (this.store.get('props') as MapStore).get('text') as TextStore
  }

  insert(index: number, atom: TextAtom) {
    this.text.insert(index, atom)
  }
}
