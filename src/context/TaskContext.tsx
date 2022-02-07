import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useRef } from '../hooks/useRef';

type Task = {
  _id: number;
  description: string;
  completed: boolean;
};

interface ITaskContextProps {
  tasks: Task[];
  isNewTaskInputOpen: boolean;
  newTaskDescription: string;
  setNewTaskDescription: Dispatch<SetStateAction<string>>;
  editingTask: Task | null;
  handleCompleted: (id: number) => void;
  handleCreateTask: () => void;
  handleEditTask: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleToggleCreateInput: () => void;
}

const TaskContext = createContext({} as ITaskContextProps);

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

const TaskProvider: React.FC = ({ children }) => {
  const { inputRef, labelRef } = useRef();

  const [tasks, setTasks] = useState<Task[]>(dbTasks);
  const [isNewTaskInputOpen, setIsNewTaskInputOpen] = useState(true);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const label = labelRef.current;
    if (label) label.style.display = 'none';
  }, [labelRef]);

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
    <TaskContext.Provider
      value={{
        editingTask,
        handleCompleted,
        handleCreateTask,
        handleDeleteTask,
        handleEditTask,
        handleToggleCreateInput,
        isNewTaskInputOpen,
        newTaskDescription,
        setNewTaskDescription,
        tasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
