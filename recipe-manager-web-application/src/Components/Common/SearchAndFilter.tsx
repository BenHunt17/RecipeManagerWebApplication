import { useState } from "react";
import { SearchButton } from "./StyledComponents/ButtonComponents";
import { SearchBar } from "./StyledComponents/InputComponents";
import { FlexContainer } from "./StyledComponents/ShortcutComponents";

export default function SearchAndFilter({
  onSearch,
  showFilterModal,
}: {
  onSearch: (query: string) => void;
  showFilterModal: () => void;
}) {
  const [searchBarText, setSearchBarText] = useState("");

  return (
    <FlexContainer direction="row" justifyContent="flex-start">
      <SearchBar
        value={searchBarText}
        onChange={(e) => setSearchBarText(e.target.value)}
        placeholder="ingredient name"
      />
      <SearchButton onClick={() => onSearch(searchBarText)}>
        Search
      </SearchButton>
      <button onClick={showFilterModal}>Filter</button>
    </FlexContainer>
  );
}
