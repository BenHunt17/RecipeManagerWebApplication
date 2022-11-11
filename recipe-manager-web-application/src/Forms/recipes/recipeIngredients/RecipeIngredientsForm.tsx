import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormWatch,
} from "react-hook-form";
import {
  IngredientListItem,
  MeasureUnit,
} from "../../../types/ingredientTypes";
import { RecipeIngredientInput } from "../../../types/recipeTypes";
import FormList from "../../../components/form/formList/FormList";
import { RecipeIngredientFieldSection } from "./RecipeIngredientFieldSection";
import { RecipeIngredientFormInput } from "../../../types/formTypes";

export const DEFAULT_RECIPE_INGREDIENT_FORM_VALUE = {
  ingredient: { ingredientName: "", measureUnit: MeasureUnit.NONE },
  quantity: 0,
};

export default function RecipeIngredientsForm({
  control,
  fields,
  watch,
  append,
  remove,
}: {
  control: Control<RecipeIngredientFormInput>;
  fields: FieldArrayWithId<
    IngredientListItem[],
    ArrayPath<RecipeIngredientInput[]>,
    "id"
  >[];
  watch: UseFormWatch<RecipeIngredientFormInput>;
  append: UseFieldArrayAppend<
    RecipeIngredientInput[],
    ArrayPath<RecipeIngredientInput[]>
  >;
  remove: UseFieldArrayRemove;
}) {
  const currentRecipeIngredients = watch("ingredients");

  return (
    <FormList
      title="Ingredients"
      sections={fields.map((field, index) => {
        const selectedIngredient = currentRecipeIngredients[index].ingredient;

        return (
          <RecipeIngredientFieldSection
            key={field.id}
            fieldId={index}
            control={control}
            selectedIngredient={{
              ingredientName: selectedIngredient.ingredientName,
              measureUnit: selectedIngredient.measureUnit,
            }}
          />
        );
      })}
      defaultItemsCount={1}
      addItem={() => append(DEFAULT_RECIPE_INGREDIENT_FORM_VALUE)}
      removeItem={(index: number) => {
        remove(index);
      }}
    />
  );
}
