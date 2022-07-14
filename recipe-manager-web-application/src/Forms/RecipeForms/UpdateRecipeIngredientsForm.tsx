import { useFieldArray, useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import { Recipe, RecipeIngredient, RecipeInput } from "../../Types/RecipeTypes";
import RecipeIngredientsForm from "./RecipeIngredientsForm";

function extractDefaultValues(existingRecipeIngredients: RecipeIngredient[]) {
  return {
    recipeName: "",
    recipeDescription: "",
    recipeIngredients: existingRecipeIngredients.map((recipeIngredient) => {
      return {
        ingredientId: recipeIngredient.ingredientId,
        quantity: recipeIngredient.quantity,
        measureTypeValue: recipeIngredient.measureType,
      };
    }),
    instructions: [],
    rating: 0,
    prepTime: 0,
    servingSize: 0,
    breakfast: false,
    lunch: false,
    dinner: false,
  };
}

export default function UpdateRecipeIngredientsForm({
  id,
  existingRecipeIngredients,
  updateInFetchedRecipe,
  close,
}: {
  id: string;
  existingRecipeIngredients: RecipeIngredient[];
  updateInFetchedRecipe: (recipe: Recipe) => void;
  close: () => void;
}) {
  const { control, handleSubmit, formState, watch } = useForm<RecipeInput>({
    defaultValues: extractDefaultValues(existingRecipeIngredients), //Need to have form for entir recipe ingredients since the controller is needed in the recipe ingredients form :/
  });

  const {
    fields: recipeIngredientFields,
    append: recipeIngredientsAppend,
    remove: recipeIngredientsRemove,
  } = useFieldArray({
    control: control,
    name: "recipeIngredients",
  });

  const { callback: updateRecipeIngredients, loading } = useMutate<Recipe>(
    `https://localhost:5001/api/recipe/${id}/recipeingredients`,
    HttpMethod.PUT,
    (recipe: Recipe) => {
      updateInFetchedRecipe(recipe);
      close();
    },
    undefined,
    true
  );

  const onSubmit = (formValues: RecipeInput) => {
    updateRecipeIngredients(JSON.stringify(formValues.recipeIngredients)); //Only stringifies the recipe ingredients
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer direction="column" justifyContent="flex-start" gap={25}>
        <RecipeIngredientsForm
          control={control}
          fields={recipeIngredientFields}
          formState={formState}
          watch={watch}
          append={recipeIngredientsAppend}
          remove={recipeIngredientsRemove}
        />
        {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
      </FlexContainer>
    </form>
  );
}
