/** @jsxImportSource @emotion/react */

import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import FormList from "../../../component/form/formList/FormList";
import { InstructionsFormInput } from "../../../type/formTypes";
import { RecipeInstructionInput } from "../../../type/recipeTypes";
import InstructionFieldSection from "./InstructionFieldSection";

export const DEFAULT_INSTRUCTION_FORM_VALUE = {
  instructionNumber: 1,
  instructionText: "",
};

export default function InstructionsForm({
  control,
  fields,
  append,
  remove,
}: {
  control: Control<InstructionsFormInput>;
  fields: FieldArrayWithId<
    RecipeInstructionInput[],
    ArrayPath<RecipeInstructionInput[]>,
    "id"
  >[];
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
