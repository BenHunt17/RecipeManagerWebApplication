import { Control } from "react-hook-form";
import { FlexContainer } from "../../component/styled/layouts";
import Select from "../../component/form/Select";
import TextArea from "../../component/form/TextArea";
import TextInput from "../../component/form/TextInput";
import Toggle from "../../component/form/Toggle";
import StandardForm from "../../component/layout/StandardForm";
import { IngredientInput, MeasureUnit } from "../../type/ingredientTypes";
import { measureUnitToString } from "../../util/ingredient";

export default function IngredientForm({
  control,
  ingredientImageController,
}: {
  control: Control<IngredientInput>;
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
            required
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
            required
          />
          <Select
            control={control}
            name="measureUnit"
            options={Object.values(MeasureUnit)}
            label={(option) => measureUnitToString(option)}
            rules={{
              required: "Required Field",
            }}
            required
          />
        </FlexContainer>,
        <TextInput
          control={control}
          name="calories"
          rules={{
            required: "Required Field",
          }}
          required
        />,
        <TextInput control={control} name="salt" />,
        <TextInput control={control} name="fat" />,
        <TextInput control={control} name="protein" />,
        <TextInput control={control} name="carbs" />,
      ]}
    />
  );
}
