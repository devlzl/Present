import { DefaultToolController } from './DefaultToolController'
import { PenToolController } from './PenToolController'
import { PictureToolController } from './PictureToolController'
import { TextBoxToolController } from './TextBoxToolController'
import { ToolController } from './_ToolController'
import { ShapeToolController } from './ShapeToolController'

export const controllers: { [key: string]: ToolController } = {
  Default: new DefaultToolController(),
  Picture: new PictureToolController(),
  TextBox: new TextBoxToolController(),
  Pen: new PenToolController(),
  Shape: new ShapeToolController(),
}
