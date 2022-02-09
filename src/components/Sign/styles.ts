import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 433px;
  padding: 2.5rem 1.25rem;

  background: ${(props) => props.theme.colors.bgSecColor};

  h1 {
    font-weight: 500;
    font-size: 2.5rem;
    line-height: 3rem;

    text-align: center;

    color: ${(props) => props.theme.colors.textColor};
  }

  h2 {
    margin-top: 2.5rem;

    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.375rem;
    text-align: center;

    color: ${(props) => props.theme.colors.textSecColor};
  }

  form {
    display: flex;
    flex-direction: column;

    margin-top: auto;
  }
`;
