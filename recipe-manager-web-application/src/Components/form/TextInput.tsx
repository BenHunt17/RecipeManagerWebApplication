import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { InputError } from "../Common/styled/input";

const Input = styled.input`
  width: calc(100% - 8px);
  height: 25px;
`;

export default function TextInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    title?: string;
    required?: boolean;
  }
) {
  const { field, fieldState } = useController(props);

  return (
    <div className="hundredWidth">
      {props.title ??
        formatFieldName(props.title ?? field.name, !!props.required)}
      <Input {...field} {...props.inputProps} />
      <InputError>
        {!!fieldState.error?.message && fieldState.error.message}
      </InputError>
    </div>
  );
}
