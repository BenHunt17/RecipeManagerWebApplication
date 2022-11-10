import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { InputError } from "../Common/styled/input";

const SelectInput = styled.select`
  width: 100%;
  height: 31px;
  padding: 1px 2px;
  border-width: 2px;
`;

const Option = styled.option`
  border: 3px solid var(--colour-primary);
`;

export default function Select<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    options: U[];
    label: (option: U) => string;
    required?: boolean;
    title?: string;
  }
) {
  const { field, fieldState } = useController(props);

  const options = [...(!props.required ? [undefined] : []), ...props.options];
  const label = (option: U | undefined) =>
    option !== undefined ? props.label(option) : "-";

  return (
    <div className="hundredWidth">
      {props.title ?? formatFieldName(field.name, !!props.required)}
      <SelectInput
        {...field}
        value={label(field.value)}
        onChange={(e) =>
          field.onChange(
            options.find((option) => label(option) === e.target.value)
          )
        }
      >
        {options.map((option) => (
          <Option key={`${field.name}${label(option)}`}>{label(option)}</Option>
        ))}
      </SelectInput>
      <InputError>
        {!!fieldState.error?.message && fieldState.error.message}
      </InputError>
    </div>
  );
}
