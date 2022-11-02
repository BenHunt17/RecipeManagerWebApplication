import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import {
  Ingredient,
  IngredientInput,
  MeasureUnit,
} from "../../types/ingredientTypes";
import { LoadingSpinner } from "../../Components/Common/StyledComponents/ContentComponents";
import IngredientForm from "./IngredientForm";

function extractDefaultValues(existingIngredient: Ingredient) {
  return {
    ingredientName: existingIngredient.ingredientName,
    ingredientDescription: existingIngredient.ingredientDescription,
    MeasureUnit: MeasureUnit.NONE,
    fruitVeg: existingIngredient.fruitVeg,
    quantity: 100,
    calories: existingIngredient.calories,
    fat: existingIngredient.fat ?? 0,
    salt: existingIngredient.salt ?? 0,
    protein: existingIngredient.protein ?? 0,
    carbs: existingIngredient.carbs ?? 0,
  };
}

export default function UpdateIngredientForm({
  ingredientName,
  existingIngredient,
  updateInFetchedIngredient,
  close,
}: {
  ingredientName: string;
  existingIngredient: Ingredient;
  updateInFetchedIngredient: (updatedIngredient: Ingredient) => void;
  close: () => void;
}) {
  const { control, handleSubmit, formState } = useForm<IngredientInput>({
    defaultValues: extractDefaultValues(existingIngredient),
  });
  const { callback: updateIngredient, loading } = useMutate<Ingredient>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredient/${ingredientName}`,
    httpMethod: HttpMethod.PUT,
    onComplete: (ingredient) => {
      updateInFetchedIngredient(ingredient);
      close();
    },
    jsonData: true,
  });

  const onSubmit = (formValues: IngredientInput) => {
    updateIngredient(JSON.stringify(formValues));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IngredientForm control={control} formState={formState} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <SubmitButton type="submit">Submit</SubmitButton>
        )}
      </form>
    </Fragment>
  );
}
