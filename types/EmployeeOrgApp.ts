import { Employee, IEmployeeOrgApp } from ".";
import { IHistory } from "./History";

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  // implement a stack
  // actions: Array<IAction[]>;
  private history: IHistory;
  // private current: number;

  constructor(ceo: Employee) {
    this.ceo = ceo;
    this.history = new IHistory();
    // this.actions = [];
    // this.current = -1;
  }

  /**
  A function for searches the tree for an node/employee with a give unique Id @param uniqueId  and returns the employee and it's current supervisor.
  */

  private findInSubtree(
    uniqueId: Employee["uniqueId"],
    supervisor: Employee = this.ceo
  ): { supervisor: Employee | null; employee: Employee | null } {
    if (supervisor.uniqueId === uniqueId) {
      return { employee: supervisor, supervisor: null };
    }
    for (const employee of supervisor.subordinates) {
      if (employee.uniqueId === uniqueId) {
        return { supervisor, employee };
      }
      const result = this.findInSubtree(uniqueId, employee);
      if (result) {
        return result;
      }
    }
    return null;
  }

  /**
  * Adds the employee under a supervisor (another employee) that has supervisorID (uniqueId).
   @param employee, * @param supervisorId
  */
  add(
    employee: Employee,
    supervisorId: Employee["uniqueId"],
    pushToStack = true
  ): void {
    // Finds the supervisor in the tree using the @param supervisorId
    const result = this.findInSubtree(supervisorId);
    const supervisor = result.employee;

    // If supervisor exists, the new employee is added a subordinate
    if (supervisor) {
      supervisor.subordinates.push(employee);

      // If action is not part of an undo or redo sequence then the action is added to the actions stack.
      if (pushToStack) {
        this.history.add([
          {
            action: "add",
            employee: employee,
            newSupervisor: supervisor,
            oldSupervisor: null
          }
        ]);
      }
    } else {
      throw new Error(`Supervisor with id "${supervisorId}" not found.`);
    }
  }

  move(
    employeeId: Employee["uniqueId"],
    newSupervisorId: Employee["uniqueId"],
    pushToStack = true
  ): void {
    const { employee, supervisor: oldSupervisor } =
      this.findInSubtree(employeeId);

    if (!employee || !oldSupervisor) {
      throw new Error(`Employee with id "${employeeId}" not found.`);
    }
    const { employee: newSupervisor } = this.findInSubtree(newSupervisorId);
    if (!newSupervisor) {
      throw new Error(`Supervisor with id "${newSupervisorId}" not found.`);
    }
    oldSupervisor.subordinates = oldSupervisor.subordinates.filter(
      subordinate => subordinate.uniqueId !== employeeId
    );
    // Add employee to new supervisor and update
    newSupervisor.subordinates.push(employee);

    if (pushToStack) {
      const localStack = [];
      // add the initial move action to the history stack
      localStack.push({
        action: "move",
        employee,
        oldSupervisor: oldSupervisor,
        newSupervisor: newSupervisor
      });
      // add an action to the history stack for each subordinate moved up the tree
      employee.subordinates.forEach(subordinate => {
        oldSupervisor.subordinates.push(subordinate);
        localStack.push({
          action: "move",
          employee: subordinate,
          oldSupervisor: employee,
          newSupervisor: oldSupervisor
        });
      });
      // add local history stack to global history
      this.history.add(localStack);
      // Set employees subordinates to empty array under new supervisor
      employee.subordinates = [];
    }
  }

  private remove(employeeId: Employee["uniqueId"], pushToStack = true): void {
    const { employee, supervisor } = this.findInSubtree(employeeId);
    if (!employee || !supervisor) {
      throw new Error(`Employee with id "${employeeId}" not found.`);
    }
    supervisor.subordinates = supervisor.subordinates.filter(
      subordinate => subordinate.uniqueId !== employeeId
    );

    if (pushToStack) {
      // this.actions.push([
      //   {
      //     action: "remove",
      //     employee: employee,
      //     newSupervisor: null,
      //     oldSupervisor: supervisor
      //   }
      // ]);
      // this.current++;
      this.history.add([
        {
          action: "remove",
          employee: employee,
          newSupervisor: null,
          oldSupervisor: supervisor
        }
      ]);
    }
  }

  // Method to undo the last action on the tree
  undo() {
    const actions = this.history.back();

    for (const stackAction of actions) {
      const { action, employee, newSupervisor, oldSupervisor } = stackAction;

      // Reverses whatever action was previously in the stack.
      if (action === "move") {
        this.move(employee.uniqueId, oldSupervisor.uniqueId, false);
      } else if (action === "add") {
        this.remove(employee.uniqueId, false);
      } else if (action === "remove") {
        this.add(employee, oldSupervisor.uniqueId, false);
      }
    }
  }

  // Method to redo the last undone action on the tree
  redo() {
    const actions = this.history.forward();

    for (const stackAction of actions) {
      const { action, employee, newSupervisor, oldSupervisor } = stackAction;

      // Redos whatever action was previously in the stack.
      if (action === "move") {
        this.move(employee.uniqueId, newSupervisor.uniqueId, false);
      } else if (action === "add") {
        this.add(employee, newSupervisor.uniqueId, false);
      }
    }
  }
}
