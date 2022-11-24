import { useFieldArray, useForm } from "react-hook-form";
import { SubmitButton } from "../../../component/styled/buttons";
import { LoadingSpinner } from "../../../component/styled/output";
import { FormListContainer } from "../../../component/styled/input";
import useMutate, { HttpMethod } from "../../../hook/useMutate";
import { RecipeIngredientFormInput } from "../../../type/formTypes";
import { RecipeIngredient } from "../../../type/recipeTypes";
import RecipeIngredientsForm from "./RecipeIngredientsForm";
import { FlexContainer } from "../../../component/styled/layouts";
import { addToRecentActivity } from "../../../util/recentActivityController";
import { ItemKeyContext } from "../../../type/storageTypes";

function extractDefaultValues(existingRecipeIngredients: RecipeIngredient[]) {
  return {
    ingredients: existingRecipeIngredients.map((recipeIngredient) => {
      return {
        ingredient: {
          ingredientName: recipeIngredient.ingredientName,
          measureUnit: recipeIngredient.measureUnit,
        },
        quantity: recipeIngredient.quantity,
      };
    }),
  };
}

export default function UpdateRecipeIngredientsForm({
  recipeName,
  existingRecipeIngredients,
  updateInFetchedRecipe,
  close,
}: {
  recipeName: string;
  existingRecipeIngredients: RecipeIngredient[];
  updateInFetchedRecipe: (recipeIngredients: RecipeIngredient[]) => void;
  close: () => void;
}) {
  const { control, handleSubmit, watch } = useForm<RecipeIngredientFormInput>({
    defaultValues: extractDefaultValues(existingRecipeIngredients), //Need to have form for entir recipe ingredients since the controller is needed in the recipe ingredients form :/
  });

  const {
    fields: recipeIngredientFields,
    append: recipeIngredientsAppend,
    remove: recipeIngredientsRemove,
  } = useFieldArray({
    control: control,
    name: "ingredients",
  });

  const { callback: updateRecipeIngredients, loading } = useMutate<
    RecipeIngredient[]
  >({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}/recipeingredients`,
    httpMethod: HttpMethod.PUT,
    onComplete: (recipeIngredients) => {
      if (!recipeIngredients) {
        return;
      }
      updateInFetchedRecipe(recipeIngredients);
      addToRecentActivity(
        "recipe ingredients",
        recipeName,
        ItemKeyContext.UPDATE,
        `recipe/${recipeName}`,
        null
      );
      close();
    },
  });

  const onSubmit = (formValues: RecipeIngredientFormInput) => {
    updateRecipeIngredients(
      JSON.stringify(
        formValues.ingredients.map((recipeIngredient) => {
          return {
            ingredientName: recipeIngredient.ingredient.ingredientName,
            quantity: recipeIngredient.quantity,
          };
        })
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer direction="column" justifyContent="flex-start" gap={25}>
        <FormListContainer>
          <RecipeIngredientsForm
            control={control}
            fields={recipeIngredientFields}
            watch={watch}
            append={recipeIngredientsAppend}
            remove={recipeIngredientsRemove}
          />
        </FormListContainer>
        {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
      </FlexContainer>
    </form>
  );
}
