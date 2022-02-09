import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { Header } from '../components/Header';
import { TextInput } from '../components/TasksList/TextInput';
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['tasked.token'];

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
