import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  // isFilled: boolean;
  // isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr auto;

  height: 2.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.textSecColor};

  color: ${(props) => props.theme.colors.textSecColor};

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${(props) => props.theme.colors.highlightColor};
      color: ${(props) => props.theme.colors.textColor};
    `}

  input {
    min-width: 336px;
    width: 100%;

    border: 0;
    background: inherit;

    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.375rem;

    color: inherit;
  }

  img:hover {
    cursor: pointer;
  }
`;
