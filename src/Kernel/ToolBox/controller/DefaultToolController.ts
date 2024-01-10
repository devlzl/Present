import { ToolController } from './_ToolController'

export class DefaultToolController extends ToolController {
  handleClick(): void {
    console.log('default click')
  }
  handleMouseDown(): void {
    console.log('default mousedown')
  }
  handleMouseMove(): void {
    console.log('default move')
  }
  handleMouseUp(): void {
    console.log('defualt up')
  }
}
