import { zoom } from '@Kernel/index'

export const toSlideCoords = (slideElement: HTMLElement, clientX: number, clientY: number) => {
  const { x, y } = slideElement.getBoundingClientRect()
  return { x: (clientX - x) / zoom.value, y: (clientY - y) / zoom.value }
}
