import { FieldValues, Path, UseControllerProps } from "react-hook-form";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";
import TextInput from "./TextInput";

export default function RangeInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    type?: React.HTMLInputTypeAttribute;
    minName: Path<T>;
    maxName: Path<T>;
  }
) {
  return (
    <FlexContainer direction="row" justifyContent="space-between">
      <TextInput
        {...props}
        name={props.minName}
        rules={{ pattern: /^[0-9]+$|^$/ }}
      />
      <TextInput
        {...props}
        name={props.maxName}
        rules={{ pattern: /^[0-9]+$|^$/ }}
      />
    </FlexContainer>
  );
}
