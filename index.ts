// src/index.ts


// Interface that describes the shape of a task object.
// This demonstrates TypeScript's type system for defining structured data.
interface ITask {
  id: number;
  description: string;
  done: boolean;
}


// Class representing a single task in a simple CLI productivity tool.
class Task implements ITask {
  constructor(
    public id: number,
    public description: string,
    public done: boolean = false
  ) {}

  // Mark the task as complete.
  markDone(): void {
    this.done = true;
  }

  // Format the task for terminal output.
  toString(): string {
    const status = this.done ? "[x]" : "[ ]";
    return `${status} (#${this.id}) ${this.description}`;
  }
}


// Class that manages a list (array) of Task objects.
// Demonstrates lists, filtering, searching, and simple state management.
class TaskList {
  private tasks: Task[] = [];

  // Add a new task to the list.
  addTask(description: string): Task {
    const id = this.tasks.length + 1;
    const task = new Task(id, description);
    this.tasks.push(task);
    return task;
  }


  // Mark a task as done by id.
  // Throws an exception if the id does not exist
  markDone(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    task.markDone();
  }

  // Return all tasks.
  getAll(): Task[] {
    return [...this.tasks];
  }

  // Return tasks that are not done.
  getIncomplete(): Task[] {
    return this.tasks.filter((t) => !t.done);
  }

  // Return tasks that are done.
  getComplete(): Task[] {
    return this.tasks.filter((t) => t.done);
  }
}



// --------- Recursion Examples ---------

// Simple recursive countdown from n down to 0
// Demonstrates basic recursion with a clear stopping condition
function recursiveCountdown(n: number): void {
  if (n < 0) {
    return;
  }
  console.log(`Countdown: ${n}`);
  recursiveCountdown(n - 1);
}

// Recursive sum from 1 to n (example: n=5 → 1+2+3+4+5 = 15)
// This keeps recursion simple and easy
function recursiveSum(n: number): number {
  if (n <= 0) {
    return 0;
  }
  return n + recursiveSum(n - 1);
}



// --------- Helper for printing tasks ---------

// Print a label and task list in the terminal
function printTasks(label: string, tasks: Task[]): void {
  console.log(`\n${label}`);
  if (tasks.length === 0) {
    console.log("(no tasks)");
    return;
  }
  for (const task of tasks) {
    console.log(" - " + task.toString());
  }
}



// --------- Main Program ---------


// Main entry point that ties all features together
function main(): void {
  console.log("===== TurboTS Demo =====");

  // Create a professional-themed task list.
  const todo = new TaskList();
  todo.addTask("Build logging system for CLI app");
  todo.addTask("Implement recursive utility function");
  todo.addTask("Prepare project documentation for release");

  // Show all tasks.
  printTasks("All tasks:", todo.getAll());

  // Mark one task as complete.
  try {
    todo.markDone(2);
    printTasks("Completed tasks:", todo.getComplete());
    printTasks("Incomplete tasks:", todo.getIncomplete());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error marking task complete:", error.message);
    }
  }

  // Demonstrate recursion with a countdown
  console.log("\n--- Recursive countdown from 5 ---");
  recursiveCountdown(5);

  // Demonstrate recursion with a math example
  console.log("\n--- Recursive sum demo ---");
  const sumTo10 = recursiveSum(10);
  console.log(`Sum of numbers from 1 to 10 is: ${sumTo10}`);

  
  console.log("\n===== End of TurboTS Demo =====");
    console.log("");

}

// Run the program.
main();
