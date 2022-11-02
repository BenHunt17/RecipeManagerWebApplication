import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { ErrorMessage } from "../Common/StyledComponents/ContentComponents";

const Input = styled.input`
  width: calc(100% - 8px);
  height: 25px;
  margin-bottom: 8px;
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
      {formatFieldName(
        props.title ?? field.name,
        !!props.required,
        !!props.title
      )}
      <Input {...field} {...props.inputProps} />
      <ErrorMessage>
        {!!fieldState.error?.message && fieldState.error.message}
      </ErrorMessage>
    </div>
  );
}
