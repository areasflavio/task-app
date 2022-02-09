import { useRef } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../components/Header';
import { Sign } from '../components/Sign';
import { Input } from '../components/Sign/Input';
import { FormAction } from '../components/Sign/FormAction';

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

  const onSubmit: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  const handleButtonSubmit = () => {
    btnRef.current?.click();
  };

  return (
    <>
      <Header />

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
      </FormAction>
    </>
  );
};

export default SignIn;
