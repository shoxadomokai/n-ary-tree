import { Employee } from ".";

export interface IAction {
  action: "add" | "move" | "remove";
  employee: Employee;
  newSupervisor?: Employee;
  oldSupervisor?: Employee;
}

export class IHistory {
  private current: number;
  private stack: Array<IAction[]>;

  constructor() {
    this.current = -1;
    this.stack = [];
  }

  add(actions: IAction[]): void {
    this.stack.push(actions);
    this.current++;
  }

  back(): IAction[] {
    // Checks to see if we're on a valid index in the actions stack.
    if (this.current < 0) {
      return [];
    }

    // Pulls out current array of actions in the stack
    const actions = this.stack[this.current];
    // Moves us one step back in the actions stack;
    this.current--;
    return actions;
  }

  forward(): IAction[] {
    if (this.current >= this.stack.length - 1) {
      return [];
    }

    this.current++;

    return this.stack[this.current];
  }

  clear(): void {
    this.stack = [];
    this.current = -1;
  }
}
