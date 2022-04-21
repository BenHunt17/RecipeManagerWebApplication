import styled from "@emotion/styled";
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
  props: UseControllerProps<T>
) {
  const { field } = useController(props);

  return <Input {...field} />;
}
