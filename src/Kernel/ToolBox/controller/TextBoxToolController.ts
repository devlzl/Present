import { TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { ToolController } from './_ToolController'
import { slideManager, toolBox } from '@Kernel/index'
import { TEXT_BOX_DEFAULT_HEIGHT, TEXT_BOX_DEFAULT_WIDTH } from '@Const/block'

export class TextBoxToolController extends ToolController {
  private _currentBlock?: TextBoxBlock
  private _dragging = false

  handleClick() {}

  handleMouseDown(event: MouseEvent) {
    const { offsetX, offsetY } = event
    this._currentBlock = new TextBoxBlock(offsetX, offsetY, 0, 0)
    slideManager.currentSlide.addBlock(this._currentBlock)
  }

  handleMouseMove(event: MouseEvent): void {
    const block = this._currentBlock
    const { x, y } = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const { clientX, clientY } = event
    const slideX = clientX - x
    const slideY = clientY - y
    if (block && slideX > block.x && slideY > block.y) {
      this._dragging = true
      block.width = slideX - block.x
      block.height = slideY - block.y
    }
  }

  handleMouseUp(): void {
    const block = this._currentBlock
    if (!block) {
      return
    }
    if (this._dragging) {
      this._dragging = false
    } else {
      block.width = TEXT_BOX_DEFAULT_WIDTH
      block.height = TEXT_BOX_DEFAULT_HEIGHT
    }
    toolBox.events.toolChange.emit('Default')
  }
}
