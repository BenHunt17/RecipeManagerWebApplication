import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SubmitButton } from "../../../Components/Common/styled/buttons";
import { LoadingSpinner } from "../../../Components/Common/styled/output";
import { FormListContainer } from "../../../Components/Common/styled/input";
import useMutate, { HttpMethod } from "../../../hooks/useMutate";
import { InstructionsFormInput } from "../../../types/formTypes";
import { RecipeInstruction } from "../../../types/recipeTypes";
import InstructionsForm from "./InstructionsForm";
import { FlexContainer } from "../../../Components/Common/styled/layouts";

export default function UpdateRecipeIngredientsForm({
  recipeName,
  existingInstructions,
  updateInFetchedRecipe,
  close,
}: {
  recipeName: string;
  existingInstructions: RecipeInstruction[];
  updateInFetchedRecipe: (recipeInstructions: RecipeInstruction[]) => void;
  close: () => void;
}) {
  const { control, handleSubmit } = useForm<InstructionsFormInput>({
    defaultValues: { instructions: existingInstructions }, //Need to have form for entir recipe ingredients since the controller is needed in the recipe ingredients form :/
  });

  const {
    fields: instructionFields,
    append: instructionsAppend,
    remove: instructionsRemove,
  } = useFieldArray({
    control: control,
    name: "instructions",
  });

  const { callback: updateInstructions, loading } = useMutate({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}/recipeinstructions`,
    httpMethod: HttpMethod.PUT,
    onComplete: (recipeInstructions: RecipeInstruction[]) => {
      updateInFetchedRecipe(recipeInstructions);
      close();
    },
    jsonData: true,
  });

  const onSubmit = (formValues: InstructionsFormInput) => {
    updateInstructions(
      JSON.stringify(
        formValues.instructions.map((instruction, index) => {
          return {
            instructionNumber: index + 1,
            instructionText: instruction.instructionText,
          };
        })
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer direction="column" justifyContent="flex-start" gap={25}>
        <FormListContainer>
          <InstructionsForm
            control={control}
            fields={instructionFields}
            append={instructionsAppend}
            remove={instructionsRemove}
          />
        </FormListContainer>
        {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
      </FlexContainer>
    </form>
  );
}
