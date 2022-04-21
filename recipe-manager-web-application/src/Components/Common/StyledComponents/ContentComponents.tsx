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

export const LoadingSpinner = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 10px;
  height: 10px;
  background-color: transparent;
  border: 3px solid rgba(var(--colour-primary-rgb), 0.75);
  border-radius: 50%;
  border-top: 3px solid var(--colour-primary);
  animation: spinner 1.5s linear infinite;
`;

export const ErrorMessage = styled.p`
  color: var(--colour-error);
  font-size: 11px;
  margin: 0px;
`;
