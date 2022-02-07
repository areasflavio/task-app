import { useTask } from '../../hooks/useTask';

import { Container } from './styles';

const AddTaskButton: React.FC = () => {
  const { handleToggleCreateInput } = useTask();

  return (
    <Container
      className="add-task"
      onClick={handleToggleCreateInput}
    ></Container>
  );
};

export { AddTaskButton };
