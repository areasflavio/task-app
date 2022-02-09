import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';
import Image from 'next/image';
import { FieldError } from 'react-hook-form';

import { Container, InputContainer } from './styles';

type InputProps = {
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { children, type, onFocus, error = null, ...rest },
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
    <Container>
      <InputContainer isFocused={isFocused} isErrored={!!error}>
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
      </InputContainer>

      {!!error && <span>{error.message}</span>}
    </Container>
  );
};

export const Input = forwardRef(InputBase);
