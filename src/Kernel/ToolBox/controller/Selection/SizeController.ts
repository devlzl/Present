import { type Block } from '@BlockHub/Block/Block'
import { ToolController } from '../_ToolController'
import { toSlideCoords } from '@Utils/toSlideCoords'
import { selectionManager } from '@Kernel/index'

const MIN_SIZE = 10

export class SizeController extends ToolController {
  private _startX = 0
  private _startY = 0
  private _resizing = false
  private _directions: string[] = []
  private _selectedBlocks: Block[] = []
  private _originBlockRectMap: { [key: number]: { x: number; y: number; width: number; height: number } } = {}

  handleClick() {}

  handleMouseDown(event: MouseEvent) {
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    this._startX = x
    this._startY = y
    this._resizing = true
    this._directions = Array.from((event.target as HTMLElement).classList).filter((className) =>
      ['left', 'right', 'top', 'bottom'].includes(className)
    )
    this._selectedBlocks = selectionManager.selectedBlocks
    this._selectedBlocks.forEach((block) => {
      this._originBlockRectMap[block.id] = {
        x: block.x,
        y: block.y,
        width: block.width,
        height: block.height,
      }
    })
  }

  handleMouseMove(event: MouseEvent) {
    if (!this._resizing) {
      return
    }
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    const offsetX = x - this._startX
    const offsetY = y - this._startY
    this._directions.forEach((direction) => {
      const blocks = this._selectedBlocks
      blocks.forEach((block) => {
        const originBlockRect = this._originBlockRectMap[block.id]
        if (direction === 'left') {
          if (originBlockRect.x + offsetX < block.x + block.width - MIN_SIZE) {
            block.x = originBlockRect.x + offsetX
            block.width = originBlockRect.width - offsetX
          }
        } else if (direction === 'right') {
          if (originBlockRect.width + offsetX > MIN_SIZE) {
            block.width = originBlockRect.width + offsetX
          }
        } else if (direction === 'top') {
          if (originBlockRect.y + offsetY < block.y + block.height - MIN_SIZE) {
            block.y = originBlockRect.y + offsetY
            block.height = originBlockRect.height - offsetY
          }
        } else if (direction === 'bottom') {
          if (originBlockRect.height + offsetY > MIN_SIZE) {
            block.height = originBlockRect.height + offsetY
          }
        }
      })
    })
  }

  handleMouseUp() {
    this._resizing = false
    this._originBlockRectMap = {}
  }
}
