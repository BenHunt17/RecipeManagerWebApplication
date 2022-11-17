import { useFieldArray, useForm } from "react-hook-form";
import { SubmitButton } from "../../../components/styled/buttons";
import { LoadingSpinner } from "../../../components/styled/output";
import { FormListContainer } from "../../../components/styled/input";
import useMutate, { HttpMethod } from "../../../hooks/useMutate";
import { InstructionsFormInput } from "../../../types/formTypes";
import { RecipeInstruction } from "../../../types/recipeTypes";
import InstructionsForm from "./InstructionsForm";
import { FlexContainer } from "../../../components/styled/layouts";
import { addToRecentActivity } from "../../../utils/recentActivityController";
import { ItemKeyContext } from "../../../types/storageTypes";

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
      addToRecentActivity(
        "recipe instructions",
        recipeName,
        ItemKeyContext.UPDATE,
        `recipe/${recipeName}`,
        null
      );
      close();
    },
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
