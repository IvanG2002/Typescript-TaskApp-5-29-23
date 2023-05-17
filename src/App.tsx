import React, { useState, useRef } from "react";
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
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
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  return (
    <div className="flex gap-10">
      <form
        className="border-2 border-slate-300 flex flex-col px-10 py-32 gap-10 rounded-md mb-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-2xl text-slate-700">
          Task List
        </h1>
        <input
          className="rounded-md bg-slate-200 p-2 outline-[#045be6]"
          type="text"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          value={newTask}
          ref={taskInput}
          autoFocus
        />
        <button className="bg-[#025be6] border-0 py-2 px-4 text-white rounded-md">
          Save
        </button>
      </form>
      <ul className="flex flex-col gap-5">
        {tasks.map((task: ITask, index: number) => {
          return (
            <div className="flex p-5 border-2 rounded-md justify-between" key={index}>
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
      </ul>
    </div>
  );
}

export default App;
