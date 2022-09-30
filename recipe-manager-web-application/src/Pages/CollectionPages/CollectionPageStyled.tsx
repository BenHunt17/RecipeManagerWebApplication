import styled from "@emotion/styled";

export const CollectionContainer = styled.div(
  ({ hasData }: { hasData?: boolean }) => ({
    gridTemplateColumns: hasData
      ? "repeat(auto-fill, minmax(500px, 1fr))"
      : "1fr",
    gridTemplateRows: hasData ? "repeat(auto-fill, 206px)" : "1fr",
  }),
  `
  display: grid;
  gap: 25px;
  border: solid 3px var(--colour-dark-grey);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

export const CollectionControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  gap: 25px;
`;
