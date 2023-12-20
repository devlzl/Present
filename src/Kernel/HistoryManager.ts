import { EventManager } from './EventManager'

export type CommandFn = () => void
export interface Command {
  action: CommandFn
  inverse: CommandFn
}

export class HistoryManager {
  private _undoStack: Array<Command> = []
  private _redoStack: Array<Command> = []

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
    command.action()
    this._undoStack.push(command)
    this.events.update.emit()
  }

  undo() {
    if (!this.canUndo) {
      return
    }
    const command = this._undoStack.pop()
    if (command) {
      command.inverse()
      this._redoStack.push(command)
      this.events.update.emit()
    }
  }

  redo() {
    if (!this.canRedo) {
      return
    }
    const command = this._redoStack.pop()
    if (command) {
      command.action()
      this._undoStack.push(command)
      this.events.update.emit()
    }
  }
}
