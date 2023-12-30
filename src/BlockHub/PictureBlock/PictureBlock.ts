import { Block } from '../Block/Block'

export class PictureBlock extends Block {
  constructor(x: number, y: number) {
    super('Picture', x, y, 200, 200)
  }
}
