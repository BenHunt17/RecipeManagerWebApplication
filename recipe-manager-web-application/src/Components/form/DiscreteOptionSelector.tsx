import styled from "@emotion/styled";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { formatFieldName } from "../../Utilities/formUtils";

export const OptionsContainer = styled.div(
  ({ width }: { width?: number }) => `
  width:${width ? `${width}px` : "100%"};
  display: flex;
  justify-content: space-around;
  background-color: rgba(var(--colour-secondary-rgb), 0.2);
  border: 2px solid var(--colour-secondary);
  border-radius: 10px;
  overflow: hidden;
`
);

export const OptionBox = styled.div(
  ({ selected }: { selected?: boolean }) =>
    `
    width: 100%;
    padding: 10px;
    color: ${selected ? "white" : "var(--colour-text)"};
    background-color: ${
      selected
        ? "rgba(var(--colour-primary-rgb), 0.7)"
        : "rgba(var(--colour-secondary-rgb), 0.1)"
    };
    border-left: 2px solid var(--colour-secondary);
    border-right: 2px solid var(--colour-secondary);
    cursor: pointer;
    `
);

export default function DiscreteOptionSelector<T extends FieldValues, U>(
  props: UseControllerProps<T> & {
    id: string;
    options: U[];
    label: (option: U) => string;
    deepEqual?: (optionA: U, optionB: U) => boolean;
    width?: number;
  }
) {
  const { field } = useController(props);

  return (
    <div className="hundredWidth">
      {formatFieldName(field.name, false, false)}
      <OptionsContainer width={props.width}>
        {props.options.map((option) => (
          <OptionBox
            key={`${props.id}.option.${props.label(option)}`}
            selected={
              props.deepEqual?.(field.value, option) ?? field.value === option
            }
            onClick={() => {
              field.onChange(
                props.deepEqual?.(field.value, option) ?? field.value === option
                  ? null
                  : option
              );
            }}
          >
            {props.label(option)}
          </OptionBox>
        ))}
      </OptionsContainer>
    </div>
  );
}
