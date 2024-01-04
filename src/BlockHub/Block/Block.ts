import { MapStore } from '@Kernel/Store/MapStore'
import { blockHub } from '../BlockHub'
import { RichTextController } from '@RichText/RichText'
import { AttributeValue } from '@Kernel/Store/TextStore'

export class Block {
  static id = 0

  protected store = new MapStore()
  protected controllerMap: { [key: string]: RichTextController } = {}

  constructor(type: string, x: number, y: number, width: number, height: number, rotate: number = 0) {
    const store = this.store
    store.set('id', Block.id++)
    store.set('type', type)
    store.set('props', new MapStore())

    const props = store.get('props') as MapStore
    props.set('x', x)
    props.set('y', y)
    props.set('width', width)
    props.set('height', height)
    props.set('rotate', rotate)

    blockHub.addBlock(this)
  }

  get id(): number {
    return this.store.get('id') as number
  }

  get type(): string {
    return this.store.get('type') as string
  }

  get props(): MapStore {
    return this.store.get('props') as MapStore
  }

  get x(): number {
    return this.props.get('x') as number
  }

  get y(): number {
    return this.props.get('y') as number
  }

  get width(): number {
    return this.props.get('width') as number
  }

  get height(): number {
    return this.props.get('height') as number
  }

  get rotate(): number {
    return this.props.get('rotate') as number
  }

  set x(x: number) {
    this.props.set('x', x)
  }

  set y(y: number) {
    this.props.set('y', y)
  }

  set width(width: number) {
    this.props.set('width', width)
  }

  set height(height: number) {
    this.props.set('height', height)
  }

  set rotate(rotate: number) {
    this.props.set('rotate', rotate)
  }

  formatBlock(name: string, value: AttributeValue) {
    for (const controller of Object.values(this.controllerMap)) {
      controller.formatAll(name, value)
    }
  }

  getController(...params: any) {
    // should be overridden by subclass
  }
}
