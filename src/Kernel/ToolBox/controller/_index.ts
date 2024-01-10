import { DefaultToolController } from './DefaultToolController'
import { PictureToolController } from './PictureToolController'
import { TextBoxToolController } from './TextBoxToolController'
import { ToolController } from './_ToolController'

export const controllers: { [key: string]: ToolController } = {
  Default: new DefaultToolController(),
  Picture: new PictureToolController(),
  TextBox: new TextBoxToolController(),
}
