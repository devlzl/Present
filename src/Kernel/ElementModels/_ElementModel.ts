import { MapStore } from '@Kernel/Store/MapStore'

export class ElementModel extends MapStore {
  constructor(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super()
    this.set('name', name)
    this.set('x', x)
    this.set('y', y)
    this.set('width', width)
    this.set('height', height)
  }

  get name(): string {
    return this.get('name') as string
  }

  get x(): number {
    return this.get('x') as number
  }

  get y(): number {
    return this.get('y') as number
  }

  get width(): number {
    return this.get('width') as number
  }

  get height(): number {
    return this.get('height') as number
  }
}
