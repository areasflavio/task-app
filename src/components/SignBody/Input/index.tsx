import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';
import Image from 'next/image';

import { Container } from './styles';

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { children, type, onFocus, ...rest },
  ref
) => {
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);

  const handleToggleShowPassword = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <Container isFocused={isFocused}>
      <input
        ref={ref}
        type={inputType}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      {type === 'password' &&
        (inputType === 'text' ? (
          <Image
            src="/assets/icons/pass-hide.svg"
            alt=""
            width="22"
            height="19"
            onClick={handleToggleShowPassword}
          />
        ) : (
          <Image
            src="/assets/icons/pass-show.svg"
            alt=""
            width="22"
            height="19"
            onClick={handleToggleShowPassword}
          />
        ))}
    </Container>
  );
};

export const Input = forwardRef(InputBase);
