import { Control, FormState } from "react-hook-form";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import Select from "../../Components/form/Select";
import TextArea from "../../Components/form/TextArea";
import TextInput from "../../Components/form/TextInput";
import Toggle from "../../Components/form/Toggle";
import StandardForm from "../../Components/layouts/StandardForm";
import { IngredientInput, MeasureUnit } from "../../types/ingredientTypes";

export default function IngredientForm({
  control,
  formState,
  ingredientImageController,
}: {
  control: Control<IngredientInput>;
  formState: FormState<IngredientInput>;
  ingredientImageController?: {
    value: File | null;
    onChange: React.Dispatch<React.SetStateAction<File | null>>;
  };
}) {
  return (
    <StandardForm
      basicFields={{
        nameField: (
          <TextInput
            control={control}
            name="ingredientName"
            rules={{
              required: "Required Field",
              maxLength: { value: 80, message: "Maximum length of 80" },
            }}
          />
        ),
        descriptionField: (
          <TextArea
            control={control}
            name="ingredientDescription"
            rules={{
              maxLength: { value: 512, message: "Maximum length of 512" },
            }}
          />
        ),
      }}
      imageController={ingredientImageController}
      centerFields={[
        <Toggle control={control} name="fruitVeg" title="Fruit / Veg" />,
      ]}
      gridFields={[
        <FlexContainer gap={10} width="100%">
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
        </FlexContainer>,
        <TextInput
          control={control}
          name="calories"
          rules={{
            required: "Required Field",
          }}
        />,
        <TextInput control={control} name="salt" />,
        <TextInput control={control} name="fat" />,
        <TextInput control={control} name="protein" />,
        <TextInput control={control} name="carbs" />,
      ]}
    />
  );
}
