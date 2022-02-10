import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;

  margin: 2.5rem 1.5rem 1.25rem;

  h1 {
    font-family: ${(props) => props.theme.fonts.title}, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.125;
    letter-spacing: -0.408px;

    color: ${(props) => props.theme.colors.textColor};
  }

  button.sign-out {
    background: url('/assets/icons/off.svg') no-repeat center;
  }

  button.theme {
    margin-left: auto;
    background: url(${(props) => '/assets/icons/' + props.theme.name + '.svg'})
      no-repeat center;
  }

  button {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;

    border: 0;

    background-color: transparent;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.colors.bgSecColor};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-content: center;
  margin-left: 2rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;

    span {
      color: ${(props) => props.theme.colors.textSecColor};
    }

    a {
      width: max-content;
      text-decoration: none;
      font-weight: bold;
      color: ${(props) => props.theme.colors.textColor};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (max-width: 520px) {
    & {
      margin-left: 0.25rem;

      img {
        display: none;
      }
    }
  }
`;
