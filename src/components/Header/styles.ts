import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
`;
