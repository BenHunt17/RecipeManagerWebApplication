import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  minutesToTimeString,
  timeStringToMinutes,
} from "../../Utilities/Recipes";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

export default function TimeRangeInput<T extends FieldValues>(
  props: UseControllerProps<T>
) {
  const { field } = useController(props);

  return (
    <FlexContainer
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={25}
    >
      <input
        type="time"
        value={minutesToTimeString(field.value.min)}
        onChange={(e) => {
          field.onChange({
            min: timeStringToMinutes(e.target.value),
            max: field.value.max,
          });
        }}
      />
      <pre>- To -</pre>
      <input
        type="time"
        value={minutesToTimeString(field.value.max)}
        onChange={(e) =>
          field.onChange({
            min: field.value.min,
            max: timeStringToMinutes(e.target.value),
          })
        }
      />
    </FlexContainer>
  );
}
