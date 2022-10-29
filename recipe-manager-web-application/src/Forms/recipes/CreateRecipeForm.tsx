import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import Toggle from "../../Components/form/Toggle";
import {
  ErrorMessage,
  LoadingSpinner,
} from "../../Components/Common/StyledComponents/ContentComponents";
import ImageUpload from "../../Components/form/ImageUpload";
import TextInput from "../../Components/form/TextInput";
import TextArea from "../../Components/form/TextArea";
import Slider from "../../Components/Common/Slider";
import { Recipe, RecipeInput } from "../../types/recipeTypes";
import InstructionsForm, {
  DEFAULT_INSTRUCTION_FORM_VALUE,
} from "./instructions/InstructionsForm";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";
import RecipeIngredientsForm, {
  DEFAULT_RECIPE_INGREDIENT_FORM_VALUE,
} from "./recipeIngredients/RecipeIngredientsForm";
import {
  InstructionsFormInput,
  RecipeIngredientFormInput,
} from "../../types/formTypes";

const BottomLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

const defaultValues = {
  recipeName: "",
  recipeDescription: "",
  rating: 0,
  prepTime: 0,
  servingSize: 0,
  breakfast: false,
  lunch: false,
  dinner: false,
};

export default function CreateRecipeForm({
  onComplete,
  close,
}: {
  onComplete: (addedRecipe: Recipe) => void;
  close: () => void;
}) {
  const { control, handleSubmit, formState, clearErrors } =
    useForm<RecipeInput>({
      defaultValues,
    });

  const {
    control: recipeIngredientsControl,
    formState: recipeIngredientsFormState,
    watch: recipeIngredientsWatch,
  } = useForm<RecipeIngredientFormInput>({
    defaultValues: {
      ingredients: [DEFAULT_RECIPE_INGREDIENT_FORM_VALUE],
    },
  });

  const {
    control: instructionsControl,
    formState: instructionsFormState,
    watch: instructionsWatch,
    setValue: instructionsSetValue,
  } = useForm<InstructionsFormInput>({
    defaultValues: {
      instructions: [DEFAULT_INSTRUCTION_FORM_VALUE],
    },
  });

  const {
    fields: recipeIngredientFields,
    append: recipeIngredientsAppend,
    remove: recipeIngredientsRemove,
  } = useFieldArray({
    control: recipeIngredientsControl,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: instructionsAppend,
    remove: instructionsRemove,
  } = useFieldArray({
    control: instructionsControl,
    name: "instructions",
  });

  const [ingredientImage, setIngredientImage] = useState<File | null>(null);

  const { callback: createIngredient, loading } = useMutate<Recipe>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe`,
    httpMethod: HttpMethod.POST,
    onComplete: (result: Recipe) => {
      onComplete(result);
      close();
    },
  });

  const recipeIngredients = recipeIngredientsWatch("ingredients");
  const instructions = instructionsWatch("instructions");

  const onSubmit = (formValues: RecipeInput) => {
    const formData = new FormData();

    if (ingredientImage) {
      formData.append("imageFile", ingredientImage);
    }

    formData.append("recipeName", formValues.recipeName);
    formData.append("recipeDescription", formValues.recipeDescription);
    formData.append(
      "recipeIngredients",
      JSON.stringify(
        recipeIngredients.map((recipeIngredient) => {
          return {
            ingredientName: recipeIngredient.ingredient.ingredientName,
            quantity: recipeIngredient.quantity,
          };
        })
      )
    );
    formData.append("instructions", JSON.stringify(instructions));
    formData.append("rating", formValues.rating.toString());
    formData.append("prepTime", formValues.prepTime.toString());
    formData.append("servingSize", formValues.servingSize.toString());
    formData.append("breakfast", formValues.breakfast.toString());
    formData.append("lunch", formValues.lunch.toString());
    formData.append("dinner", formValues.dinner.toString());

    createIngredient(formData);
  };

  useEffect(() => {
    const subscription = instructionsWatch((value, { name }) => {
      if (name === "instructions" && value.instructions) {
        if (
          value.instructions.some(
            (instruction) =>
              (instruction?.instructionNumber ?? 0) >
              (value.instructions?.length ?? 0)
          )
        ) {
          //If the instruction numbers sequence has a gap in it, then will recalculate every number
          instructionsSetValue(
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
  }, [instructionsWatch]);

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
                </FlexContainer>
                <ImageUpload
                  image={ingredientImage}
                  setImage={setIngredientImage}
                />
              </MainFormLayout>
              <BottomLayout>
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
              </BottomLayout>
              <ErrorMessage>
                {formState.errors.breakfast?.message ??
                  formState.errors.lunch?.message ??
                  formState.errors.dinner?.message}
              </ErrorMessage>
            </Fragment>,
            <InstructionsForm
              control={instructionsControl}
              fields={instructionFields}
              formState={instructionsFormState}
              append={instructionsAppend}
              remove={instructionsRemove}
            />,
            <RecipeIngredientsForm
              control={recipeIngredientsControl}
              fields={recipeIngredientFields}
              formState={recipeIngredientsFormState}
              watch={recipeIngredientsWatch}
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
