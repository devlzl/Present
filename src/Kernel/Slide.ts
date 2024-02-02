import { type Block } from '@BlockHub/Block/Block'
import { EventManager } from './EventManager'
import { Command } from '@Kernel/HistoryManager'
import { history } from '@Kernel/index'
import { Timeline } from './Animation/Timeline'
import { Animation } from './Animation/Animation'

export class Slide {
  static id = 0

  private _id: number
  private _blocks: Array<Block>
  private _timeline: Timeline

  events = {
    blockChange: new EventManager(),
    animationChange: new EventManager(),
  }

  constructor(blocks: Array<Block> = []) {
    this._id = Slide.id++
    this._blocks = blocks
    this._timeline = new Timeline()
  }

  get id() {
    return this._id
  }

  get blocks() {
    return this._blocks.slice()
  }

  private _addBlock(block: Block) {
    this._blocks.push(block)
    this.events.blockChange.emit()
  }

  private _removeBlock(block?: Block) {
    if (block) {
      this._blocks.splice(this._blocks.indexOf(block), 1)
    } else {
      this._blocks.pop()
    }
    this.events.blockChange.emit()
  }

  addBlock(block: Block) {
    const command = new Command(
      () => this._addBlock(block),
      () => this._removeBlock()
    )
    history.exec(command)
  }

  removeBlock(block: Block) {
    const command = new Command(
      () => this._removeBlock(block),
      () => this._addBlock(block)
    )
    history.exec(command)
  }

  // Animation
  get animations() {
    return this._timeline.animations
  }

  addAnimation(animation: Animation) {
    this._timeline.add(animation)
    this.events.animationChange.emit()
  }

  deleteAnimation(animation: Animation) {
    this._timeline.delete(animation)
    this.events.animationChange.emit()
  }

  previewAnimation() {
    this._timeline.preview()
  }

  startAnimation() {
    this._timeline.start()
  }
}
