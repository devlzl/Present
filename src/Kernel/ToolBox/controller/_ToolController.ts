export abstract class ToolController {
  abstract handleClick(event: MouseEvent): void
  abstract handleMouseDown(event: MouseEvent): void
  abstract handleMouseMove(event: MouseEvent): void
  abstract handleMouseUp(event: MouseEvent): void
}
