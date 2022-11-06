import { FieldValues, UseControllerProps } from "react-hook-form";
import TextInput from "./TextInput";

export default function NumberInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    required?: boolean;
    title?: string;
    maxLimit?: number;
    minLimit?: number;
    placeholder?: string;
  }
) {
  return (
    <TextInput
      {...props}
      rules={{
        validate: (value) =>
          !!value && isNaN(value) ? "must be a number" : true,
        max: {
          value: props.maxLimit ?? Infinity,
          message: `must not exceed ${props.maxLimit ?? Infinity}`,
        },
        min: {
          value: props.minLimit ?? -Infinity,
          message: `must not fall below ${props.minLimit ?? -Infinity}`,
        },
      }}
      inputProps={{ placeholder: props.placeholder ?? "" }}
    />
  );
}
