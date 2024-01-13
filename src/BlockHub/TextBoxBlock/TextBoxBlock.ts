import { TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { type MapStore } from '@Kernel/Store/MapStore'
import { RichTextController } from '@RichText/RichText'
import { TEXT_BOX_DEFAULT_HEIGHT, TEXT_BOX_DEFAULT_WIDTH } from '@Const/block'

export type AlignType = 'left' | 'right' | 'center'

export class TextBoxBlock extends Block {
  constructor(
    x: number,
    y: number,
    width: number = TEXT_BOX_DEFAULT_WIDTH,
    height: number = TEXT_BOX_DEFAULT_HEIGHT,
    align: AlignType = 'left'
  ) {
    super('TextBox', x, y, width, height)
    this.props.set('text', new TextStore())
    this.props.set('align', align)
  }

  get textStore(): TextStore {
    return (this.store.get('props') as MapStore).get('text') as TextStore
  }

  get align() {
    return this.props.get('align') as AlignType
  }

  set align(value: AlignType) {
    this.props.set('align', value)
  }

  bindController = (controller: RichTextController) => {
    this.controllerMap[this.id] = controller
  }

  getController() {
    return this.controllerMap[this.id]
  }
}
