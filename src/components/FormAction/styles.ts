import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1.25rem;

  width: 100%;
  background: ${(props) => props.theme.colors.bgColor};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 375px;
    width: 100%;
    height: 2.75rem;
    border-radius: 0.375rem;

    font-family: Spartan;
    font-weight: bold;
    font-size: 1.375rem;
    line-height: 1.5rem;

    color: ${(props) => props.theme.colors.bgColor};
    background: ${(props) => props.theme.colors.highlightColor};

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.95);
    }
  }

  p {
    margin-top: 12px;

    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.375rem;
    color: ${(props) => props.theme.colors.textColor};

    a {
      margin-left: 0.25rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.highlightColor};

      position: relative;

      &::after {
        content: '';
        width: 100%;
        height: 1px;
        background: ${(props) => props.theme.colors.highlightColor};
        bottom: 0;
        left: 0;
        position: absolute;
      }

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.95);
      }
    }
  }
`;
