import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const SelectInput = styled.select`
  width: 100%;
  padding: 1px 2px;
  border-width: 2px;
  margin: 0em;
`;

const Option = styled.option`
  border: 3px solid var(--colour-primary);
`;

export default function Select<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    options: U[];
    label: (option: U) => string;
  }
) {
  const { field } = useController(props);

  return (
    <SelectInput {...field}>
      {props.options.map((option) => (
        <Option key={props.label(option)}>{props.label(option)}</Option>
      ))}
    </SelectInput>
  );
}
