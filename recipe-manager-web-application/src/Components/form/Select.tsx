import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { ErrorMessage } from "../Common/StyledComponents/ContentComponents";

const SelectInput = styled.select`
  width: 100%;
  height: 31px;
  padding: 1px 2px;
  border-width: 2px;
  margin-bottom: 8px;
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

  return (
    <div className="hundredWidth">
      {formatFieldName(field.name, !!props.required, !!props.title)}
      <SelectInput {...field}>
        {props.options.map((option) => (
          <Option key={props.label(option)}>{props.label(option)}</Option>
        ))}
      </SelectInput>
      <ErrorMessage>
        {!!fieldState.error?.message && fieldState.error.message}
      </ErrorMessage>
    </div>
  );
}
