import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../util/form";
import { minutesToTimeString, timeStringToMinutes } from "../../util/recipe";
import { InputError } from "../styled/input";

export default function TimeInput<T extends FieldValues>(
  props: UseControllerProps<T> & { required?: boolean; title?: string }
) {
  const { field, fieldState } = useController(props);

  return (
    <div className="hundredWidth">
      {props.title ?? formatFieldName(field.name, !!props.required)}
      <input
        type="time"
        value={minutesToTimeString(field.value)}
        onChange={(e) => {
          field.onChange(timeStringToMinutes(e.target.value));
        }}
      />
      <InputError>
        {!!fieldState.error?.message && fieldState.error.message}
      </InputError>
    </div>
  );
}
