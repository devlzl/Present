import { MoveController } from './Selection/MoveController'
import { RotateController } from './Selection/RotateController'
import { SizeController } from './Selection/SizeController'
import { ToolController } from './_ToolController'

export class DefaultToolController extends ToolController {
  private _targetController?: ToolController

  handleClick(event: MouseEvent) {
    this._targetController?.handleClick(event)
  }

  handleMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (target.closest('.size-handle')) {
      this._targetController = new SizeController()
    } else if (target.closest('.move-handle')) {
      this._targetController = new MoveController()
    } else if (target.closest('.rotate-handle')) {
      this._targetController = new RotateController()
    }
    this._targetController?.handleMouseDown(event)
  }

  handleMouseMove(event: MouseEvent): void {
    this._targetController?.handleMouseMove(event)
  }

  handleMouseUp(event: MouseEvent): void {
    this._targetController?.handleMouseUp(event)
    this._targetController = undefined
  }
}
