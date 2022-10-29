import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FormState,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormWatch,
} from "react-hook-form";
import { FlexContainer } from "../../../Components/Common/StyledComponents/ShortcutComponents";
import {
  IngredientListItem,
  MeasureUnit,
} from "../../../types/ingredientTypes";
import { RecipeIngredientInput, RecipeInput } from "../../../types/recipeTypes";
import FormList from "../../../Components/templates/FormList";
import { RecipeIngredientFieldSection } from "./RecipeIngredientFieldSection";
import { RecipeIngredientFormInput } from "../../../types/formTypes";

export const DEFAULT_RECIPE_INGREDIENT_FORM_VALUE = {
  ingredient: { ingredientName: "", measureUnit: MeasureUnit.NONE },
  quantity: 0,
};

export default function RecipeIngredientsForm({
  control,
  fields,
  formState,
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
  formState: FormState<RecipeIngredientFormInput>;
  watch: UseFormWatch<RecipeIngredientFormInput>;
  append: UseFieldArrayAppend<
    RecipeIngredientInput[],
    ArrayPath<RecipeIngredientInput[]>
  >;
  remove: UseFieldArrayRemove;
}) {
  const currentRecipeIngredients = watch("ingredients");

  return (
    <FlexContainer
      direction="column"
      justifyContent="space-between"
      gap={25}
      margin="0 0 25px 0"
    >
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
    </FlexContainer>
  );
}
