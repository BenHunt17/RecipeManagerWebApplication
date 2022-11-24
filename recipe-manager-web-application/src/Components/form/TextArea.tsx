import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../util/form";
import { InputError } from "../styled/input";

const Input = styled.textarea`
  width: calc(100% - 8px);
  height: 55px;
  resize: none;
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
    <div className="hundredWidth">
      {props.title ??
        formatFieldName(props.title ?? field.name, !!props.required)}
      <Input {...field} {...props.textAreaProps} />
      <InputError>
        {!!fieldState.error?.message && fieldState.error.message}
      </InputError>
    </div>
  );
}
