import { EventManager } from './EventManager'

export class Zoom {
  private _zoom = 1
  private _changeByHandle = false

  updateEvent = new EventManager<number>()

  get value() {
    return this._zoom
  }

  get changeByHandle() {
    return this._changeByHandle
  }

  update(value: number, handle: boolean = false) {
    this._zoom = value
    this._changeByHandle = handle
    this.updateEvent.emit(this._zoom)
  }
}
