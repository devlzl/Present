import { type TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'

export type BlkSlctnType = TextBoxBlock

export class BlockSelection {
  private _selectedBlocks: Array<BlkSlctnType> = []

  get blocks(): BlkSlctnType[] {
    return this._selectedBlocks
  }

  exist(block: BlkSlctnType): boolean {
    return this._selectedBlocks.findIndex((b) => b === block) !== -1
  }

  add(block: BlkSlctnType) {
    this._selectedBlocks.push(block)
  }

  remove(block: BlkSlctnType) {
    this._selectedBlocks.splice(this._selectedBlocks.indexOf(block), 1)
  }

  replace(blocks: BlkSlctnType[]) {
    this._selectedBlocks = blocks
  }

  clear() {
    this._selectedBlocks = []
  }

  toggle(block: BlkSlctnType) {
    if (this.exist(block)) {
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
