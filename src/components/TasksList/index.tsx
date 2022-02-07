import { useTask } from '../../hooks/useTask';

import { Container, TaskControls } from './styles';
import { TaskLabel } from '../../styles/TaskLabelStyle';

const TasksList: React.FC = () => {
  const { tasks, handleCompleted, handleEditTask, handleDeleteTask } =
    useTask();

  return (
    <Container>
      {tasks.map((task) => (
        <li key={task._id}>
          <TaskLabel>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleted(task._id)}
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
              onClick={() => handleDeleteTask(task._id)}
            ></button>
          </TaskControls>
        </li>
      ))}
    </Container>
  );
};

export { TasksList };
