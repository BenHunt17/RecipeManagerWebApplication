import styled from "@emotion/styled";
import { Fragment, useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Overlay from "../Common/Overlay";
import { SelectionButton } from "../Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

const SearchAndResetButton = styled.button`
  width: 40px;
  color: white;
  background-color: var(--colour-primary);
  border: none;
  cursor: pointer;
`;

export default function SearchSelect<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    promptMessage: string;
    searchFunction: (searchText: string) => U[];
    resultLabel: (result: U) => string;
  }
) {
  const { field } = useController(props);
  const [searchResults, setSearchResults] = useState<U[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Fragment>
      <FlexContainer direction="row" justifyContent="flex-start">
        <input
          ref={searchInputRef}
          disabled={field.value}
          defaultValue={props.resultLabel(field.value)}
          placeholder={props.promptMessage}
        />
        {field.value ? (
          <SearchAndResetButton
            onClick={() => {
              field.onChange("");
              if (searchInputRef.current) {
                searchInputRef.current.value = "";
              }
            }}
          >
            x
          </SearchAndResetButton>
        ) : (
          <SearchAndResetButton
            type="button"
            onClick={() => {
              setSearchResults(
                props.searchFunction(searchInputRef.current?.value ?? "")
              );
            }}
          >
            -O
          </SearchAndResetButton>
        )}
      </FlexContainer>
      {!!searchResults.length && (
        <Overlay
          anchorRef={searchInputRef}
          onOutsideClick={() => setSearchResults([])}
        >
          <div>
            {searchResults.map((searchResult, index) => {
              const searchResultLabel = props.resultLabel(searchResult);

              return (
                <div key={`search-select.search-results.${index}`}>
                  <SelectionButton
                    type="button"
                    onClick={() => {
                      field.onChange(searchResult);
                      if (searchInputRef.current) {
                        searchInputRef.current.value = searchResultLabel;
                      }
                      setSearchResults([]);
                    }}
                  >
                    {searchResultLabel}
                  </SelectionButton>
                </div>
              );
            })}
          </div>
        </Overlay>
      )}
    </Fragment>
  );
}
