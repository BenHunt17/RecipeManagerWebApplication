import styled from "@emotion/styled";

export const SearchBar = styled.input`
  height: 30px;
  width: 300px;
  border: 1px solid var(--colour-primary);
  padding: 4px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  &:focus {
    outline: none;
    border: 2px solid var(--colour-primary);
    padding: 3px;
  }
`;

export const InputError = styled.p`
  position: absolute;
  font-size: 11px;
  color: var(--colour-error);
  margin: 0px;
  margin-top: 1px;
`;
