import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FlexContainer } from "../../Components/Common/styled/layouts";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import { LoadingSpinner } from "../../Components/Common/styled/output";
import Slider from "./Slider";
import { Recipe, RecipeInput } from "../../types/recipeTypes";
import InstructionsForm, {
  DEFAULT_INSTRUCTION_FORM_VALUE,
} from "./instructions/InstructionsForm";
import { SubmitButton } from "../../Components/Common/styled/buttons";
import RecipeIngredientsForm, {
  DEFAULT_RECIPE_INGREDIENT_FORM_VALUE,
} from "./recipeIngredients/RecipeIngredientsForm";
import {
  InstructionsFormInput,
  RecipeIngredientFormInput,
} from "../../types/formTypes";
import { RecipeForm } from "./RecipeForm";

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
  const { control, handleSubmit } = useForm<RecipeInput>({
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

  const [recipeImage, setRecipeImage] = useState<File | null>(null);

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

    if (recipeImage) {
      formData.append("imageFile", recipeImage);
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
    formData.append(
      "instructions",
      JSON.stringify(
        instructions.map((instruction, index) => {
          return {
            instructionNumber: index + 1,
            instructionText: instruction.instructionText,
          };
        })
      )
    );
    formData.append("rating", formValues.rating.toString());
    formData.append("prepTime", formValues.prepTime.toString());
    formData.append("servingSize", formValues.servingSize.toString());
    formData.append("breakfast", formValues.breakfast.toString());
    formData.append("lunch", formValues.lunch.toString());
    formData.append("dinner", formValues.dinner.toString());

    createIngredient(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer
        direction="column"
        justifyContent="space-between"
        gap={25}
        height="100%"
      >
        <Slider
          slides={[
            <RecipeForm
              control={control}
              recipeImageController={{
                value: recipeImage,
                onChange: setRecipeImage,
              }}
            />,
            <InstructionsForm
              control={instructionsControl}
              fields={instructionFields}
              append={instructionsAppend}
              remove={instructionsRemove}
            />,
            <RecipeIngredientsForm
              control={recipeIngredientsControl}
              fields={recipeIngredientFields}
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
