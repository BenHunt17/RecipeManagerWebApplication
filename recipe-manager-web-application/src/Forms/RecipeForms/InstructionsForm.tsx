/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FormState,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import DynamicList from "../../Components/form/DynamicList";
import TextArea from "../../Components/form/TextArea";
import { RecipeInput, RecipeInstructionInput } from "../../types/recipeTypes";

const InstructionNumber = styled.h4`
  width: 31px;
  color: var(--colour-text);
  margin: 0;
`;

export default function InstructionsForm({
  control,
  fields,
  formState,
  append,
  remove,
}: {
  control: Control<RecipeInput>;
  fields: FieldArrayWithId<
    RecipeInstructionInput[],
    ArrayPath<RecipeInstructionInput[]>,
    "id"
  >[];
  formState: FormState<RecipeInput>;
  append: UseFieldArrayAppend<
    RecipeInstructionInput[],
    ArrayPath<RecipeInstructionInput[]>
  >;
  remove: UseFieldArrayRemove;
}) {
  return (
    <DynamicList
      title="instructions"
      items={fields.map((field, index) => (
        <div
          css={css`
            width: 100%;
          `}
        >
          <FlexContainer
            key={field.id}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={10}
          >
            <InstructionNumber>{index + 1}.</InstructionNumber>
            <div
              css={css`
                min-width: 350px;
                width: 100%;
              `}
            >
              <TextArea
                control={control}
                name={`instructions.${index}.instructionText`}
                rules={{
                  required: "Required Field",
                }}
              />
            </div>
          </FlexContainer>
        </div>
      ))}
      defaultItemsCount={1}
      addItem={() =>
        append({
          instructionNumber: fields.length + 1,
          instructionText: "",
        })
      }
      removeItem={(index: number) => remove(index)}
    />
  );
}
