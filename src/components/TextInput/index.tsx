import { useRef } from '../../hooks/useRef';
import { useTask } from '../../hooks/useTask';

import { TaskLabel } from '../../styles/TaskLabelStyle';
import { Container } from './styles';

const TextInput: React.FC = () => {
  const { labelRef, inputRef } = useRef();
  const { newTaskDescription, setNewTaskDescription, handleCreateTask } =
    useTask();

  return (
    <Container ref={labelRef}>
      <TaskLabel ref={labelRef} className="container text-input">
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
      </TaskLabel>
    </Container>
  );
};

export { TextInput };
