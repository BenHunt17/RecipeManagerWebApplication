import { useFieldArray, useForm } from "react-hook-form";
import { SubmitButton } from "../../../Components/Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../../../Components/Common/StyledComponents/ContentComponents";
import { FormListContainer } from "../../../Components/Common/StyledComponents/InputComponents";
import { FlexContainer } from "../../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../../hooks/useMutate";
import { RecipeIngredientFormInput } from "../../../types/formTypes";
import { RecipeIngredient } from "../../../types/recipeTypes";
import RecipeIngredientsForm from "./RecipeIngredientsForm";

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
  const { control, handleSubmit, formState, watch } =
    useForm<RecipeIngredientFormInput>({
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

  const { callback: updateRecipeIngredients, loading } = useMutate({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}/recipeingredients`,
    httpMethod: HttpMethod.PUT,
    onComplete: (recipeIngredients: RecipeIngredient[]) => {
      updateInFetchedRecipe(recipeIngredients);
      close();
    },
    jsonData: true,
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
