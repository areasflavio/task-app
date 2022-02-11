import Link from 'next/link';

import { useAuth } from '../../hooks/useAuth';

import { Container, Profile } from './styles';

interface IHeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<IHeaderProps> = ({ toggleTheme }) => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Link href="/" passHref>
        <h1>tasked</h1>
      </Link>

      {user && (
        <>
          <Profile>
            <div>
              <span>Welcome back,</span>
              <Link href="/me" passHref>
                {user?.name}
              </Link>
            </div>
          </Profile>
        </>
      )}

      <button
        type="button"
        className="theme"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      ></button>

      {user && (
        <button
          type="button"
          className="sign-out"
          onClick={signOut}
          aria-label="Sign out"
        ></button>
      )}
    </Container>
  );
};

export { Header };
