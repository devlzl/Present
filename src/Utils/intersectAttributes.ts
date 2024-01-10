import type { AttributeValue, Attributes } from '@Kernel/Store/TextStore'

export function intersectAttributes(attributesList: Array<Attributes>) {
  if (attributesList.length === 0) {
    return Object.create(null)
  }

  const tempResult = Object.create(null)
  for (const [key, value] of Object.entries(attributesList[0])) {
    tempResult[key] = {
      value: value,
      alone: true,
    }
  }

  for (let i = 1; i < attributesList.length; i++) {
    const attributes = attributesList[i]
    if (Object.keys(attributes).length === 0) {
      return Object.create(null)
    }
    for (const [key, value] of Object.entries(attributes)) {
      if (key in tempResult && tempResult[key].value === value) {
        tempResult[key].alone = false
        continue
      }
      delete tempResult[key]
    }
  }

  const result = Object.create(null)
  for (const [key, valueWithAlone] of Object.entries(tempResult)) {
    const { value, alone } = valueWithAlone as { value: AttributeValue; alone: boolean }
    if (attributesList.length === 1) {
      result[key] = value
    } else if (!alone) {
      result[key] = value
    }
  }
  return result
}
