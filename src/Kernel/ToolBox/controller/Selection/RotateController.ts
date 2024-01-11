import { selectionManager } from '@Kernel/index'
import { ToolController } from '../_ToolController'
import { toSlideCoords } from '@Utils/toSlideCoords'

export class RotateController extends ToolController {
  private _rotating = false

  handleClick() {}

  handleMouseDown() {
    const blocks = selectionManager.selectedBlocks
    if (blocks.length === 1) {
      this._rotating = true
    }
    // TODO: multi blocks rotate
  }

  handleMouseMove(event: MouseEvent) {
    if (!this._rotating) {
      return
    }

    const block = selectionManager.selectedBlocks[0]
    const centerX = block.x + block.width / 2
    const centerY = block.y + block.height / 2
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    const dx = x - centerX
    const dy = y - centerY
    const degree = Math.atan2(dx, -dy) * (180 / Math.PI)
    block.rotate = degree
  }

  handleMouseUp() {
    this._rotating = false
  }
}
