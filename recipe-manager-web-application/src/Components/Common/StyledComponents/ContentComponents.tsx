import styled from "@emotion/styled";

export const Label = styled.div`
  background-color: var(--colour-primary);
  color: white;
  border: 2px solid var(--colour-secondary);
  border-radius: 20px;
  padding: 10px;
  &:hover {
    background-color: rgba(var(--colour-secondary-rgb), 0.75);
    cursor: pointer;
  }
  &:active {
    opacity: 0.7;
  }
`;

export const ImageFrame = styled.div`
  padding: 10px;
  padding-bottom: 20px;
  background-color: var(--colour-primary);
  border-radius: 10px;
`;
