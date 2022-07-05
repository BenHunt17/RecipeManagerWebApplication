import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import { Ingredient, QuantityType } from "../../Types/IngredientTypes";
import Toggle from "../../Components/FormComponents/Toggle";
import {
  ErrorMessage,
  LoadingSpinner,
} from "../../Components/Common/StyledComponents/ContentComponents";
import ImageUpload from "../../Components/FormComponents/ImageUpload";
import TextInput from "../../Components/FormComponents/TextInput";
import TextArea from "../../Components/FormComponents/TextArea";
import InputContainer from "../../Components/FormComponents/InputContainer";
import Select from "../../Components/FormComponents/Select";
import {
  IngredientInputData,
  quantityUnitString,
} from "./ingredientFormsUtils";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";

const defaultValues = {
  ingredientName: "",
  ingredientDescription: "",
  density: 0,
  quantityType: QuantityType.NONE,
  fruitVeg: false,
  quantity: 100,
  calories: 0,
  fat: 0,
  salt: 0,
  protein: 0,
  carbs: 0,
};

export default function CreateIngredientForm({
  addToFetchedIngredients,
}: {
  addToFetchedIngredients: (addedIngredient: Ingredient) => void;
}) {
  const { control, handleSubmit, formState, watch } =
    useForm<IngredientInputData>({
      defaultValues,
    });
  const [ingredientImage, setIngredientImage] = useState<File | null>(null);
  const [quantityUnit, setQuantityUnit] = useState<string | undefined>(
    undefined
  );
  const { callback: createIngredient, loading } = useMutate<Ingredient>(
    "https://localhost:5001/api/ingredient",
    HttpMethod.POST,
    (result: Ingredient) => {
      addToFetchedIngredients(result);
    },
    undefined
  );

  const onSubmit = (formValues: IngredientInputData) => {
    const formData = new FormData();

    if (ingredientImage) {
      formData.append("imageFile", ingredientImage);
    }

    formData.append("ingredientName", formValues.ingredientName);
    formData.append("ingredientDescription", formValues.ingredientDescription);
    formData.append("density", formValues.density.toString());
    formData.append("calories", formValues.calories.toString());
    formData.append("fruitVeg", formValues.fruitVeg.toString());
    formData.append("quantityType", formValues.quantityType);
    formData.append("quantity", formValues.quantity.toString());
    formData.append("fat", formValues.fat.toString());
    formData.append("salt", formValues.salt.toString());
    formData.append("protein", formValues.protein.toString());
    formData.append("carbs", formValues.carbs.toString());

    createIngredient(formData);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "quantityType" && value.quantityType) {
        setQuantityUnit(quantityUnitString(value.quantityType));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainFormLayout>
          <FlexContainer
            direction="column"
            justifyContent="space-between"
            gap={25}
            margin="0 0 55px 0"
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
            <InputContainer
              title="Fruit/Veg"
              input={<Toggle control={control} name="fruitVeg" />}
            />
          </FlexContainer>
          <ImageUpload image={ingredientImage} setImage={setIngredientImage} />
          <InputContainer
            title="Quantity Type*"
            input={
              <Select
                control={control}
                name="quantityType"
                options={[
                  QuantityType.NONE,
                  QuantityType.WEIGHT,
                  QuantityType.DISCRETE,
                  QuantityType.VOLUME,
                ]}
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
            title="Density"
            input={<TextInput control={control} name="density" />}
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
