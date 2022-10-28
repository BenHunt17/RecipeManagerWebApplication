import styled from "@emotion/styled";
import { Fragment } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { ErrorMessage } from "../Common/StyledComponents/ContentComponents";

const Input = styled.textarea`
  width: calc(100% - 8px);
  height: 55px;
  resize: none;
  margin-bottom: 8px;
`;

export default function TextArea<T extends FieldValues>(
  props: UseControllerProps<T> & {
    textAreaProps?: React.InputHTMLAttributes<HTMLTextAreaElement>;
    title?: string;
    required?: boolean;
  }
) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      {formatFieldName(field.name, !!props.required, !!props.title)}
      <Input {...field} {...props.textAreaProps} />
      <ErrorMessage>
        {!!fieldState.error?.message && fieldState.error.message}
      </ErrorMessage>
    </div>
  );
}
