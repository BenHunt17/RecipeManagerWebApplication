import { FieldValues, Path, UseControllerProps } from "react-hook-form";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";
import TextInput from "./TextInput";

export default function RangeInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    type?: React.HTMLInputTypeAttribute;
    minName: Path<T>;
    maxName: Path<T>;
    minLimit: number;
    maxLimit: number;
  }
) {
  return (
    <FlexContainer
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={25}
    >
      <TextInput
        {...props}
        name={props.minName}
        rules={{ pattern: /^[0-9]+$|^$/ }}
        inputProps={{ placeholder: `Min value: ${props.minLimit}` }}
      />
      <pre>- To -</pre>
      <TextInput
        {...props}
        name={props.maxName}
        rules={{ pattern: /^[0-9]+$|^$/ }}
        inputProps={{ placeholder: `Max value: ${props.maxLimit}` }}
      />
    </FlexContainer>
  );
}
