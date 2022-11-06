import styled from "@emotion/styled";

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

export const TightParagraph = styled.p`
  margin: 0;
`;
