import { ElementModel } from './_ElementModel'

export class TextBoxModel extends ElementModel {
  constructor(x: number, y: number) {
    super('TextBox', x, y, 300, 100)
  }
}
