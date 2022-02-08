import Link from 'next/link';

import { Header } from '../components/Header';
import { SignBody } from '../components/SignBody';
import { Input } from '../components/SignBody/Input';
import { SignFooter } from '../components/SignFooter';

const SignUp: React.FC = () => {
  return (
    <>
      <Header />

      <SignBody>
        <h1>sign up</h1>

        <h2>First create your account</h2>

        <form>
          <Input type="text" name="name" placeholder="Full name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="confirm_password"
            placeholder="Confirm your password"
          />
        </form>
      </SignBody>

      <SignFooter>
        <button type="submit">create account</button>
        <p>
          Already have an account? <Link href="/sign-in">Login</Link>
        </p>
      </SignFooter>
    </>
  );
};

export default SignUp;
