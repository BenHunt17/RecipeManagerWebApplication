import styled from "@emotion/styled";

//Exists purely to provide abstraction for using common processes such as flex box

export const FlexContainer = styled.div(
  ({
    direction = "row",
    justifyContent = "space-between",
    alignItems,
    flexBasis,
    flexGrow,
    gap,
    margin,
    width,
  }: {
    direction?: "row" | "column";
    justifyContent?:
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
    flexBasis?: number | string;
    flexGrow?: number;
    gap?: number;
    margin?: string;
    width?: number | string;
  }) => ({
    display: "flex",
    flexDirection: direction,
    justifyContent,
    alignItems,
    flexGrow,
    flexBasis,
    gap: `${gap}px`,
    margin: margin,
    width: width,
  })
);
