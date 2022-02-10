import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from '../services/api';

type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: BinaryData;
};

type APIResponseData = {
  token: string;
  user: User;
};

type AuthCredentialsData = {
  email: string;
  password: string;
};

interface IAuthContextData {
  signIn: (credentials: AuthCredentialsData) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

let authChannel: BroadcastChannel;

function handleSignOut() {
  destroyCookie(undefined, 'tasked.token');

  authChannel.postMessage('signOut');

  Router.push('/sign-in');
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;

        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { 'tasked.token': token } = parseCookies();

    if (token) {
      api
        .get<User>('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { _id, name, email, avatar } = response.data;

          setUser({
            _id,
            name,
            email,
            avatar,
          });
        })
        .catch(() => {
          setUser(null);
          signOut();
        });
    }
  }, []);

  async function signIn({
    email,
    password,
  }: AuthCredentialsData): Promise<void> {
    try {
      const response = await api.post<APIResponseData>('/users/login', {
        email,
        password,
      });

      const {
        token,
        user: { _id, name, avatar },
      } = response.data;

      if (!token) {
        return Promise.reject();
      }

      setCookie(undefined, 'tasked.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        _id,
        name,
        email,
        avatar,
      });

      setTimeout(() => {
        Router.push('/');
      }, 2000);

      return Promise.resolve();
    } catch (err: any) {
      console.error(err);

      return Promise.reject();
    }
  }

  function signOut() {
    setUser(null);
    handleSignOut();
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
