import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import Toggle from "../../Components/FormComponents/Toggle";
import {
  ErrorMessage,
  LoadingSpinner,
} from "../../Components/Common/StyledComponents/ContentComponents";
import TextInput from "../../Components/FormComponents/TextInput";
import TextArea from "../../Components/FormComponents/TextArea";
import InputContainer from "../../Components/FormComponents/InputContainer";
import { Recipe } from "../../Types/RecipeTypes";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";

const BottomLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

type RecipeFormData = {
  recipeName: string;
  recipeDescription: string;
  rating: number;
  prepTime: number;
  servingSize: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

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
  const { control, handleSubmit, formState, clearErrors, watch, setValue } =
    useForm<RecipeFormData>({
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

  const onSubmit = (formValues: RecipeFormData) => {
    updateRecipe(JSON.stringify(formValues));
  };

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
        <MainFormLayout>
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
        </MainFormLayout>
        <BottomLayout>
          <InputContainer
            title="Rating*"
            input={
              //TODO - Maybe make each of these exportable components in a utils file or something so that this wordy fform code isn't being duplicated
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
              <ErrorMessage>{formState.errors.rating?.message}</ErrorMessage>
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
              <ErrorMessage>{formState.errors.prepTime?.message}</ErrorMessage>
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
      </FlexContainer>
      {loading ? <LoadingSpinner /> : <SubmitButton>Submit</SubmitButton>}
    </form>
  );
}
