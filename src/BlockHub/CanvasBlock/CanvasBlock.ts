import { ArrayStore } from '@Kernel/Store/ArrayStore'
import { Block } from '../Block/Block'

export class CanvasBlock extends Block {
  constructor(x: number, y: number, width: number, height: number) {
    super('Canvas', x, y, width, height)
    this.props.set('points', new ArrayStore())

    const points = this.props.get('points') as ArrayStore
    points.events.update.on(() => {
      // TODO: fix from
      this.props.events.update.emit({ key: 'points', from: this.points, to: this.points })
    })
  }

  get points() {
    return this.props.get('points') as ArrayStore
  }

  set points(points: ArrayStore) {
    this.props.set('points', points)
  }
}
