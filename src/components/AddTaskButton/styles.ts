import styled from 'styled-components';

export const Container = styled.button`
  display: block;

  width: 3rem;
  height: 3rem;

  margin: 1.25rem 1.5rem 0 auto;

  background: url('/assets/icons/add-task.svg');

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.97);
  }
`;
