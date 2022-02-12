import { isEqual } from 'lodash';
import React, { memo, ReactNode } from 'react';

import { Container } from './styles';

interface ISignProps {
  children: ReactNode;
}

const SignComponent = ({ children }: ISignProps) => {
  return <Container>{children}</Container>;
};

export const Sign = memo(SignComponent, (prevProps, nextProps) => {
  return isEqual(prevProps.children, nextProps.children);
});
