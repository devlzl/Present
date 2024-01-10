import { Block } from '../Block/Block'

export class PictureBlock extends Block {
  constructor(x: number, y: number) {
    super('Picture', x, y, 200, 200)
  }

  get url() {
    return this.props.get('url') as string
  }

  set url(url: string) {
    this.props.set('url', url)
  }
}
