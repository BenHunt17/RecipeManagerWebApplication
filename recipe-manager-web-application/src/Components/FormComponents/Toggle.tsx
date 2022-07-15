import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const CheckboxInput = styled.input`
  opacity: 0;

  &:checked + span {
    //Adjecent sibling combiner. Gets next span which shares same parent as checkbox. Kinda hacky tbh
    background-color: var(--colour-primary);
  }

  &:checked + span:before {
    left: 30px;
  }
`;

const Handle = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--colour-light-grey);
  border-radius: 3px;

  &:before {
    position: absolute;
    content: "";
    width: 26px;
    height: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 3px;
    transition: 0.4s;
  }
`;

export default function Toggle<T extends FieldValues>(
  props: UseControllerProps<T>
) {
  const { field } = useController(props);

  return (
    <ToggleContainer>
      <CheckboxInput type="checkbox" checked={field.value} {...field} />{" "}
      {/* Have to explicitely passthe value in as checked since checkbox originally reset when rerendered */}
      <Handle />
    </ToggleContainer>
  );
}
