import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const SelectInput = styled.select`
  width: 100%;
  height: 25px;
  padding: 1px 2px;
  border-width: 2px;
  margin: 0em;
`;

export default function Select<T extends FieldValues>(
  props: UseControllerProps<T> & {
    options: string[];
  }
) {
  //TODO - Maybe redo this component from scratch because there no way to manage a list of type T and use a string display
  const { field } = useController(props);

  return (
    <SelectInput {...field}>
      {props.options.map((option) => (
        <option
          style={{ border: "3px solid var(--colour-primary)" }}
          key={`select.${option}`}
        >
          {option}
        </option>
      ))}
    </SelectInput>
  );
}
