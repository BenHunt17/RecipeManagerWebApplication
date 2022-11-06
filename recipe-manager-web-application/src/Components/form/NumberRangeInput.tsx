import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import RangeInput from "../layouts/RangeInput";
import NumberInput from "./NumberInput";

export default function NumberRangeInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    control: Control<T>;
    minName: Path<T>;
    maxName: Path<T>;
    minValue?: number;
    maxValue?: number;
  }
) {
  const { field } = useController(props);

  return (
    <div className="hundredWidth">
      {formatFieldName(field.name)}
      <RangeInput>
        <NumberInput
          control={props.control}
          name={props.minName}
          title=""
          placeholder={`Min value: ${props.minValue}`}
        />
        <NumberInput
          control={props.control}
          name={props.maxName}
          title=""
          placeholder={`Max value: ${props.maxValue}`}
        />
      </RangeInput>
    </div>
  );
}
