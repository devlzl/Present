import { ArrayStore } from '@Kernel/Store/ArrayStore'
import { MapStore } from '@Kernel/Store/MapStore'
import { blockHub } from '../BlockHub'

export class Block {
  static id = 0

  model = new MapStore()

  constructor(type: string, x: number, y: number, width: number, height: number) {
    const model = this.model
    model.set('id', Block.id++)
    model.set('type', type)
    model.set('props', new MapStore())
    model.set('children', new ArrayStore())

    const props = model.get('props') as MapStore
    props.set('x', x)
    props.set('y', y)
    props.set('width', width)
    props.set('height', height)

    blockHub.addBlock(this)
  }

  get id(): number {
    return this.model.get('id') as number
  }

  get type(): string {
    return this.model.get('type') as string
  }

  get x(): number {
    return (this.model.get('props') as MapStore).get('x') as number
  }

  get y(): number {
    return (this.model.get('props') as MapStore).get('y') as number
  }

  get width(): number {
    return (this.model.get('props') as MapStore).get('width') as number
  }

  get height(): number {
    return (this.model.get('props') as MapStore).get('height') as number
  }
}
