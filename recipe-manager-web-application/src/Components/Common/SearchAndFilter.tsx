import { useState } from "react";
import { SubmitButton } from "./StyledComponents/ButtonComponents";
import { SearchBar } from "./StyledComponents/InputComponents";
import { FlexContainer } from "./StyledComponents/ShortcutComponents";

export default function SearchAndFilter({
  onSearch,
  showFilterModal,
  onFilterApply,
}: {
  onSearch: (query: string) => void;
  showFilterModal: () => void;
  onFilterApply: (filters: Record<string, string>) => void;
}) {
  const [searchBarText, setSearchBarText] = useState("");

  return (
    <FlexContainer direction="row" justifyContent="flex-start">
      <SearchBar
        value={searchBarText}
        onChange={(e) => setSearchBarText(e.target.value)}
        placeholder="ingredient name"
      />
      <SubmitButton onClick={() => onSearch(searchBarText)}>
        Search
      </SubmitButton>
      <button onClick={showFilterModal}>Filter</button>
    </FlexContainer>
  );
}
