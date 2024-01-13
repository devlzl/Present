import { type Block } from '@BlockHub/Block/Block'
import { EventManager } from './EventManager'

export class Slide {
  static id = 0

  private _id: number
  private _blocks: Array<Block>

  events = {
    blockChange: new EventManager(),
  }

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
    this.events.blockChange.emit()
  }

  removeBlock(block: Block) {
    this._blocks.splice(this._blocks.indexOf(block), 1)
    this.events.blockChange.emit()
  }
}
