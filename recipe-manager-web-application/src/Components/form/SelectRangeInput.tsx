import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { InputError } from "../Common/StyledComponents/InputComponents";
import RangeInput from "../layouts/RangeInput";
import Select from "./Select";

export default function SelectRangeInput<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    control: Control<T>;
    minName: Path<T>;
    maxName: Path<T>;
    options: U[];
    label: (option: U) => string;
    title?: string;
  }
) {
  const { field, fieldState } = useController(props);

  return (
    <div className="hundredWidth">
      {props.title ?? formatFieldName(field.name, false)}
      <RangeInput>
        <Select
          control={props.control}
          name={props.minName}
          options={props.options}
          label={props.label}
          title=""
        />
        <Select
          control={props.control}
          name={props.maxName}
          options={props.options}
          label={props.label}
          title=""
        />
      </RangeInput>
      <InputError>
        {!!fieldState.error?.message && fieldState.error.message}
      </InputError>
    </div>
  );
}
