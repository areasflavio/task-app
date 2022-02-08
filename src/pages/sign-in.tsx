import { useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Header } from '../components/Header';
import { SignBody } from '../components/SignBody';
import { Input } from '../components/SignBody/Input';
import { FormAction } from '../components/FormAction';

const SignIn: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const handleButtonSubmit = () => {
    btnRef.current?.click();
  };

  return (
    <>
      <Header />

      <SignBody>
        <h1>sign in</h1>

        <h2>Enter your email and password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" {...register('email')} />
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />

          <button
            ref={btnRef}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </form>
      </SignBody>

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
