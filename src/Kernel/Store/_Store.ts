import { ArrayStore } from './ArrayStore'
import { MapStore } from './MapStore'
import { TextStore } from './TextStore'

export type OriginMap = { [key: string]: OriginType }
export type OriginArray = Array<OriginType>
export type OriginType =
  | undefined
  | number
  | string
  | boolean
  | OriginMap
  | OriginArray

export type StoreType = MapStore | ArrayStore | TextStore

export type FullType = OriginType | StoreType

export const isStoreType = (object: FullType): boolean => {
  return (
    object instanceof MapStore ||
    object instanceof ArrayStore ||
    object instanceof TextStore
  )
}
