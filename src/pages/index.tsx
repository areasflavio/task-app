import { Header } from '../components/Header';
import { TextInput } from '../components/TextInput';
import { TasksList } from '../components/TasksList';

import { AddTaskButton } from '../components/AddTaskButton';

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <TextInput />

      <TasksList />

      <AddTaskButton />
    </>
  );
};

export default Home;
