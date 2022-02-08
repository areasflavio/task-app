import { useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Header } from '../components/Header';
import { SignBody } from '../components/SignBody';
import { Input } from '../components/SignBody/Input';
import { FormAction } from '../components/FormAction';

const SignUp: React.FC = () => {
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
        <h1>sign up</h1>

        <h2>First create your account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Full name"
            required
            {...register('name')}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            {...register('email')}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            {...register('password')}
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            required
            {...register('confirm_password')}
          />

          <button
            ref={btnRef}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </form>
      </SignBody>

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
