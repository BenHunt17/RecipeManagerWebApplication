import styled from "@emotion/styled";

export const CollectionContainer = styled.div(
  ({ hasData }: { hasData?: boolean }) => ({
    gridTemplateColumns: hasData
      ? "repeat(auto-fill, minmax(500px, 1fr))"
      : "1fr",
  }),
  `
  display: grid;
  grid-template-rows: 1fr;
  gap: 25px;
  border: solid 3px var(--colour-border);
  border-radius: 10px;
  padding: 20px;
  height: calc(100% - 170px); //Full height minus collection header and padding
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
);

export const CollectionHeader = styled.div`
  height: 100px;
`;
