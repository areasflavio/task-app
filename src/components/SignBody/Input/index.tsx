import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ children, type, onFocus, ...rest }) => {
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

export { Input };
