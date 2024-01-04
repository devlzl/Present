import { EventManager } from './EventManager'
import { Block } from '@BlockHub/Block/Block'

export type BlkSlctnType = Block

export type SelectionEventType = 'select' | 'unselect' | 'update'

export class BlockSelection {
  private _selectedBlocks: Array<BlkSlctnType> = []

  get blocks(): BlkSlctnType[] {
    return this._selectedBlocks
  }

  events = {
    update: new EventManager<SelectionEventType>(),
  }

  isSelected(block: BlkSlctnType): boolean {
    return this._selectedBlocks.findIndex((b) => b === block) !== -1
  }

  add(block: BlkSlctnType) {
    this._selectedBlocks.push(block)
    this.events.update.emit('update')
  }

  remove(block: BlkSlctnType) {
    this._selectedBlocks.splice(this._selectedBlocks.indexOf(block), 1)
    this.events.update.emit('update')
  }

  replace(blocks: BlkSlctnType[]) {
    this._selectedBlocks = blocks
    this.events.update.emit('update')
  }

  clear() {
    this._selectedBlocks = []
    this.events.update.emit('update')
  }

  toggle(block: BlkSlctnType) {
    if (this.isSelected(block)) {
      this.remove(block)
    } else {
      this.add(block)
    }
  }

  batchToggle(blocks: BlkSlctnType[]) {
    blocks.forEach((block) => {
      this.toggle(block)
    })
  }

  focus(block: BlkSlctnType) {
    this.clear()
    this.add(block)
  }
}
