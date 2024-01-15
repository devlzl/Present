import { TextStore } from '@Kernel/Store/TextStore'
import { Block } from '../Block/Block'
import { type RichTextController } from '@RichText/RichText'
import { ArrayStore } from '@Kernel/Store/ArrayStore'
import { DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from './const'

export class TableBlock extends Block {
  private _row: number
  private _column: number
  private _data: ArrayStore
  private _currentCoord = { row: 0, column: 0 }

  constructor(x: number, y: number, row: number, column: number) {
    super('Table', x, y, DEFAULT_CELL_WIDTH * column, DEFAULT_CELL_HEIGHT * row)
    console.log('con', DEFAULT_CELL_WIDTH * column, DEFAULT_CELL_HEIGHT * row)
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

  get row() {
    return this._row
  }

  get column() {
    return this._column
  }

  updateCurrentCoord(row: number, column: number) {
    this._currentCoord = { row, column }
  }

  bindController = (row: number, column: number, controller: RichTextController) => {
    this.controllerMap[`${row}-${column}`] = controller
  }

  getController() {
    const { row, column } = this._currentCoord
    return this.controllerMap[`${row}-${column}`]
  }
}
