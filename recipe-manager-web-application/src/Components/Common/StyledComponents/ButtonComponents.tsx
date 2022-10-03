import styled from "@emotion/styled";

// TODO - Make submit button style more creative
// TODO - Make active/hover style a bit more noticable?
export const SubmitButton = styled.button`
  width: 110px;
  height: 40px;
  border: 1px solid var(--colour-secondary);
  border-radius: 10px;
  box-shadow: 0 2px 2px var(--colour-light-grey);
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

export const AddButton = styled.button`
  width: 178px;
  height: 40px;
  color: white;
  font-weight: bold;
  background-color: var(--colour-primary);
  border: 1px solid var(--colour-light-grey);
  border-radius: 10px;
  box-shadow: 0px 2px 1px rgba(var(--colour-primary-rgb), 0.4);
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

// TODO - Choose better hover/active colors
export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const SelectionButton = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: white;
    filter: brightness(95%);
  }
  &:active {
    background-color: white;
    filter: brightness(90%);
  }
`;

export const SearchButton = styled.button`
  width: 70px;
  height: 40px;
  color: white;
  background-color: var(--colour-primary);
  border: 1px solid var(--colour-primary);
  padding: 2px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
