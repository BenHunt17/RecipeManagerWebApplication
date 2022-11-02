import { useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";
import { OptionBox, OptionsContainer } from "./DiscreteOptionSelector";

export default function NumberSelector<T extends FieldValues>(
  props: UseControllerProps<T> & {
    id: string;
    options: number[];
    width?: number;
  }
) {
  const { field } = useController(props);
  const [tick, setTick] = useState(0);

  const onChange = (option: number) => {
    if (tick % 2 === 0) {
      field.onChange({ min: undefined, max: undefined, trueValue: option });
    } else {
      if (option !== field.value.trueValue) {
        field.onChange({
          min: Math.min(field.value.trueValue, option),
          max: Math.max(field.value.trueValue, option),
          trueValue: undefined,
        });
      }
    }
    setTick(tick + 1);
  };

  return (
    <div className="hundredWidth">
      {formatFieldName(field.name, false, false)}
      <OptionsContainer width={props.width}>
        {props.options.map((option) => (
          <OptionBox
            key={`${props.id}.option.${option}`}
            selected={
              option === field.value.min ||
              option === field.value.max ||
              option === field.value.trueValue
            }
            onClick={() => {
              onChange(option);
            }}
          >
            {option}
          </OptionBox>
        ))}
      </OptionsContainer>
    </div>
  );
}
