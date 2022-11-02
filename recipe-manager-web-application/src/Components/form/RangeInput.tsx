import { Fragment } from "react";
import {
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import {
  ErrorMessage,
  TightParagraph,
} from "../Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";
import TextInput from "./TextInput";

export default function RangeInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    minName: Path<T>;
    maxName: Path<T>;
    minLimit: number;
    maxLimit: number;
    minError?: string;
    maxError?: string;
  }
) {
  const { field } = useController(props);

  return (
    <div>
      <TightParagraph>
        {formatFieldName(field.name, false, false)}
      </TightParagraph>
      <FlexContainer
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={25}
      >
        <TextInput
          {...props}
          name={props.minName}
          rules={{
            validate: (value) =>
              !!value && isNaN(value) ? "must be a number" : true,
            max: {
              value: props.maxLimit,
              message: `must not exceed ${props.maxLimit}`,
            },
            min: {
              value: props.minLimit,
              message: `must not fall below ${props.minLimit}`,
            },
          }}
          inputProps={{ placeholder: `Min value: ${props.minLimit}` }}
          title=""
        />
        <pre>- To -</pre>
        <TextInput
          {...props}
          name={props.maxName}
          rules={{
            validate: (value) =>
              !!value && isNaN(value) ? "must be a number" : true,
            max: {
              value: props.maxLimit,
              message: `must not exceed ${props.maxLimit}`,
            },
            min: {
              value: props.minLimit,
              message: `must not fall below ${props.minLimit}`,
            },
          }}
          inputProps={{ placeholder: `Max value: ${props.maxLimit}` }}
          title=""
        />
      </FlexContainer>
    </div>
  );
}
