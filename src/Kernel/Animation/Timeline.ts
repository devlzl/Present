import { BasicPropName } from '@BlockHub/Block/Block'
import { Animation } from './Animation'

type TimelineState = 'initial' | 'preview' | 'running'

export class Timeline {
  private _state: TimelineState = 'initial'
  private _startTime = 0
  private _animations: Set<Animation> = new Set()
  private _previewAnimations: Set<Animation> = new Set()
  private _runningAnimations: Set<Animation> = new Set()

  private _tick() {
    const animations = this._state === 'running' ? this._runningAnimations : this._previewAnimations
    const elapsedTime = Date.now() - this._startTime
    for (const animation of animations) {
      const { block, propName, startValue, endValue, duration, delay } = animation
      let progress
      if (elapsedTime < delay) {
        progress = 0
      } else if (elapsedTime < delay + duration) {
        // time progress -> effect progress
        progress = (elapsedTime - delay) / duration
      } else {
        progress = 1
        animations.delete(animation)
      }
      block[propName as BasicPropName] = startValue + (endValue - startValue) * progress
    }
    if (animations.size > 0) {
      requestAnimationFrame(this._tick.bind(this))
    } else {
      this._state = 'initial'
    }
  }

  get animations() {
    return this._animations
  }

  add(animation: Animation) {
    this._animations.add(animation)
  }

  delete(animation: Animation) {
    this._animations.delete(animation)
  }

  preview() {
    this._state = 'preview'
    this._previewAnimations = new Set([...this._animations].slice(-1))
    this._startTime = Date.now()
    this._tick()
  }

  start() {
    this._state = 'running'
    this._runningAnimations = new Set([...this._animations])
    this._startTime = Date.now()
    this._tick()
  }
}
