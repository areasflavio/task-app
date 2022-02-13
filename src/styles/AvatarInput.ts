import styled from 'styled-components';

export const AvatarInput = styled.section`
  position: relative;
  align-self: center;
  margin-bottom: 1rem;

  img {
    min-width: 9.375rem;
    min-height: 9.375rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.bgColor};
  }

  label {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    border: 0;
    background: url('/assets/icons/camera.svg') no-repeat center;
    background-color: ${(props) => props.theme.colors.highlightColor};
    cursor: pointer;

    transition: filter 0.2s;

    input {
      display: none;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
`;
