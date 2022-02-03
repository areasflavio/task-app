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

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);

  const [tasks, setTasks] = useState(dbTasks);
  const [isNewTaskInputOpen, setIsNewTaskInputOpen] = useState(true);
  const [newTaskDescription, setNewTaskDescription] = useState('');

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
      const newTask = {
        _id: tasks.length + 1,
        description: newTaskDescription,
        completed: false,
      };

      setTasks((tasks) => [newTask, ...tasks]);
    }

    setNewTaskDescription('');
    handleToggleCreateInput();
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

      <label ref={labelRef} className="container">
        <input type="checkbox" checked={false} disabled />
        <input
          ref={inputRef}
          type="text"
          name="description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreateTask()}
        />
        <span className="checkmark"></span>
      </label>

      {tasks.map((task) => (
        <label className="container" key={task._id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCompleted(task._id)}
          />
          <span className="content">{task.description}</span>
          <span className="checkmark"></span>
        </label>
      ))}

      <button className="add-task" onClick={handleToggleCreateInput}></button>
    </div>
  );
};

export default Home;
