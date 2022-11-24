import styled from "@emotion/styled";
import { useState } from "react";
import FilterIcon from "../../svg/FilterIcon";
import { IconButton, SearchButton } from "../styled/buttons";
import { SearchBar } from "../styled/input";
import { FlexContainer } from "../styled/layouts";

const SearchBarContainer = styled.div`
  position: relative;
`;

const ClearButton = styled.button`
  position: absolute;
  top: 11px;
  right: 16px;
  color: var(--colour-primary);
  font-size: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default function SearchAndFilter({
  onSearch,
  showFilterModal,
  filterCount,
}: {
  onSearch: (query: string) => void;
  showFilterModal: () => void;
  filterCount: number;
}) {
  const [searchBarText, setSearchBarText] = useState("");

  return (
    <FlexContainer
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <SearchBarContainer>
        <SearchBar
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value)}
          placeholder="Name"
        />
        {!!searchBarText.length && (
          <ClearButton onClick={() => setSearchBarText("")}>x</ClearButton>
        )}
      </SearchBarContainer>
      <SearchButton onClick={() => onSearch(searchBarText)}>
        Search
      </SearchButton>
      <IconButton onClick={showFilterModal}>
        <FilterIcon width={20} height={20} />
      </IconButton>
      {!!filterCount && <p>{`(${filterCount})`}</p>}
    </FlexContainer>
  );
}
