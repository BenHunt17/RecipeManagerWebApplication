import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FormState,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import DynamicList from "../../Components/FormComponents/DynamicList";
import Select from "../../Components/FormComponents/Select";
import TextInput from "../../Components/FormComponents/TextInput";
import { RecipeFormData } from "./CreateRecipeForm";
import SearchSelect from "../../Components/FormComponents/SearchSelect";
import { IngredientListItem } from "../../Types/IngredientTypes";
import useFetch from "../../Hooks/useFetch";
import {
  ErrorScreen,
  LoadingScreen,
} from "../../Components/Common/StyledComponents/Layouts";
import InputContainer from "../../Components/FormComponents/InputContainer";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";

export type RecipeIngredientFormData = {
  recipeIngredientId: number;
  quantity: number;
  measureTypeValue: string;
};

//Recipe form is split into sections due to the quantity of data needed
export default function RecipeIngredientForm({
  control,
  fields,
  formState,
  append,
  remove,
}: {
  control: Control<RecipeFormData>;
  fields: FieldArrayWithId<
    RecipeIngredientFormData[],
    ArrayPath<RecipeIngredientFormData[]>,
    "id"
  >[];
  formState: FormState<RecipeFormData>;
  append: UseFieldArrayAppend<
    RecipeIngredientFormData[],
    ArrayPath<RecipeIngredientFormData[]>
  >;
  remove: UseFieldArrayRemove;
}) {
  const { data, loading } = useFetch<IngredientListItem[]>({
    endpointPath: "https://localhost:5001/api/ingredients",
  });

  return loading ? (
    <LoadingScreen>Loading Ingredients</LoadingScreen>
  ) : data ? (
    <FlexContainer
      direction="column"
      justifyContent="space-between"
      gap={25}
      margin="0 0 25px 0"
    >
      <DynamicList
        title="Ingredients"
        items={fields.map((field, index) => (
          <FlexContainer
            key={field.id}
            direction="row"
            justifyContent="flex-start"
            gap={10}
          >
            <InputContainer
              input={
                <SearchSelect
                  control={control}
                  name={`recipeIngredients.${index}.recipeIngredientId`}
                  rules={{
                    required: "Required Field",
                  }}
                  promptMessage="Search Ingredient"
                  searchFunction={(searchText: string) =>
                    data
                      .filter((ingredient) =>
                        ingredient.ingredientName
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((ingredient) => ingredient.id)
                  }
                  resultLabel={(result: number | undefined) =>
                    data.find((ingredient) => ingredient.id === result)
                      ?.ingredientName ?? (result ?? "").toString()
                  }
                />
              }
              error={
                <ErrorMessage>
                  {
                    formState.errors.recipeIngredients?.[index]
                      .recipeIngredientId?.message
                  }
                </ErrorMessage>
              }
            />
            <InputContainer
              input={
                <TextInput
                  control={control}
                  rules={{
                    required: "Required Field",
                  }}
                  name={`recipeIngredients.${index}.quantity`}
                />
              }
              error={
                <ErrorMessage>
                  {
                    formState.errors.recipeIngredients?.[index].quantity
                      ?.message
                  }
                </ErrorMessage>
              }
            />

            <Select
              options={["NONE", "KG", "ML", "TSP", "TBSP"]}
              control={control}
              name={`recipeIngredients.${index}.measureTypeValue`}
            />
          </FlexContainer>
        ))}
        defaultItemsCount={1}
        addItem={() =>
          append({
            recipeIngredientId: "",
            quantity: "",
            measureTypeValue: "NONE",
          })
        }
        removeItem={(index: number) => remove(index)}
      />
    </FlexContainer>
  ) : (
    <ErrorScreen>Failed to load ingredients</ErrorScreen>
  );
}
