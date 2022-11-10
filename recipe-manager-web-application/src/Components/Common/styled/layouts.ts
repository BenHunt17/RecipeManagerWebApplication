import styled from "@emotion/styled";

export const PageTemplate = styled.div`
  height: calc(100vh - 200px); //Full screen height minus header and margin
  overflow: hidden;
  margin: 30px 100px 20px 100px;
`;

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
    height,
  }: {
    direction?: "row" | "column";
    justifyContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "initial"
      | "inherit"
      | "stretch";
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
    height?: number | string;
  }) => ({
    display: "flex",
    flexDirection: direction,
    justifyContent,
    alignItems,
    flexGrow,
    flexBasis,
    gap: `${gap}px`,
    margin: margin,
    width,
    height,
  })
);
