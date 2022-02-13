import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { parseCookies } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';

import { useRef } from '../hooks/useRef';
import { api } from '../services/api';
import { AxiosResponse } from 'axios';
import { useAuth } from '../hooks/useAuth';

type Task = {
  _id: string;
  description: string;
  completed: boolean;
};

interface ITaskContextProps {
  tasks: Task[];
  isNewTaskInputOpen: boolean;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  newTaskDescription: string;
  setNewTaskDescription: Dispatch<SetStateAction<string>>;
  editingTask: Task | null;
  handleCompleted: (task: Task) => void;
  handleCreateTask: () => void;
  handleEditTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleToggleCreateInput: () => void;
}

const TaskContext = createContext({} as ITaskContextProps);

const TaskProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { inputRef, labelRef } = useRef();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskInputOpen, setIsNewTaskInputOpen] = useState(true);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { 'tasked.token': token } = parseCookies();

        const response = await api.get<Task[]>('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sortBy: 'updatedAt:desc',
          },
        });

        setTasks(response.data);
      } catch (err) {
        toast.error("This didn't work.", {
          style: {
            minWidth: '250px',
          },
        });
      }
    };

    isAuthenticated && getTasks();
  }, [isAuthenticated]);

  useEffect(() => {
    const label = labelRef.current;
    if (label) label.style.display = 'none';
  }, [labelRef]);

  const handleCompleted = async (task: Task) => {
    try {
      const { 'tasked.token': token } = parseCookies();

      const response = await api.patch<Task>(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleFilterTask(task._id);

      const updatedTask = response.data;
      setTasks((tasks) => [updatedTask, ...tasks]);
    } catch (err) {
      toast.error("This didn't work.", {
        style: {
          minWidth: '250px',
        },
      });
    }
  };

  const handleCreateTask = async () => {
    if (!(newTaskDescription.trim() === '')) {
      let newTask = {
        completed: false,
        description: newTaskDescription,
      };

      try {
        const { 'tasked.token': token } = parseCookies();

        let response: AxiosResponse<Task>;

        if (editingTask) {
          response = await api.patch<Task>(
            `/tasks/${editingTask._id}`,
            newTask,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await api.post<Task>('/tasks', newTask, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        const createdTask = response.data;
        setTasks((tasks) => [createdTask, ...tasks]);
      } catch (err) {
        toast.error("This didn't work.", {
          style: {
            minWidth: '250px',
          },
        });
      }
    }

    setEditingTask(null);
    setNewTaskDescription('');
    handleToggleCreateInput(false);
  };

  const handleFilterTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task._id !== id);

    setTasks(filteredTasks);
  };

  const handleDeleteTask = async (id: string) => {
    if (!isDeleting) {
      return;
    }

    try {
      const { 'tasked.token': token } = parseCookies();

      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleFilterTask(id);
      setIsDeleting(false);
    } catch (err) {
      toast.error("This didn't work.", {
        style: {
          minWidth: '250px',
        },
      });
    }
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((task) => task._id === id);

    if (!task) return;

    setEditingTask(task);

    handleToggleCreateInput();

    setNewTaskDescription(task.description);
    handleFilterTask(id);
  };

  const handleToggleCreateInput = (state = true) => {
    setIsNewTaskInputOpen(state);

    if (state) {
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
        isDeleting,
        setIsDeleting,
        newTaskDescription,
        setNewTaskDescription,
        tasks,
      }}
    >
      {children}

      <Toaster position="top-center" />
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
