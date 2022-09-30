import {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FormState,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormWatch,
} from "react-hook-form";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import DynamicList from "../../Components/FormComponents/DynamicList";
import TextInput from "../../Components/FormComponents/TextInput";
import SearchSelect from "../../Components/FormComponents/SearchSelect";
import { IngredientListItem } from "../../Types/IngredientTypes";
import useFetch from "../../Hooks/useFetch";
import {
  ErrorScreen,
  LoadingScreen,
} from "../../Components/Common/StyledComponents/Layouts";
import InputContainer from "../../Components/FormComponents/InputContainer";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { RecipeIngredientInput, RecipeInput } from "../../Types/RecipeTypes";
import { MeasureUnitUnitString } from "../../Utilities/Ingredients";
import styled from "@emotion/styled";
import { PaginatedResponse } from "../../Types/CommonTypes";

const UnitContainer = styled.div`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

//Recipe form is split into sections due to the quantity of data needed
export default function RecipeIngredientsForm({
  control,
  fields,
  formState,
  watch,
  append,
  remove,
}: {
  control: Control<RecipeInput>;
  fields: FieldArrayWithId<
    RecipeIngredientInput[],
    ArrayPath<RecipeIngredientInput[]>,
    "id"
  >[];
  formState: FormState<RecipeInput>;
  watch: UseFormWatch<RecipeInput>;
  append: UseFieldArrayAppend<
    RecipeIngredientInput[],
    ArrayPath<RecipeIngredientInput[]>
  >;
  remove: UseFieldArrayRemove;
}) {
  const { data, loading } = useFetch<PaginatedResponse<IngredientListItem>>({
    endpointPath: "https://localhost:5001/api/ingredients", //TODO - should now only call this query when the user actually clicks search now that the ingredient name filter exists
  });

  const currentRecipeIngredients = watch("recipeIngredients");

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
        items={fields.map((field, index) => {
          const ingredientMeasureUnit = data.items.find(
            (ingredient) =>
              ingredient.ingredientName ===
              currentRecipeIngredients[index].ingredientName
          )?.measureUnit;

          return (
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
                    name={`recipeIngredients.${index}.ingredientName`}
                    rules={{
                      required: "Required Field",
                    }}
                    promptMessage="Search Ingredient"
                    searchFunction={(searchText: string) =>
                      data.items
                        .filter((ingredient) =>
                          ingredient.ingredientName
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        )
                        .map((ingredient) => ingredient.ingredientName)
                    }
                    resultLabel={(result: string | undefined) => result ?? ""}
                  />
                }
                error={
                  <ErrorMessage>
                    {
                      formState.errors.recipeIngredients?.[index].ingredientName
                        ?.message
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
              {/* TODO - Make this entire form look prettier */}
              <UnitContainer>
                {ingredientMeasureUnit &&
                  MeasureUnitUnitString(ingredientMeasureUnit)}
              </UnitContainer>
            </FlexContainer>
          );
        })}
        defaultItemsCount={1}
        addItem={() =>
          append({
            ingredientId: "",
            quantity: "0",
          })
        }
        removeItem={(index: number) => remove(index)}
      />
    </FlexContainer>
  ) : (
    <ErrorScreen>Failed to load ingredients</ErrorScreen>
  );
}
