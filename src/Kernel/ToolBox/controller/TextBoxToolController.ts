import { TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { ToolController } from './_ToolController'
import { selectionManager, slideManager, toolBox } from '@Kernel/index'
import { TEXT_BOX_DEFAULT_HEIGHT, TEXT_BOX_DEFAULT_WIDTH } from '@Const/block'
import { toSlideCoords } from '@Utils/toSlideCoords'

export class TextBoxToolController extends ToolController {
  private _currentBlock?: TextBoxBlock
  private _dragging = false
  private _startX = 0
  private _startY = 0

  handleClick() {}

  handleMouseDown(event: MouseEvent) {
    const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
    this._startX = x
    this._startY = y
    this._currentBlock = new TextBoxBlock(x, y, 0, 0)
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
      block.x = left
      block.y = top
      block.width = width
      block.height = height
    }
  }

  handleMouseUp(): void {
    const block = this._currentBlock
    if (!block) {
      return
    }
    if (!this._dragging) {
      block.width = TEXT_BOX_DEFAULT_WIDTH
      block.height = TEXT_BOX_DEFAULT_HEIGHT
    }
    this._currentBlock = undefined
    this._dragging = false
    selectionManager.focus(block)
    toolBox.events.toolChange.emit('Default')
  }
}
