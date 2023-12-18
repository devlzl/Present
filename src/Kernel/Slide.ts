import { ElementModel } from './ElementModels/_ElementModel'
import { ArrayStore } from './Store/ArrayStore'
import { MapStore } from './Store/MapStore'

export class Slide extends MapStore {
  private _elements: ArrayStore = new ArrayStore()

  constructor(elements: Array<ElementModel> = []) {
    super()
    elements.forEach((element) => {
      this._elements.push(element)
    })
  }

  addElement(element: ElementModel) {
    this._elements.push(element)
  }

  get elements(): Array<ElementModel> {
    const result = []
    for (const element of this._elements) {
      result.push(element as ElementModel)
    }
    return result
  }
}
