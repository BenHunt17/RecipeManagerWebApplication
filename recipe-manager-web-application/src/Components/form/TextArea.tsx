import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const Input = styled.textarea`
  width: calc(100% - 8px);
  height: 55px;
  resize: none;
`;

export default function TextArea<T extends FieldValues>(
  props: UseControllerProps<T>
) {
  const { field } = useController(props);

  return <Input {...field} />;
}
