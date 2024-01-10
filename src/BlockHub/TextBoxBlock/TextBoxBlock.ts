import { TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { type MapStore } from '@Kernel/Store/MapStore'
import { RichTextController } from '@RichText/RichText'
import { TEXT_BOX_DEFAULT_HEIGHT, TEXT_BOX_DEFAULT_WIDTH } from '@Const/block'

export class TextBoxBlock extends Block {
  constructor(x: number, y: number, width: number = TEXT_BOX_DEFAULT_WIDTH, height: number = TEXT_BOX_DEFAULT_HEIGHT) {
    super('TextBox', x, y, width, height)
    ;(this.store.get('props') as MapStore).set('text', new TextStore())
  }

  get textStore(): TextStore {
    return (this.store.get('props') as MapStore).get('text') as TextStore
  }

  bindController = (controller: RichTextController) => {
    this.controllerMap[this.id] = controller
  }

  getController() {
    return this.controllerMap[this.id]
  }
}
