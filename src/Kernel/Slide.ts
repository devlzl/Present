import { ElementModel } from './ElementModels/_ElementModel'

export class Slide {
  private _elements: Array<ElementModel>

  constructor(elements: Array<ElementModel> = []) {
    this._elements = elements
  }

  get elements() {
    return this._elements
  }
}
