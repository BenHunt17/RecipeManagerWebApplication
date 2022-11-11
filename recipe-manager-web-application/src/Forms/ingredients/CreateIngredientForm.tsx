import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../components/styled/buttons";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import {
  Ingredient,
  IngredientInput,
  MeasureUnit,
} from "../../types/ingredientTypes";
import { LoadingSpinner } from "../../components/styled/output";
import IngredientForm from "./IngredientForm";

const defaultValues = {
  ingredientName: "",
  ingredientDescription: "",
  density: 0,
  MeasureUnit: MeasureUnit.NONE,
  fruitVeg: false,
  quantity: 100,
  calories: 0,
  fat: undefined,
  salt: undefined,
  protein: undefined,
  carbs: undefined,
};

export default function CreateIngredientForm({
  onComplete,
  close,
}: {
  onComplete: (addedIngredient: Ingredient) => void;
  close: () => void;
}) {
  const { control, handleSubmit } = useForm<IngredientInput>({
    defaultValues,
  });
  const [ingredientImage, setIngredientImage] = useState<File | null>(null);
  const { callback: createIngredient, loading } = useMutate<Ingredient>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredient`,
    httpMethod: HttpMethod.POST,
    onComplete: (result: Ingredient) => {
      onComplete(result);
      close();
    },
  });

  const onSubmit = (formValues: IngredientInput) => {
    const formData = new FormData();

    if (ingredientImage) {
      formData.append("imageFile", ingredientImage);
    }
    if (formValues.fat) {
      formData.append("fat", formValues.fat.toString());
    }
    if (formValues.salt) {
      formData.append("salt", formValues.salt.toString());
    }
    if (formValues.protein) {
      formData.append("protein", formValues.protein.toString());
    }
    if (formValues.carbs) {
      formData.append("carbs", formValues.carbs.toString());
    }

    formData.append("ingredientName", formValues.ingredientName);
    formData.append("ingredientDescription", formValues.ingredientDescription);
    formData.append("calories", formValues.calories.toString());
    formData.append("fruitVeg", formValues.fruitVeg.toString());
    formData.append("measureUnit", formValues.measureUnit);
    formData.append("quantity", formValues.quantity.toString());

    createIngredient(formData);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IngredientForm
          control={control}
          ingredientImageController={{
            value: ingredientImage,
            onChange: setIngredientImage,
          }}
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <SubmitButton type="submit">Submit</SubmitButton>
        )}
      </form>
    </Fragment>
  );
}
