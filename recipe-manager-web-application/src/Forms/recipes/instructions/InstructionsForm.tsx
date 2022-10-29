/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FormState,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import FormList from "../../../Components/templates/FormList";
import { InstructionsFormInput } from "../../../types/formTypes";
import { RecipeInstructionInput } from "../../../types/recipeTypes";
import InstructionFieldSection from "./InstructionFieldSection";

export const DEFAULT_INSTRUCTION_FORM_VALUE = {
  instructionNumber: 1,
  instructionText: "",
};

export default function InstructionsForm({
  control,
  fields,
  formState,
  append,
  remove,
}: {
  control: Control<InstructionsFormInput>;
  fields: FieldArrayWithId<
    RecipeInstructionInput[],
    ArrayPath<RecipeInstructionInput[]>,
    "id"
  >[];
  formState: FormState<InstructionsFormInput>;
  append: UseFieldArrayAppend<
    RecipeInstructionInput[],
    ArrayPath<RecipeInstructionInput[]>
  >;
  remove: UseFieldArrayRemove;
}) {
  return (
    <FormList
      title="instructions"
      sections={fields.map((field, index) => (
        <InstructionFieldSection
          key={field.id}
          fieldId={index}
          control={control}
        />
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
