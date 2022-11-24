import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../util/form";
import RangeInput from "../layout/RangeInput";
import TimeInput from "./TimeInput";

export default function TimeRangeInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    control: Control<T>;
    minName: Path<T>;
    maxName: Path<T>;
  }
) {
  const { field } = useController(props);

  return (
    <div className="hundredWidth">
      {formatFieldName(field.name, false)}
      <RangeInput>
        <TimeInput control={props.control} name={props.minName} title="" />
        <TimeInput control={props.control} name={props.maxName} title="" />
      </RangeInput>
    </div>
  );
}
