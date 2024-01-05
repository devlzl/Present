import { type Block } from '@BlockHub/Block/Block'

export class Slide {
  id = 0
  static id = 0
  private _blocks: Array<Block>

  constructor(blocks: Array<Block>) {
    this._blocks = blocks
    this.id = ++Slide.id
  }

  get blocks() {
    return this._blocks.slice()
  }

  addBlock(block: Block) {
    this._blocks.push(block)
  }
}
