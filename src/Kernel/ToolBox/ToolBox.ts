import { EventManager } from '@Kernel/EventManager'
import { controllers } from './controller/_index'

export type ToolType = 'Default' | 'TextBox' | 'Shape' | 'Picture' | 'Table' | 'Pen'

export class ToolBox {
  private _currentToolType: ToolType = 'Default'
  private _slideElement?: HTMLElement

  events = {
    toolChange: new EventManager<ToolType>(),
  }

  mount(slideElement: HTMLElement) {
    this._slideElement = slideElement
    this._bindEvents()
  }

  private get _currentController() {
    return controllers[this._currentToolType]
  }

  private _bindEvents() {
    const eventNames = ['Click', 'MouseDown', 'MouseMove', 'MouseUp'] as const
    const previousHandlerMap = Object.create(null)
    const _addListener = () => {
      eventNames.forEach((eventName) => {
        const handler = this._currentController[`handle${eventName}`].bind(this._currentController)
        if (eventName === 'MouseUp') {
          document.addEventListener('mouseup', handler)
        } else {
          this._slideElement?.addEventListener(
            eventName.toLowerCase() as Lowercase<(typeof eventNames)[number]>,
            handler
          )
        }
        previousHandlerMap[eventName] = handler
      })
    }
    const _removeListener = () => {
      eventNames.forEach((eventName) => {
        const handler = previousHandlerMap[eventName]
        if (eventName === 'MouseUp') {
          document.removeEventListener('mouseup', handler)
        } else {
          this._slideElement?.removeEventListener(eventName.toLowerCase(), previousHandlerMap[eventName])
        }
      })
    }
    _addListener()
    this.events.toolChange.on((toolType) => {
      this._currentToolType = toolType
      _removeListener()
      _addListener()
    })
  }
}
