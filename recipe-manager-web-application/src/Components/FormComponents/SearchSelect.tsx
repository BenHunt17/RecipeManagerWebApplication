/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Fragment, useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Overlay from "../Common/Overlay";
import { SelectionButton } from "../Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";
import Layer from "../Layer";

const INPUT_HORIZONTAL_PADDING = 4;

const SearchSelectButton = styled.button`
  height: 30px;
  width: 75px;
  color: white;
  background-color: var(--colour-primary);
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: none;
  cursor: pointer;
`;

export default function SearchSelect<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    options: U[];
    promptMessage: string;
    onSearch: (searchText: string) => void;
    resultLabel: (result: U) => string;
    loading: boolean;
  }
) {
  const [showOverlay, setShowOverlay] = useState(props.options.length > 0);
  const { field } = useController(props);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchInputWidth =
    searchInputRef.current?.getBoundingClientRect().width ?? 0;

  return (
    <Fragment>
      <FlexContainer direction="row" justifyContent="flex-start">
        <input
          ref={searchInputRef}
          disabled={field.value}
          placeholder={props.promptMessage}
        />
        {field.value ? (
          <SearchSelectButton
            type="button"
            onClick={() => {
              field.onChange("");
              if (searchInputRef.current) {
                searchInputRef.current.value = "";
              }
            }}
          >
            Clear
          </SearchSelectButton>
        ) : props.loading ? (
          <LoadingSpinner />
        ) : (
          <SearchSelectButton
            type="button"
            onClick={() => {
              props.onSearch(searchInputRef.current?.value ?? "");
              setShowOverlay(true);
            }}
          >
            Search
          </SearchSelectButton>
        )}
      </FlexContainer>
      {showOverlay && !!props.options.length && (
        <Layer>
          <Overlay
            anchorRef={searchInputRef}
            onOutsideClick={() => setShowOverlay(false)}
          >
            <div
              css={css`
                width: ${searchInputWidth - INPUT_HORIZONTAL_PADDING}px;
              `}
            >
              {props.options.map((option, index) => {
                const optionLabel = props.resultLabel(option);

                return (
                  <div key={`search-select.search-results.${index}`}>
                    <SelectionButton
                      type="button"
                      onClick={() => {
                        field.onChange(option);
                        if (searchInputRef.current) {
                          searchInputRef.current.value = optionLabel;
                        }
                        setShowOverlay(false);
                      }}
                    >
                      {optionLabel}
                    </SelectionButton>
                  </div>
                );
              })}
            </div>
          </Overlay>
        </Layer>
      )}
    </Fragment>
  );
}
