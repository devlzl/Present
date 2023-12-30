import { TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { type RichTextController } from '@RichText/RichText'
import { ArrayStore } from '@Kernel/Store/ArrayStore'

export class TableBlock extends Block {
  private _row: number
  private _column: number
  private _data: ArrayStore
  private _controllerMap: { [key: string]: RichTextController } = {}

  constructor(x: number, y: number, row: number, column: number) {
    super('Table', x, y, 500, 300)
    this._row = row
    this._column = column
    this._data = this._initData()
  }

  private _initData() {
    const table = new ArrayStore()
    for (let i = 0; i < this._row; i++) {
      const row = new ArrayStore()
      for (let j = 0; j < this._column; j++) {
        const cell = new TextStore()
        row.push(cell)
      }
      table.push(row)
    }
    return table
  }

  get data() {
    return this._data
  }

  bindController = (row: number, column: number, controller: RichTextController) => {
    this._controllerMap[`${row}-${column}`] = controller
  }

  getController(row: number, column: number) {
    return this._controllerMap[`${row}-${column}`]
  }
}
