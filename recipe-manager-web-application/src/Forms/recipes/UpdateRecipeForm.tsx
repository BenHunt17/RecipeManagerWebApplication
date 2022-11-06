import { useForm } from "react-hook-form";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import { LoadingSpinner } from "../../Components/Common/StyledComponents/ContentComponents";
import { Recipe, RecipeInput } from "../../types/recipeTypes";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { RecipeForm } from "./RecipeForm";

function extractDefaultValues(existingRecipe: Recipe) {
  return {
    recipeName: existingRecipe.recipeName,
    recipeDescription: existingRecipe.recipeDescription,
    rating: existingRecipe.rating,
    prepTime: existingRecipe.prepTime,
    servingSize: existingRecipe.servingSize,
    breakfast: existingRecipe.breakfast,
    lunch: existingRecipe.lunch,
    dinner: existingRecipe.dinner,
  };
}

export default function UpdateRecipeForm({
  recipeName,
  existingRecipe,
  updateInFetchedRecipe,
  close,
}: {
  recipeName: string;
  existingRecipe: Recipe;
  updateInFetchedRecipe: (updatedRecipe: Recipe) => void;
  close: () => void;
}) {
  const { control, handleSubmit } = useForm<RecipeInput>({
    defaultValues: extractDefaultValues(existingRecipe),
  });

  const { callback: updateRecipe, loading } = useMutate<Recipe>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}`,
    httpMethod: HttpMethod.PUT,
    onComplete: (recipe) => {
      updateInFetchedRecipe(recipe);
      close();
    },
    jsonData: true,
  });

  const onSubmit = (formValues: RecipeInput) => {
    updateRecipe(JSON.stringify(formValues));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RecipeForm control={control} />
      {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
    </form>
  );
}
