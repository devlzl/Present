import { Shape, ShapeBlock } from '@BlockHub/ShapeBlock/ShapeBlock'
import { toSlideCoords } from '@Utils/toSlideCoords'
import { selectionManager, slideManager, toolBox } from '@Kernel/index'
import { SHAPE_DEFAULT_HEIGHT, SHAPE_DEFAULT_WIDTH } from '@Const/block'
import { ToolController } from './_ToolController'
import { ToolConfig } from '../ToolBox'

export class ShapeToolController extends ToolController {
  private _dragging = false
  private _currentBlock?: ShapeBlock
  private _startX = 0
  private _startY = 0

  handleClick(event: MouseEvent) {}

  handleMouseDown(event: MouseEvent) {
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    const shape = (toolBox.currentTool.config as ToolConfig).shape as Shape
    this._startX = x
    this._startY = y
    this._currentBlock = new ShapeBlock(shape, x, y)
    slideManager.currentSlide.addBlock(this._currentBlock)
  }

  handleMouseMove(event: MouseEvent): void {
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    const block = this._currentBlock
    if (block) {
      this._dragging = true
      const left = Math.min(this._startX, x)
      const top = Math.min(this._startY, y)
      const right = Math.max(this._startX, x)
      const bottom = Math.max(this._startY, y)
      const width = right - left
      const height = bottom - top
      const edge = Math.min(width, height)
      block.x = left
      block.y = top
      block.width = edge
      block.height = edge
    }
  }

  handleMouseUp(event: MouseEvent): void {
    const block = this._currentBlock
    if (!block) {
      return
    }
    if (!this._dragging) {
      block.width = SHAPE_DEFAULT_WIDTH
      block.height = SHAPE_DEFAULT_HEIGHT
    }
    this._currentBlock = undefined
    this._dragging = false
    selectionManager.focus(block)
    toolBox.changeTool('Default')
  }
}
