import { type TextAtom, TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { type MapStore } from '@Kernel/Store/MapStore'

export class TextBoxBlock extends Block {
  constructor(x: number, y: number) {
    super('TextBox', x, y, 500, 200)
    ;(this.store.get('props') as MapStore).set('text', new TextStore())
  }

  get text(): TextStore {
    return (this.store.get('props') as MapStore).get('text') as TextStore
  }

  insert(index: number, atom: TextAtom) {
    this.text.insert(index, atom)
  }

  delete(index: number, length: number) {
    this.text.delete(index, length)
  }
}
