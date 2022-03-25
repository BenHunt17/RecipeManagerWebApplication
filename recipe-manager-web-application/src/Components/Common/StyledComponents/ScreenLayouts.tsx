import styled from "@emotion/styled";

export const PageTemplate = styled.div`
  margin: 30px 100px 20px 100px;
`;

export const LoadingScreen = styled.div`
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-border);
  font-weight: bold;
  font-size: 28px;
`;

export const ErrorScreen = styled.div`
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-error);
  font-weight: bold;
  font-size: 28px;
`;
