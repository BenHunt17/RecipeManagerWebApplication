import styled from "@emotion/styled";
import { HTMLProps } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const Input = styled.input`
  width: calc(100% - 8px);
  height: 25px;
`;

export default function TextInput<T extends FieldValues>(
  props: UseControllerProps<T> & { type?: React.HTMLInputTypeAttribute }
) {
  const { field } = useController(props);

  return <Input type={props.type} {...field} />;
}
