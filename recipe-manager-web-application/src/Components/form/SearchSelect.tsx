/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import OutsideClickProvider from "../Common/OutsideClickProvider";
import Overlay from "../Common/Overlay";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

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

const Option = styled.div`
  background-color: white;
  border-color: transparent;
  padding: 8px;
  &:hover {
    background-color: var(--colour-light-grey);
    cursor: pointer;
  }
`;

function OverlayContent<U>({
  options,
  resultLabel,
  onOptionClick,
  loading,
}: {
  options: U[];
  resultLabel: (result: U) => string;
  onOptionClick: (option: U) => void;
  loading: boolean;
}) {
  if (loading) {
    return <div css={{ padding: 16 }}>Loading</div>;
  }
  if (options.length > 0) {
    return (
      <div css={{ overflowY: "auto" }}>
        {options.map((option) => (
          <Option onClick={() => onOptionClick(option)}>
            {resultLabel?.(option)}
          </Option>
        ))}
      </div>
    );
  }
  return <div css={{ padding: 16 }}>No Results</div>;
}

export default function SearchSelect<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    options: U[];
    loading: boolean;
    onSearch: (searchText: string) => void;
    resultLabel: (result: U) => string;
    placeholder?: string;
  }
) {
  const { field } = useController(props);
  const [searchText, setSearchText] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <OutsideClickProvider callback={() => setShowOverlay(false)}>
      {formatFieldName(field.name, false, false)}
      <FlexContainer>
        <input
          ref={inputRef}
          value={!!field.value ? field.value : searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          disabled={!!field.value}
          placeholder={props.placeholder}
        />
        <SearchSelectButton
          onClick={() => {
            if (!!field.value) {
              field.onChange(undefined);
              return;
            }
            props.onSearch(searchText);
            setShowOverlay(true);
          }}
        >
          {!!field.value ? "x" : "Search"}
        </SearchSelectButton>
      </FlexContainer>
      {showOverlay && (
        <Overlay anchorRef={inputRef}>
          <OverlayContent
            options={props.options}
            resultLabel={props.resultLabel}
            onOptionClick={(option) => {
              field.onChange(option);
              setShowOverlay(false);
            }}
            loading={props.loading}
          />
        </Overlay>
      )}
    </OutsideClickProvider>
  );
}
