import {
  CollectionContainer,
  CollectionControlsContainer,
  CollectionHeader,
  CollectionHeaderLeftContainer,
} from "../../Pages/CollectionPages/CollectionPageStyled";
import { QueryParameters } from "../../types/commonTypes";
import { getCount } from "../../Utilities/FilterUtilities";
import PageSelector from "../Common/PageSelector";
import SearchAndFilter from "../Common/SearchAndFilter";
import { AddButton } from "../Common/StyledComponents/ButtonComponents";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../Common/StyledComponents/Layouts";

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
