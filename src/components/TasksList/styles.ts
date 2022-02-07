import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 6px;
    padding: 4px 8px;
  }

  li + li {
    margin-top: 8px;
  }

  li:hover {
    background: ${(props) => props.theme.colors.bgSecColor};
  }

  li:hover div {
    display: flex;
  }

  button {
    border: 0;
    cursor: pointer;
  }
`;

export const TaskControls = styled.div`
  display: none;
  align-items: center;
  gap: 4px;

  & .edit,
  & .delete {
    width: 12px;
    height: 12px;
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
`;
