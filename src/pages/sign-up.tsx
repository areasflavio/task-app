import { useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../components/Header';
import { Sign } from '../components/Sign';
import { Input } from '../components/Sign/Input';
import { FormAction } from '../components/Sign/FormAction';

type SignUpFormData = {
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
    .min(8, 'Password must contain at least 8 characters'),
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

  const onSubmit = (data: any) => console.log(data);

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
      </FormAction>
    </>
  );
};

export default SignUp;
