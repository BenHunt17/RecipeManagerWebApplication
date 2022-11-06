import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import {
  minutesToTimeString,
  timeStringToMinutes,
} from "../../Utilities/Recipes";
import { InputError } from "../Common/StyledComponents/InputComponents";

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
