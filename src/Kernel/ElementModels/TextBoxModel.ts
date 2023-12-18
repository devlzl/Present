import { TextStore } from '@Kernel/Store/TextStore'
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

  insert(index: number, text: string) {
    this._text.insert(index, text)
  }
}
