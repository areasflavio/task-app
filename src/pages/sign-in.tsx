import { useRef } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { parseCookies } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';

import { Sign } from '../components/Sign';
import { Input } from '../components/Sign/Input';
import { FormAction } from '../components/Sign/FormAction';
import { useAuth } from '../hooks/useAuth';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email required').email('Email invalid'),
  password: yup.string().required('Password required'),
});

const SignIn: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<SignInFormData> = async (values) => {
    toast.promise(
      signIn(values),
      {
        loading: 'Hold on...',
        success: (
          <span>
            <b>Authenticated!</b>
            <br />
            Welcome back...
          </span>
        ),
        error: (
          <span>
            <b>Authentication failed.</b>
            <br />
            Check your credentials.
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
      <Sign>
        <h1>sign in</h1>

        <h2>Enter your email and password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button
            ref={btnRef}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </form>
      </Sign>

      <FormAction>
        <button onClick={handleButtonSubmit}>login</button>
        <p>
          Dont have an account?<Link href="/sign-up">Sign up</Link>
        </p>

        <Toaster position="top-center" />
      </FormAction>
    </>
  );
};

export default SignIn;

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
