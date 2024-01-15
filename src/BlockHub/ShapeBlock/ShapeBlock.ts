import { Block } from '../Block/Block'

export type Shape = 'rect' | 'triangle' | 'circle' | 'star' | 'hexagon'

export class ShapeBlock extends Block {
  constructor(shape: string, x: number, y: number) {
    super('Shape', x, y, 0, 0)
    this.props.set('shape', shape)
  }

  get width() {
    return this.props.get('width') as number
  }

  set width(value: number) {
    this.props.set('width', value)
    this.props.set('height', value)
  }

  get height() {
    return this.props.get('height') as number
  }

  set height(value: number) {
    this.props.set('height', value)
    this.props.set('width', value)
  }

  get shape() {
    return this.props.get('shape') as Shape
  }
}
