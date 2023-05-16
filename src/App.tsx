import React, { useState, useRef } from "react";
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus()
  };
  const addTask = (name: string): void => {
    const newTask: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTask);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };
  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i,1)
    setTasks(newTasks)
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          value={newTask}
          ref={taskInput}
          autoFocus
        />
        <button>Save</button>
      </form>
      {tasks.map((task: ITask, index: number) => {
        return (
          <div key={index}>
            <h2 style={{ textDecoration: task.done ? "line-through" : "" }}>
              {task.name}
            </h2>
            <div>
              <button onClick={() => toggleDoneTask(index)}>
                {task.done ? "✓" : "✗"}
              </button>
              <button onClick={() => removeTask(index)}>🗑</button>
            </div>
            <p>{task.done + ""}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
