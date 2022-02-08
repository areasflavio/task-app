import Link from 'next/link';

import { Header } from '../components/Header';
import { SignBody } from '../components/SignBody';
import { SignFooter } from '../components/SignFooter';

const SignIn: React.FC = () => {
  return (
    <>
      <Header />

      <SignBody>
        <h1>sign in</h1>

        <h2>Enter your email and password</h2>

        <form>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
        </form>
      </SignBody>

      <SignFooter>
        <button type="submit">login</button>
        <p>
          Dont have an account?<Link href="/sign-up">Sign up</Link>
        </p>
      </SignFooter>
    </>
  );
};

export default SignIn;
