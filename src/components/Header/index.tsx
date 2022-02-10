import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

import { Container, Profile } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <h1>tasked</h1>

      {user && (
        <>
          <Profile>
            {user?.avatar && (
              <Image
                src={user?.avatar && `data:image/gif;base64,${user.avatar}`}
                alt={user?.name}
                height="48"
                width="48"
              />
            )}

            <div>
              <span>Welcome back,</span>
              <Link href="/profile" passHref prefetch>
                {user?.name}
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}></button>
        </>
      )}
    </Container>
  );
};

export { Header };
