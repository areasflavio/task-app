import { AuthProvider } from './AuthContext';
import { RefsProvider } from './RefsContext';
import { TaskProvider } from './TaskContext';

const AppContext: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <RefsProvider>
        <TaskProvider>{children}</TaskProvider>
      </RefsProvider>
    </AuthProvider>
  );
};

export { AppContext };
