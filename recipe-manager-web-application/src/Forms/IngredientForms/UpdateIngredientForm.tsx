import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import {
  Ingredient,
  IngredientInput,
  MeasureUnit,
} from "../../types/ingredientTypes";
import Toggle from "../../Components/form/Toggle";
import {
  ErrorMessage,
  LoadingSpinner,
} from "../../Components/Common/StyledComponents/ContentComponents";
import TextInput from "../../Components/form/TextInput";
import TextArea from "../../Components/form/TextArea";
import Select from "../../Components/form/Select";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";

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
  const { control, handleSubmit, formState, watch } = useForm<IngredientInput>({
    defaultValues: extractDefaultValues(existingIngredient),
  });
  const [quantityUnit, setQuantityUnit] = useState<string | undefined>(
    undefined
  );
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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "measureUnit" && value.measureUnit) {
        setQuantityUnit(value.measureUnit);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexContainer
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <FlexContainer
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            gap={25}
          >
            <TextInput
              control={control}
              name="ingredientName"
              rules={{
                required: "Required Field",
                maxLength: { value: 80, message: "Maximum length of 80" },
              }}
            />{" "}
            <TextArea
              control={control}
              name="ingredientDescription"
              rules={{
                maxLength: { value: 512, message: "Maximum length of 512" },
              }}
            />
          </FlexContainer>
          <FlexContainer
            direction="row"
            justifyContent="center"
            margin="10px 0 10px 0"
          >
            <Toggle control={control} name="fruitVeg" />
          </FlexContainer>
        </FlexContainer>
        <MainFormLayout>
          <Select
            control={control}
            name="measureUnit"
            options={Object.values(MeasureUnit)}
            label={(option) => option}
          />
          <TextInput
            control={control}
            name="quantity"
            rules={{
              required: "Required Field",
            }}
          />
          <TextInput control={control} name="calories" />
          <TextInput control={control} name="salt" />
          <TextInput control={control} name="fat" />
          <TextInput control={control} name="protein" />
          <TextInput control={control} name="carbs" />
        </MainFormLayout>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <SubmitButton type="submit">Submit</SubmitButton>
        )}
      </form>
    </Fragment>
  );
}
