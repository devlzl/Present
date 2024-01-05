import { AttributeValue } from '@Kernel/Store/TextStore'

export function intersectAttributes(attributesList: Array<{ [key: string]: AttributeValue }>) {
  const result = attributesList[0]
  for (let i = 1; i < attributesList.length; i++) {
    const attributes = attributesList[i]
    if (Object.keys(attributes).length === 0) {
      return Object.create(null)
    }
    for (const [key, value] of Object.entries(attributes)) {
      if (key in result && result[key] === value) {
        continue
      }
      delete result[key]
    }
  }
  return result ?? Object.create(null)
}
