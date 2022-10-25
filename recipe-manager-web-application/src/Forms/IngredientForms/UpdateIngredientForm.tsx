import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import {
  Ingredient,
  IngredientInput,
  MeasureUnit,
} from "../../types/ingredientTypes";
import Toggle from "../../Components/FormComponents/Toggle";
import {
  ErrorMessage,
  LoadingSpinner,
} from "../../Components/Common/StyledComponents/ContentComponents";
import TextInput from "../../Components/FormComponents/TextInput";
import TextArea from "../../Components/FormComponents/TextArea";
import InputContainer from "../../Components/FormComponents/InputContainer";
import Select from "../../Components/FormComponents/Select";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";
import { json } from "stream/consumers";

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
            <InputContainer
              title="Ingredient Name*"
              input={
                <TextInput
                  control={control}
                  name="ingredientName"
                  rules={{
                    required: "Required Field",
                    maxLength: { value: 80, message: "Maximum length of 80" },
                  }}
                />
              }
              error={
                <ErrorMessage>
                  {formState.errors.ingredientName?.message}
                </ErrorMessage>
              }
            />
            <InputContainer
              title="Ingredient Description"
              input={
                <TextArea
                  control={control}
                  name="ingredientDescription"
                  rules={{
                    maxLength: { value: 512, message: "Maximum length of 512" },
                  }}
                />
              }
            />
          </FlexContainer>
          <FlexContainer
            direction="row"
            justifyContent="center"
            margin="10px 0 10px 0"
          >
            <InputContainer
              title="Fruit/Veg"
              input={<Toggle control={control} name="fruitVeg" />}
            />
          </FlexContainer>
        </FlexContainer>
        <MainFormLayout>
          <InputContainer
            title="Measure Unit*"
            input={
              <Select
                control={control}
                name="measureUnit"
                options={Object.values(MeasureUnit)}
                label={(option) => option}
              />
            }
          />
          <InputContainer
            title={`${
              quantityUnit ? `Quantity (${quantityUnit})` : "Quantity"
            }`}
            input={
              <TextInput
                control={control}
                name="quantity"
                rules={{
                  required: "Required Field",
                }}
              />
            }
            error={
              <ErrorMessage>{formState.errors.quantity?.message}</ErrorMessage>
            }
          />
          <InputContainer
            title="Calories"
            input={<TextInput control={control} name="calories" />}
          />
          <InputContainer
            title="Salt"
            input={<TextInput control={control} name="salt" />}
          />
          <InputContainer
            title="Fat"
            input={<TextInput control={control} name="fat" />}
          />
          <InputContainer
            title="Protein"
            input={<TextInput control={control} name="protein" />}
          />
          <InputContainer
            title="Carbs"
            input={<TextInput control={control} name="carbs" />}
          />
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
