import { EventManager } from './EventManager'

export type CommandFn = () => void

export class Command {
  action: CommandFn
  inverse: CommandFn
  constructor(action: CommandFn, inverse: CommandFn) {
    this.action = action
    this.inverse = inverse
  }
}
type Step = Array<Command>

export class HistoryManager {
  private _undoStack: Array<Step> = []
  private _redoStack: Array<Step> = []

  private _merging = false
  private _currentStep: Step = []

  events = {
    update: new EventManager(),
  }

  get canUndo() {
    return this._undoStack.length > 0
  }

  get canRedo() {
    return this._redoStack.length > 0
  }

  exec(command: Command) {
    if (this._redoStack.length > 0) {
      this._redoStack = []
    }
    command.action()
    if (!this._merging) {
      this._merging = true
      this._currentStep.push(command)
      setTimeout(() => {
        this._undoStack.push(this._currentStep)
        this.events.update.emit()
        this._merging = false
        this._currentStep = []
      }, 500)
    } else {
      this._currentStep.push(command)
    }
  }

  undo() {
    if (!this.canUndo) {
      return
    }
    const step = this._undoStack.pop()
    if (step) {
      for (let i = step.length - 1; i >= 0; i--) {
        step[i].inverse()
      }
      this._redoStack.push(step)
      this.events.update.emit()
    }
  }

  redo() {
    if (!this.canRedo) {
      return
    }
    const step = this._redoStack.pop()
    if (step) {
      for (let i = 0; i < step.length; i++) {
        step[i].action()
      }
      this._undoStack.push(step)
      this.events.update.emit()
    }
  }
}
