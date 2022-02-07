import styled from 'styled-components';

export const Container = styled.button`
  width: 48px;
  height: 48px;

  display: block;
  margin-left: auto;

  background: url('/assets/icons/add-task.svg');

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.97);
  }
`;
