import { EventManager } from '@Kernel/EventManager'
import { controllers } from './controller/_index'

export type ToolType = 'Default' | 'TextBox' | 'Shape' | 'Picture' | 'Table' | 'Pen'
export type ToolConfig = {
  [key: string]: string | number | boolean | ToolConfig
}

export class ToolBox {
  private _currentTool: { type: ToolType; config?: ToolConfig } = { type: 'Default' }
  private _slideElement?: HTMLElement

  events = {
    toolChange: new EventManager<ToolType>(),
  }

  mount(slideElement: HTMLElement) {
    this._slideElement = slideElement
    this._bindEvents()
  }

  private get _currentController() {
    return controllers[this._currentTool.type]
  }

  private _bindEvents() {
    const previousHandlerMap = Object.create(null)

    const _addListener = () => {
      const controller = this._currentController
      const slideElement = this._slideElement as HTMLElement

      const handleClick = controller.handleClick.bind(this._currentController)
      slideElement.addEventListener('click', handleClick)
      previousHandlerMap.click = handleClick

      const handleMouseDown = controller.handleMouseDown.bind(this._currentController)
      slideElement.addEventListener('mousedown', handleMouseDown)
      previousHandlerMap.mousedown = handleMouseDown

      const handleMouseMove = controller.handleMouseMove.bind(this._currentController)
      slideElement.addEventListener('mousemove', handleMouseMove)
      previousHandlerMap.mousemove = handleMouseMove

      const handleMouseUp = controller.handleMouseUp.bind(this._currentController)
      document.addEventListener('mouseup', handleMouseUp)
      previousHandlerMap.mouseup = handleMouseUp
    }

    const _removeListener = () => {
      const slideElement = this._slideElement as HTMLElement
      slideElement.removeEventListener('click', previousHandlerMap.click)
      slideElement.removeEventListener('mousedown', previousHandlerMap.mousedown)
      slideElement.removeEventListener('mousemove', previousHandlerMap.mousemove)
      document.removeEventListener('mouseup', previousHandlerMap.mouseup)
    }

    _addListener()
    this.events.toolChange.on(() => {
      _removeListener()
      _addListener()
    })
  }

  get currentToolType() {
    return this._currentTool.type
  }

  get currentTool() {
    return this._currentTool
  }

  changeTool(toolType: ToolType, config: ToolConfig = {}) {
    this._currentTool = {
      type: toolType,
      config: config,
    }
    this.events.toolChange.emit(toolType)
  }
}
