import { type Block } from '@BlockHub/Block/Block'

export class Animation {
  constructor(
    public type: 'Entrance' | 'Emphasis' | 'Exit',
    public name: string,
    public block: Block,
    public propName: string,
    public startValue: any,
    public endValue: any,
    public duration: number,
    public delay: number
  ) {}
}
