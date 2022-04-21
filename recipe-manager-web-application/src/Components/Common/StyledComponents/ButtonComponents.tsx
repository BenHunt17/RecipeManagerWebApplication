import styled from "@emotion/styled";

// TODO - Make submit button style more creative
export const SubmitButton = styled.button`
  width: 110px;
  height: 25px;
  border: 1px solid var(--colour-secondary);
  border-radius: 10px;
  &:hover {
    background-color: var(--colour-shadow);
  }
  &:active {
    background-color: var(--colour-border);
  }
`;
