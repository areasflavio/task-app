import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.25rem 1.5rem;
  }

  li + li {
    margin-top: 0.5rem;
  }

  li:hover {
    background: ${(props) => props.theme.colors.bgSecColor};
  }

  li:hover div {
    display: flex;
  }

  p {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.375rem;
    text-align: center;

    color: ${(props) => props.theme.colors.textSecColor};
  }

  button {
    border: 0;
    cursor: pointer;

    color: ${(props) => props.theme.colors.highlightColor};
  }
`;

export const TaskControls = styled.div`
  display: none;
  align-items: center;
  gap: 0.25rem;

  & .edit,
  & .delete {
    width: 0.75rem;
    height: 0.75rem;
  }

  & .edit {
    background: url('/assets/icons/edit.svg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  & .delete {
    background: url('/assets/icons/delete.svg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  & .confirm-delete {
    background: ${(props) => props.theme.colors.bgSecColor};
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
