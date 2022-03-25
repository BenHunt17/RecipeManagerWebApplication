import styled from "@emotion/styled";

//Exists purely to provide abstraction for using common processes such as flex box

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
