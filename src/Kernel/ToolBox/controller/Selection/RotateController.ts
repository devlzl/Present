import { selectionManager } from '@Kernel/index'
import { ToolController } from '../_ToolController'
import { toSlideCoords } from '@Utils/toSlideCoords'
import { type Block } from '@BlockHub/Block/Block'
import { blockHub } from '@BlockHub/BlockHub'

export class RotateController extends ToolController {
  private _rotating = false
  private _centerX = 0
  private _centerY = 0
  private _selectedBlocks: Block[] = []

  handleClick() {}

  handleMouseDown(event: MouseEvent) {
    this._rotating = true
    this._selectedBlocks = selectionManager.selectedBlocks

    const target = (event.target as HTMLElement).closest('.selectable-block') as HTMLElement
    const block = blockHub.getBlock(Number(target.dataset.blockId))
    this._centerX = block.x + block.width / 2
    this._centerY = block.y + block.height / 2
  }

  handleMouseMove(event: MouseEvent) {
    if (!this._rotating) {
      return
    }
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    const dx = x - this._centerX
    const dy = y - this._centerY
    const degree = Math.atan2(dx, -dy) * (180 / Math.PI)
    this._selectedBlocks.forEach((block) => {
      block.rotate = degree
    })
  }

  handleMouseUp() {
    this._rotating = false
  }
}
