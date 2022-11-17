import styled from "@emotion/styled";
import { QueryParameters } from "../../types/commonTypes";
import { getCount } from "../../utils/filterParams";
import PageSelector from "../common/PageSelector";
import SearchAndFilter from "../common/SearchAndFilter";
import { AddButton } from "../styled/buttons";
import { PageTemplate } from "../styled/layouts";
import { ErrorScreen, LoadingScreen } from "../styled/output";

const CollectionContainer = styled.div(
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

export const CollectionHeaderLeftContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  gap: 25px;
`;

interface CollectionPageProps<T> {
  entityName: string;
  data: T[] | undefined;
  loading: boolean;
  renderItem: (item: T) => JSX.Element;
  filter: {
    queryParams: QueryParameters;
    pageNumber: number;
    totalPages: number;
  };
  callbacks: {
    setSearchFilter: (searchString: string) => void;
    setPageNumber: (page: number) => void;
    showFilterModal: () => void;
    showCreateModal: () => void;
  };
}

export default function CollectionPage<T>({
  entityName,
  data,
  loading,
  renderItem,
  filter,
  callbacks,
}: CollectionPageProps<T>) {
  const renderCollectionState = () => {
    if (loading) {
      return <LoadingScreen>Loading {entityName}s...</LoadingScreen>;
    }
    if (!!data) {
      return data.map((item) => renderItem(item));
    }
    return <ErrorScreen>{entityName}s not available</ErrorScreen>;
  };

  return (
    <PageTemplate>
      <CollectionHeader>
        <CollectionHeaderLeftContainer>
          <h2>{entityName}s</h2>
          <CollectionControlsContainer>
            <SearchAndFilter
              onSearch={(query) => callbacks.setSearchFilter(query)}
              showFilterModal={callbacks.showFilterModal}
              filterCount={getCount(filter.queryParams)}
            />
            <PageSelector
              currentPageNumber={filter.pageNumber}
              totalPages={filter.totalPages}
              onSelect={(newPageNumber) =>
                callbacks.setPageNumber(newPageNumber)
              }
            />
          </CollectionControlsContainer>
        </CollectionHeaderLeftContainer>
        <AddButton onClick={callbacks.showCreateModal}>
          Create {entityName}
        </AddButton>
      </CollectionHeader>
      <CollectionContainer hasData={!!data}>
        {renderCollectionState()}
      </CollectionContainer>
    </PageTemplate>
  );
}
