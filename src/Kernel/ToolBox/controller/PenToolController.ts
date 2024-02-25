import { toSlideCoords } from '@Utils/toSlideCoords'
import { ToolController } from './_ToolController'
import { CanvasBlock } from '@BlockHub/CanvasBlock/CanvasBlock'
import { selectionManager, slideManager, toolBox, zoom } from '@Kernel/index'
import { ArrayStore } from '@Kernel/Store/ArrayStore'
import { OriginMap } from '@Kernel/Store/_Store'

const CANVAS_PADDING = 10

export class PenToolController extends ToolController {
  private _drawing = false
  private _canvasBlock?: CanvasBlock
  private _range = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }

  handleClick() {}

  handleMouseDown(event: MouseEvent): void {
    this._drawing = true
    const slideElement = event.currentTarget as HTMLElement
    const slideRect = slideElement.getBoundingClientRect()
    this._canvasBlock = new CanvasBlock(0, 0, slideRect.width / zoom.value, slideRect.height / zoom.value)
    slideManager.currentSlide.addBlock(this._canvasBlock)
  }

  handleMouseMove(event: MouseEvent) {
    if (this._drawing) {
      const { x, y } = toSlideCoords(event.currentTarget as HTMLElement, event.clientX, event.clientY)
      this._range.left = Math.min(this._range.left, x)
      this._range.right = Math.max(this._range.right, x)
      this._range.top = Math.min(this._range.top, y)
      this._range.bottom = Math.max(this._range.bottom, y)
      this._canvasBlock?.points.push({ x, y })
    }
  }

  handleMouseUp() {
    if (this._drawing) {
      this._drawing = false
      const block = new CanvasBlock(
        this._range.left - CANVAS_PADDING,
        this._range.top - CANVAS_PADDING,
        this._range.right - this._range.left + CANVAS_PADDING * 2,
        this._range.bottom - this._range.top + CANVAS_PADDING * 2
      )
      for (const point of this._canvasBlock?.points as ArrayStore) {
        const { x, y } = point as OriginMap
        block.points.push({
          x: (x as number) - this._range.left + CANVAS_PADDING,
          y: (y as number) - this._range.top + CANVAS_PADDING,
        })
      }
      const slide = slideManager.currentSlide
      slide.removeBlock(this._canvasBlock as CanvasBlock)
      slide.addBlock(block)
      selectionManager.focus(block)
    }
    toolBox.changeTool('Default')
  }
}
