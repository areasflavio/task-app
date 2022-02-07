import styled from 'styled-components';

export const TaskLabel = styled.label`
  /* Customize the label (the container) */
  display: block;
  position: relative;
  padding-left: 32px;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default checkbox */
  & input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom empty checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    border-radius: 6px;

    background: url('/assets/icons/uncheck.svg') no-repeat center;
  }

  & input[type='checkbox']:disabled ~ .checkmark {
    cursor: default;
  }

  /* When the checkbox is checked, add the checkmark*/
  & input[type='checkbox']:checked ~ .checkmark {
    background: url('/assets/icons/check.svg') no-repeat center;
    overflow: hidden;
  }

  /* Create the checkmark/indicator box (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    width: 24px;
    height: 24px;
    border-radius: 6px;
  }

  /* Create the check box animation */
  @keyframes checkBox {
    to {
      transform: translateX(24px);
    }
  }

  /* Show the checkmark when checked */
  & input[type='checkbox']:checked ~ .checkmark:after {
    display: block;
    background: ${(props) => props.theme.colors.highlightColor};

    animation: checkBox 0.4s cubic-bezier(0.77, 0.09, 0.98, 0.51) forwards;
  }

  /* Set the word as checkmark reference */
  .content {
    position: relative;
    line-height: 24px;
    padding-top: 4px;
  }

  /* Create the check word animation */
  @keyframes checkWord {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* Change the word color when checked */
  & input[type='checkbox']:checked ~ .content {
    color: ${(props) => props.theme.colors.textSecColor};
  }

  /* Show the word checkmark when checked */
  & input[type='checkbox']:checked ~ .content:after {
    content: '';
    height: 2px;
    background: ${(props) => props.theme.colors.textSecColor};
    position: absolute;
    left: 0;
    top: 50%;

    border-radius: 16px;

    animation: checkWord 0.4s cubic-bezier(0.77, 0.09, 0.98, 0.51) forwards;
  }

  &.text-input {
    margin: 0 0 8px 8px;
  }

  & input[type='text'] {
    margin: 0;
    border: 0;
    outline: 0;

    line-height: 24px;
    border-radius: 6px;
    background: ${(props) => props.theme.colors.bgSecColor};
  }
`;
