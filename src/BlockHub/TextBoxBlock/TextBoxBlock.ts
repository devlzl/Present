import { TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { type MapStore } from '@Kernel/Store/MapStore'
import { RichTextController } from '@RichText/RichText'

export class TextBoxBlock extends Block {
  _controller?: RichTextController

  constructor(x: number, y: number) {
    super('TextBox', x, y, 500, 200)
    ;(this.store.get('props') as MapStore).set('text', new TextStore())
  }

  get textStore(): TextStore {
    return (this.store.get('props') as MapStore).get('text') as TextStore
  }

  get controller() {
    return this._controller
  }

  bindController = (controller: RichTextController) => {
    this._controller = controller
  }
}
