import { type Block } from '@BlockHub/Block/Block'

export class Slide {
  static id = 0

  private _id: number
  private _blocks: Array<Block>

  constructor(blocks: Array<Block> = []) {
    this._id = Slide.id++
    this._blocks = blocks
  }

  get id() {
    return this._id
  }

  get blocks() {
    return this._blocks.slice()
  }

  addBlock(block: Block) {
    this._blocks.push(block)
  }
}
