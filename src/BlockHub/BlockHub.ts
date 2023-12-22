import { Component } from 'vue'
import { type Block } from './Block/Block'
import TextBox from './TextBoxBlock/TextBox.vue'

class BlockHub {
  private _blockMap = Object.create(null)

  addBlock(block: Block) {
    const id = block.model.get('id') as number
    this._blockMap[id] = block
  }

  getBlock(id: number) {
    return this._blockMap[id]
  }
}

export const BlockViews: { [key: string]: Component } = {
  TextBox,
}

export const blockHub = new BlockHub()
