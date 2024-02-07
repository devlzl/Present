import { Block } from '../Block/Block'
import { WORD_ART_DEFAULT_WIDTH, WORD_ART_DEFAULT_HEIGHT } from '@Const/block'

export class WordArtBlock extends Block {
  constructor(x: number, y: number, width: number = WORD_ART_DEFAULT_WIDTH, height: number = WORD_ART_DEFAULT_HEIGHT) {
    super('WordArt', x, y, width, height)
    this.props.set('text', 'WordArt')
  }

  get text() {
    return this.props.get('text') as string
  }

  set text(value: string) {
    this.props.set('text', value)
  }
}
