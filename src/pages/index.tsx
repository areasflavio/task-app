import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

const dbTasks = [
  {
    _id: 1,
    completed: true,
    description: 'One',
  },
  {
    _id: 2,
    completed: false,
    description: 'Two',
  },
  {
    _id: 3,
    completed: false,
    description: 'Three',
  },
  {
    _id: 4,
    completed: false,
    description: 'Four',
  },
];

type Task = {
  _id: number;
  description: string;
  completed: boolean;
};

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);

  const [tasks, setTasks] = useState<Task[]>(dbTasks);
  const [isNewTaskInputOpen, setIsNewTaskInputOpen] = useState(true);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const label = labelRef.current;
    if (label) label.style.display = 'none';
  }, []);

  const handleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task._id == id) {
          return {
            ...task,
            completed: !task.completed,
          };
        } else return task;
      })
    );
  };

  const handleCreateTask = () => {
    if (!(newTaskDescription.trim() === '')) {
      let newTask = {
        _id: tasks.length + 1,
        completed: false,
        description: newTaskDescription,
      };

      if (editingTask) {
        (newTask._id = editingTask._id),
          (newTask.completed = editingTask.completed);
      }

      setTasks((tasks) => [newTask, ...tasks]);
      setEditingTask(null);
    }

    setNewTaskDescription('');
    handleToggleCreateInput();
  };

  const handleDeleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task._id !== id);

    setTasks(filteredTasks);
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((task) => task._id === id);

    if (!task) return;

    setEditingTask(task);

    handleToggleCreateInput();

    setNewTaskDescription(task.description);
    handleDeleteTask(id);
  };

  const handleToggleCreateInput = () => {
    setIsNewTaskInputOpen(!isNewTaskInputOpen);

    if (isNewTaskInputOpen) {
      const label = labelRef.current;
      if (label) label.style.display = 'block';

      inputRef.current?.focus();
    } else {
      const label = labelRef.current;
      if (label) label.style.display = 'none';

      inputRef.current?.blur();
    }
  };

  return (
    <div>
      <h1>tasked</h1>

      <label ref={labelRef} className="container text-input">
        <input type="checkbox" disabled />
        <input
          ref={inputRef}
          type="text"
          name="description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreateTask()}
          autoComplete="off"
        />
        <span className="checkmark"></span>
      </label>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <label className="container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleted(task._id)}
              />
              <span className="content">{task.description}</span>
              <span className="checkmark"></span>
            </label>

            <div className="task-controls">
              <button
                className="edit"
                onClick={() => handleEditTask(task._id)}
              ></button>
              <button
                className="delete"
                onClick={() => handleDeleteTask(task._id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>

      <button className="add-task" onClick={handleToggleCreateInput}></button>
    </div>
  );
};

export default Home;
