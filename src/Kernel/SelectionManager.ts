import { EventManager } from './EventManager'
import { Block } from '@BlockHub/Block/Block'

export class SelectionManager {
  private _selectedBlocks: Block[] = []

  events = {
    update: new EventManager(),
  }

  get selectedBlocks(): Block[] {
    return this._selectedBlocks.slice()
  }

  isSelected(block: Block): boolean {
    return this._selectedBlocks.includes(block)
  }

  add(block: Block) {
    this._selectedBlocks.push(block)
    this.events.update.emit()
  }

  remove(block: Block) {
    this._selectedBlocks.splice(this._selectedBlocks.indexOf(block), 1)
    this.events.update.emit()
  }

  replace(blocks: Block[]) {
    this._selectedBlocks = blocks
    this.events.update.emit()
  }

  clear() {
    this._selectedBlocks = []
    this.events.update.emit()
  }

  toggle(block: Block) {
    if (this.isSelected(block)) {
      this.remove(block)
    } else {
      this.add(block)
    }
  }

  batchToggle(blocks: Block[]) {
    blocks.forEach((block) => {
      this.toggle(block)
    })
  }

  focus(block: Block) {
    if (this.isSelected(block) && this._selectedBlocks.length === 1) {
      return
    }
    this.clear()
    this.add(block)
  }
}
