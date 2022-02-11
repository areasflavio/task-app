import { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useTask } from '../../hooks/useTask';

import { TaskLabel } from '../../styles/TaskLabelStyle';
import { Container, TaskControls } from './styles';

const TasksList: React.FC = () => {
  const { user } = useAuth();
  const {
    tasks,
    handleCompleted,
    handleEditTask,
    handleDeleteTask,
    isDeleting,
    setIsDeleting,
    isNewTaskInputOpen,
  } = useTask();

  const [deletingTaskId, setdeletingTaskId] = useState('');

  const handleIsDeletingTask = (id: string) => {
    setIsDeleting(true);
    setdeletingTaskId(id);

    setTimeout(() => {
      setIsDeleting(false);
      setdeletingTaskId('');
    }, 3000);
  };

  return (
    <Container>
      {tasks.length === 0 && isNewTaskInputOpen && (
        <p>{user?.name}, what do you want to get done today?</p>
      )}

      {tasks.map((task) => (
        <li key={task._id}>
          <TaskLabel>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleted(task)}
            />
            <span className="content">{task.description}</span>
            <span className="checkmark"></span>
          </TaskLabel>

          <TaskControls>
            <button
              className="edit"
              onClick={() => handleEditTask(task._id)}
            ></button>
            <button
              className="delete"
              onClick={() => handleIsDeletingTask(task._id)}
              style={{
                display:
                  isDeleting && deletingTaskId === task._id ? 'none' : 'block',
              }}
            ></button>
            {isDeleting && deletingTaskId === task._id && (
              <button
                className="confirm-delete"
                onClick={() => handleDeleteTask(task._id)}
              >
                Click to confirm
              </button>
            )}
          </TaskControls>
        </li>
      ))}
    </Container>
  );
};

export { TasksList };
