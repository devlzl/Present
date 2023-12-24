import { ArrayStore } from '@Kernel/Store/ArrayStore'
import { MapStore } from '@Kernel/Store/MapStore'
import { blockHub } from '../BlockHub'

export class Block {
  static id = 0

  store = new MapStore()

  constructor(type: string, x: number, y: number, width: number, height: number) {
    const store = this.store
    store.set('id', Block.id++)
    store.set('type', type)
    store.set('props', new MapStore())
    store.set('children', new ArrayStore())

    const props = store.get('props') as MapStore
    props.set('x', x)
    props.set('y', y)
    props.set('width', width)
    props.set('height', height)

    blockHub.addBlock(this)
  }

  get id(): number {
    return this.store.get('id') as number
  }

  get type(): string {
    return this.store.get('type') as string
  }

  get x(): number {
    return (this.store.get('props') as MapStore).get('x') as number
  }

  get y(): number {
    return (this.store.get('props') as MapStore).get('y') as number
  }

  get width(): number {
    return (this.store.get('props') as MapStore).get('width') as number
  }

  get height(): number {
    return (this.store.get('props') as MapStore).get('height') as number
  }
}
