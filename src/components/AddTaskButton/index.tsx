import { memo } from 'react';
import { useTask } from '../../hooks/useTask';

import { Container } from './styles';

const AddTaskButtonComponent = () => {
  const { handleToggleCreateInput } = useTask();

  return (
    <Container
      className="add-task"
      onClick={handleToggleCreateInput}
    ></Container>
  );
};

export const AddTaskButton = memo(AddTaskButtonComponent);
