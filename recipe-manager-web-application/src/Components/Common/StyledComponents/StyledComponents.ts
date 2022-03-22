import styled from "@emotion/styled";

//TODO seperate these components out into categorised files

export const PageTemplate = styled.div`
  margin: 30px 100px 0 100px;
`;

export const FlexContainer = styled.div(
  ({
    direction,
    justifyContent,
    alignItems,
    gap,
  }: {
    direction: "row" | "column";
    justifyContent:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "initial"
      | "inherit";
    alignItems?:
      | "stretch"
      | "center"
      | "flex-start"
      | "flex-end"
      | "baseline"
      | "initial"
      | "inherit";
    gap?: number;
  }) => ({
    display: "flex",
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItems,
    gap: `${gap}px`,
  })
);

export const Label = styled.div`
  background-color: var(--colour-primary);
  color: white;
  border: 1px solid var(--colour-secondary);
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

export const ImageFrame = styled.div`
  padding: 10px;
  padding-bottom: 20px;
  background-color: var(--colour-primary);
  border-radius: 10px;
`;
