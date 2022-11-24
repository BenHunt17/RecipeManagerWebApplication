import { Fragment } from "react";
import { Control } from "react-hook-form";
import TextArea from "../../component/form/TextArea";
import TextInput from "../../component/form/TextInput";
import Toggle from "../../component/form/Toggle";
import StandardForm from "../../component/layout/StandardForm";
import { RecipeInput } from "../../type/recipeTypes";

export function RecipeForm({
  control,
  recipeImageController,
}: {
  control: Control<RecipeInput>;
  recipeImageController?: {
    value: File | null;
    onChange: React.Dispatch<React.SetStateAction<File | null>>;
  };
}) {
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
              required
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
          <Toggle control={control} name="breakfast" />,
          <Toggle control={control} name="lunch" />,
          <Toggle control={control} name="dinner" />,
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
            required
          />,
          <TextInput
            control={control}
            name="prepTime"
            rules={{
              required: "Required Field",
              min: {
                value: 1,
                message: "Must be greater than 0",
              },
            }}
            required
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
            required
          />,
        ]}
      />
    </Fragment>
  );
}
