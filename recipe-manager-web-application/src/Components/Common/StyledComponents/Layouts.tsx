import styled from "@emotion/styled";

export const PageTemplate = styled.div`
  height: calc(100vh - 200px); //Full screen height minus header and margin
  overflow: hidden;
  margin: 30px 100px 20px 100px;
`;

export const LoadingScreen = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-dark-grey);
  font-weight: bold;
  font-size: 28px;
  overflow: hidden;
`;

export const ErrorScreen = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-error);
  font-weight: bold;
  font-size: 28px;
  overflow: hidden;
`;

export const MainFormLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;
