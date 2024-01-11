export const toSlideCoords = (slideElement: HTMLElement, clientX: number, clientY: number) => {
  const { x, y } = slideElement.getBoundingClientRect()
  return { x: clientX - x, y: clientY - y }
}
