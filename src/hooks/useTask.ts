import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const useTask = () => {
  const taskContext = useContext(TaskContext);

  return taskContext;
};

export { useTask };
