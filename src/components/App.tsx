import * as React from "react";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentTask: "",
      tasks: []
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault();
    this.setState({
      currentTask: "",
      // add this.state.currentTask to the array using the es6 spread operator
      tasks: [...this.state.tasks, { id: this._timeInMillisconds(), value: this.state.currentTask, completed: false }]
    });
  }

  public deleteTask(id: number) : void {
    const tasks: Array<ITask> = this.state.tasks.filter((task: ITask) => task.id !== id);
    this.setState( { tasks });
  }

  public toggleDone(index: number): void {
    let task: ITask[] = this.state.tasks.splice(index, 1);
    task[0].completed = !task[0].completed;
    const currentTasks: ITask[] = [...this.state.tasks, ...task];
    this.setState({tasks: currentTasks});
  }

  public renderTasks() : JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return ( 
        <div key={task.id} className="tdl-task">
          <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
          <button onClick={() => this.toggleDone(index)}>{task.completed ? "Undo" : "Done"}</button>
        </div> )
    });
  }

  public render() : JSX.Element {
    console.log(this.state);
    return (
      <div>
        <h1>React TypeScript Todo List</h1>
        {/* () formats it back to the class instead of the scope */}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            className="tdl-input"
            placeholder="Add a Task"
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }

  private _timeInMillisconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}