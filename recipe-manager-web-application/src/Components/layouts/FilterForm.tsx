import styled from "@emotion/styled";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

const GridContainer = styled.div(
  ({ columnCount }: { columnCount: number }) => `
  display: grid;
  grid-template-columns: ${"1fr ".repeat(columnCount)};
  gap: 25px;
`
);

export default function FilterForm({
  rows,
  grid,
  compactGrid,
}: {
  rows?: JSX.Element[];
  grid?: [JSX.Element];
  compactGrid?: JSX.Element[];
}) {
  return (
    <FlexContainer direction="column" gap={25}>
      {rows}
      <GridContainer columnCount={2}>
        {grid?.map((gridItem) => gridItem)}
      </GridContainer>
      <GridContainer columnCount={3}>
        {compactGrid?.map((gridItem) => gridItem)}
      </GridContainer>
    </FlexContainer>
  );
}
