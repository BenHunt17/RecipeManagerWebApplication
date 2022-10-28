import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
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
import ImageUpload from "../../Components/form/ImageUpload";
import TextInput from "../../Components/form/TextInput";
import TextArea from "../../Components/form/TextArea";
import Select from "../../Components/form/Select";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";

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
  const { control, handleSubmit, formState, watch } = useForm<IngredientInput>({
    defaultValues,
  });
  const [ingredientImage, setIngredientImage] = useState<File | null>(null);
  const [quantityUnit, setQuantityUnit] = useState<string | undefined>(
    undefined
  );
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
        <MainFormLayout>
          <FlexContainer
            direction="column"
            justifyContent="space-between"
            gap={25}
            margin="0 0 55px 0"
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
            <Toggle control={control} name="fruitVeg" title="Fruit / Veg" />
          </FlexContainer>
          <ImageUpload image={ingredientImage} setImage={setIngredientImage} />
          <FlexContainer
            direction="row"
            width={250}
            justifyContent="space-between"
            gap={10}
          >
            <TextInput
              control={control}
              name="quantity"
              rules={{
                required: "Required Field",
              }}
            />
            <Select
              control={control}
              name="measureUnit"
              options={Object.values(MeasureUnit)}
              label={(option) => option}
            />
            <TextInput
              control={control}
              name="calories"
              rules={{
                required: "Required Field",
              }}
            />
            <TextInput control={control} name="salt" />
            <TextInput control={control} name="fat" />
            <TextInput control={control} name="protein" />
            <TextInput control={control} name="carbs" />
          </FlexContainer>
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
