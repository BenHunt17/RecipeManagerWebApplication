import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SubmitButton } from "../../../Components/Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../../hooks/useMutate";
import { InstructionsFormInput } from "../../../types/formTypes";
import { RecipeInstruction } from "../../../types/recipeTypes";
import InstructionsForm from "./InstructionsForm";

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
  const { control, handleSubmit, formState, watch, setValue } =
    useForm<InstructionsFormInput>({
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
    updateInstructions(JSON.stringify(formValues.instructions));
  };

  //TODO - this is used in another form. maybe make a feature hooks file
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "instructions" && value.instructions) {
        if (
          value.instructions.some(
            (instruction) =>
              (instruction?.instructionNumber ?? 0) >
              (value.instructions?.length ?? 0)
          )
        ) {
          //If the instruction numbers sequence has a gap in it, then will recalculate every number
          setValue(
            "instructions",
            value.instructions.map((instruction, index) => {
              return {
                instructionNumber: index + 1,
                instructionText: instruction?.instructionText ?? "",
              };
            })
          );
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer direction="column" justifyContent="flex-start" gap={25}>
        <InstructionsForm
          control={control}
          fields={instructionFields}
          append={instructionsAppend}
          remove={instructionsRemove}
        />
        {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
      </FlexContainer>
    </form>
  );
}
