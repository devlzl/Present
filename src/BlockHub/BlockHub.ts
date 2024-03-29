import { type Component } from 'vue'
import { type Block } from './Block/Block'
import TextBox from './TextBoxBlock/TextBox.vue'
import Table from './TableBlock/Table.vue'
import Picture from './PictureBlock/Picture.vue'
import Canvas from './CanvasBlock/Canvas.vue'
import Shape from './ShapeBlock/Shape.vue'
import WordArt from './WordArtBlock/WordArt.vue'

class BlockHub {
  private _blockMap = Object.create(null)

  addBlock(block: Block) {
    const id = block.id
    this._blockMap[id] = block
  }

  getBlock(id: number) {
    return this._blockMap[id]
  }
}

export const BlockViews: { [key: string]: Component } = {
  TextBox,
  Table,
  Picture,
  Canvas,
  Shape,
  WordArt,
}

export const blockHub = new BlockHub()
