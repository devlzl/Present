import { toSlideCoords } from '@Utils/toSlideCoords'
import { ToolController } from '../_ToolController'
import { selectionManager } from '@Kernel/index'
import { type Block } from '@BlockHub/Block/Block'

export class MoveController extends ToolController {
  private _startX = 0
  private _startY = 0
  private _moving = false
  private _blocks: Block[] = []
  private _originBlockCoordMap: { [key: number]: { x: number; y: number } } = {}

  handleClick() {}

  handleMouseDown(event: MouseEvent) {
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    this._startX = x
    this._startY = y
    this._moving = true
    this._blocks = selectionManager.selectedBlocks
    this._blocks.forEach((block) => {
      this._originBlockCoordMap[block.id] = {
        x: block.x,
        y: block.y,
      }
    })
  }

  handleMouseMove(event: MouseEvent) {
    if (this._moving) {
      const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
      const offsetX = x - this._startX
      const offsetY = y - this._startY
      this._blocks.forEach((block) => {
        const originCoord = this._originBlockCoordMap[block.id]
        block.x = originCoord.x + offsetX
        block.y = originCoord.y + offsetY
      })
    }
  }

  handleMouseUp() {
    this._moving = false
    this._originBlockCoordMap = {}
  }
}
