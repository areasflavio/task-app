import { memo, ReactNode } from 'react';
import { Container } from './styles';

interface IFormActionProps {
  children: ReactNode;
}

const FormActionComponent = ({ children }: IFormActionProps) => {
  return <Container>{children}</Container>;
};

export const FormAction = memo(FormActionComponent);
