import { type TextAtom, TextStore } from '@Kernel/Store/TextStore'
import { ElementModel } from './_ElementModel'

export class TextBoxModel extends ElementModel {
  private _text: TextStore = new TextStore()

  constructor(x: number, y: number) {
    super('TextBox', x, y, 300, 100)
    this.set('text', this._text)
  }

  get text() {
    return this._text
  }

  insert(index: number, atom: TextAtom) {
    this._text.insert(index, atom)
  }
}
