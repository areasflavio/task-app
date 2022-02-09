import { useRef } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { parseCookies } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';

import { Header } from '../components/Header';
import { Sign } from '../components/Sign';
import { Input } from '../components/Sign/Input';
import { FormAction } from '../components/Sign/FormAction';
import { api } from '../services/api';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const SignUpFormData = yup.object().shape({
  name: yup.string().required('Name required'),
  email: yup.string().required('Email required').email('Email invalid'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password must contain at least 6 characters'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(SignUpFormData) });

  const handleSignUp = async (data: SignUpData) => {
    try {
      await api.post('/users', data);

      setTimeout(() => {
        Router.push('/');
      }, 2000);

      return Promise.resolve();
    } catch (err: any) {
      console.error(err);

      return Promise.reject();
    }
  };

  const onSubmit = (data: SignUpData) => {
    toast.promise(
      handleSignUp(data),
      {
        loading: 'Hold on...',
        success: (
          <span>
            <b>Account created!</b>
            <br />
            You can sign in now.
          </span>
        ),
        error: (
          <span>
            <b>Operation failed.</b>
            <br />
            Try again.
          </span>
        ),
      },
      {
        style: {
          minWidth: '250px',
        },
      }
    );
  };

  const handleButtonSubmit = () => {
    btnRef.current?.click();
  };

  return (
    <>
      <Header />

      <Sign>
        <h1>sign up</h1>

        <h2>First create your account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Full name"
            error={errors.name}
            {...register('name')}
          />
          <Input
            type="email"
            placeholder="Email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            placeholder="Password"
            error={errors.password}
            {...register('password')}
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            error={errors.confirm_password}
            {...register('confirm_password')}
          />

          <button
            ref={btnRef}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </form>
      </Sign>

      <FormAction>
        <button onClick={handleButtonSubmit}>create account</button>
        <p>
          Already have an account? <Link href="/sign-in">Login</Link>
        </p>

        <Toaster position="top-center" />
      </FormAction>
    </>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['tasked.token'];

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
