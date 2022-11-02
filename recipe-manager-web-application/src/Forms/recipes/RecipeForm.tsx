import { Fragment } from "react";
import { Control, FormState, UseFormClearErrors } from "react-hook-form";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import TextArea from "../../Components/form/TextArea";
import TextInput from "../../Components/form/TextInput";
import Toggle from "../../Components/form/Toggle";
import StandardForm from "../../Components/layouts/StandardForm";
import { RecipeInput } from "../../types/recipeTypes";

export function RecipeForm({
  control,
  formState,
  clearErrors,
  recipeImageController,
}: {
  control: Control<RecipeInput>;
  formState: FormState<RecipeInput>;
  clearErrors: UseFormClearErrors<RecipeInput>;
  recipeImageController?: {
    value: File | null;
    onChange: React.Dispatch<React.SetStateAction<File | null>>;
  };
}) {
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
    <Fragment>
      <StandardForm
        basicFields={{
          nameField: (
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
          ),
          descriptionField: (
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
          ),
        }}
        imageController={recipeImageController}
        columnFields={[
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
          />,
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
          />,
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
          />,
        ]}
        gridFields={[
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
          />,
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
          />,
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
          />,
        ]}
      />
      <ErrorMessage>
        {formState.errors.breakfast?.message ??
          formState.errors.lunch?.message ??
          formState.errors.dinner?.message}
      </ErrorMessage>
    </Fragment>
  );
}
