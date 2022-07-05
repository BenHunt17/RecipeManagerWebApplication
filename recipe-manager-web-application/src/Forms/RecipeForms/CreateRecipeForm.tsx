import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import Toggle from "../../Components/FormComponents/Toggle";
import {
  ErrorMessage,
  LoadingSpinner,
} from "../../Components/Common/StyledComponents/ContentComponents";
import ImageUpload from "../../Components/FormComponents/ImageUpload";
import TextInput from "../../Components/FormComponents/TextInput";
import TextArea from "../../Components/FormComponents/TextArea";
import InputContainer from "../../Components/FormComponents/InputContainer";
import Slider from "../../Components/Common/Slider";
import { Recipe } from "../../Types/RecipeTypes";
import RecipeIngredientForm, {
  RecipeIngredientFormData,
} from "./RecipeIngredientForm";
import { InstructionFormData } from "./InstructionsForm";
import InstructionsForm from "./InstructionsForm";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";

const BottomLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

export type RecipeFormData = {
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: RecipeIngredientFormData[];
  instructions: InstructionFormData[];
  rating: number;
  prepTime: number;
  servingSize: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

const defaultValues = {
  recipeName: "",
  recipeDescription: "",
  recipeIngredients: [
    { recipeIngredientId: undefined, quantity: 0, measureTypeValue: "NONE" },
  ],
  instructions: [{ instructionNumber: 1, instructionText: "" }],
  rating: 0,
  prepTime: 0,
  servingSize: 0,
  breakfast: false,
  lunch: false,
  dinner: false,
};

export default function CreateRecipeForm({
  addToFetchedRecipes,
  close,
}: {
  addToFetchedRecipes: (addedRecipe: Recipe) => void;
  close: () => void;
}) {
  const { control, handleSubmit, formState, clearErrors, watch, setValue } =
    useForm<RecipeFormData>({
      defaultValues,
    });

  const {
    fields: recipeIngredientFields,
    append: recipeIngredientsAppend,
    remove: recipeIngredientsRemove,
  } = useFieldArray({
    control: control,
    name: "recipeIngredients",
  });

  const {
    fields: instructionFields,
    append: instructionsAppend,
    remove: instructionsRemove,
  } = useFieldArray({
    control: control,
    name: "instructions",
  });

  const [ingredientImage, setIngredientImage] = useState<File | null>(null);

  const { callback: createIngredient, loading } = useMutate<Recipe>(
    "https://localhost:5001/api/recipe",
    HttpMethod.POST,
    (result: Recipe) => {
      addToFetchedRecipes(result);
      close();
    },
    undefined
  );

  const onSubmit = (formValues: RecipeFormData) => {
    const formData = new FormData();

    if (ingredientImage) {
      formData.append("imageFile", ingredientImage);
    }

    formData.append("recipeName", formValues.recipeName);
    formData.append("recipeDescription", formValues.recipeDescription);
    formData.append(
      "recipeIngredients",
      JSON.stringify(formValues.recipeIngredients)
    );
    formData.append("instructions", JSON.stringify(formValues.instructions));
    formData.append("rating", formValues.rating.toString());
    formData.append("prepTime", formValues.prepTime.toString());
    formData.append("servingSize", formValues.servingSize.toString());
    formData.append("breakfast", formValues.breakfast.toString());
    formData.append("lunch", formValues.lunch.toString());
    formData.append("dinner", formValues.dinner.toString());

    createIngredient(formData);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "instructions" && value.instructions) {
        if (
          value.instructions.some(
            (instruction) =>
              (instruction?.instructionNumber ?? 0) >
              (value.instructions?.length ?? 0)
          )
        ) {
          //If the instruction numbers sequence has a gap in it, then will recalculate every number
          setValue(
            "instructions",
            value.instructions.map((instruction, index) => {
              return {
                instructionNumber: index + 1,
                instructionText: instruction?.instructionText ?? "",
              };
            })
          );
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const validateMealError = (
    breakfast: boolean,
    lunch: boolean,
    dinner: boolean
  ) => {
    //Checks if one of the three meals are true. If not then returns an error message. Else returns true and removes all errors for the meal fields
    if (!(breakfast || lunch || dinner)) {
      //Returns error message if not valid
      return "Recipe must be at least one of the 3 meals of a day";
    } else {
      clearErrors("breakfast"); //Manually removes errors for all three feidls since only one field is updated at a time
      clearErrors("lunch");
      clearErrors("dinner");
      return true;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer direction="column" justifyContent="space-between" gap={25}>
        <Slider
          slides={[
            <Fragment>
              <MainFormLayout>
                <FlexContainer
                  direction="column"
                  justifyContent="space-between"
                  gap={25}
                  margin="0 0 55px 0"
                >
                  <InputContainer
                    title="Recipe Name*"
                    input={
                      <TextInput
                        control={control}
                        name="recipeName"
                        rules={{
                          required: "Required Field",
                          maxLength: {
                            value: 80,
                            message: "Maximum length of 80",
                          },
                        }}
                      />
                    }
                    error={
                      <ErrorMessage>
                        {formState.errors.recipeName?.message}
                      </ErrorMessage>
                    }
                  />
                  <InputContainer
                    title="Recipe Description"
                    input={
                      <TextArea
                        control={control}
                        name="recipeDescription"
                        rules={{
                          maxLength: {
                            value: 512,
                            message: "Maximum length of 512",
                          },
                        }}
                      />
                    }
                  />
                </FlexContainer>
                <ImageUpload
                  image={ingredientImage}
                  setImage={setIngredientImage}
                />
              </MainFormLayout>
              <BottomLayout>
                <InputContainer
                  title="Rating*"
                  input={
                    <TextInput
                      control={control}
                      name="rating"
                      rules={{
                        required: "Required Field",
                        min: {
                          value: 1,
                          message: "Must be greater than 0",
                        },
                        max: {
                          value: 5,
                          message: "Maximum 5",
                        },
                      }}
                    />
                  }
                  error={
                    <ErrorMessage>
                      {formState.errors.rating?.message}
                    </ErrorMessage>
                  }
                />
                <InputContainer
                  title="Prep Time*"
                  input={
                    <TextInput
                      control={control}
                      name="prepTime"
                      rules={{
                        required: "Required Field",
                        min: {
                          value: 0,
                          message: "Must be greater than 0",
                        },
                      }}
                    />
                  }
                  error={
                    <ErrorMessage>
                      {formState.errors.prepTime?.message}
                    </ErrorMessage>
                  }
                />
                <InputContainer
                  title="Serving Size*"
                  input={
                    <TextInput
                      control={control}
                      name="servingSize"
                      rules={{
                        required: "Required Field",
                        min: {
                          value: 1,
                          message: "Must be greater than 0",
                        },
                        max: {
                          value: 12,
                          message: "Maximum 12",
                        },
                      }}
                    />
                  }
                  error={
                    <ErrorMessage>
                      {formState.errors.servingSize?.message}
                    </ErrorMessage>
                  }
                />
                <InputContainer
                  title="Breakfast"
                  input={
                    <Toggle
                      control={control}
                      name="breakfast"
                      rules={{
                        validate: (breakfast) =>
                          validateMealError(
                            !!breakfast,
                            control._formValues.lunch,
                            control._formValues.dinner
                          ),
                      }}
                    />
                  }
                />
                <InputContainer
                  title="Lunch"
                  input={
                    <Toggle
                      control={control}
                      name="lunch"
                      rules={{
                        validate: (lunch) =>
                          validateMealError(
                            control._formValues.breakfast,
                            !!lunch,
                            control._formValues.dinner
                          ),
                      }}
                    />
                  }
                />
                <InputContainer
                  title="Dinner"
                  input={
                    <Toggle
                      control={control}
                      name="dinner"
                      rules={{
                        validate: (dinner) =>
                          validateMealError(
                            control._formValues.breakfast,
                            control._formValues.lunch,
                            !!dinner
                          ),
                      }}
                    />
                  }
                />
              </BottomLayout>
              <ErrorMessage>
                {formState.errors.breakfast?.message ??
                  formState.errors.lunch?.message ??
                  formState.errors.dinner?.message}
              </ErrorMessage>
            </Fragment>,
            <InstructionsForm
              control={control}
              fields={instructionFields}
              formState={formState}
              append={instructionsAppend}
              remove={instructionsRemove}
            />,
            <RecipeIngredientForm
              control={control}
              fields={recipeIngredientFields}
              formState={formState}
              append={recipeIngredientsAppend}
              remove={recipeIngredientsRemove}
            />,
          ]}
        />
        {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
      </FlexContainer>
    </form>
  );
}
