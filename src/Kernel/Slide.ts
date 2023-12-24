import { type Block } from '@BlockHub/Block/Block'

export class Slide {
  private _blocks: Array<Block>

  constructor(blocks: Array<Block>) {
    this._blocks = blocks
  }

  get blocks() {
    return this._blocks.slice()
  }

  addBlock(block: Block) {
    this._blocks.push(block)
  }
}
