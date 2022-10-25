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
import InputContainer from "../../Components/FormComponents/InputContainer";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { RecipeIngredientInput, RecipeInput } from "../../Types/RecipeTypes";
import styled from "@emotion/styled";
import { PaginatedResponse, QueryParameters } from "../../Types/CommonTypes";
import { useState } from "react";

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
  const [queryParameters, setQueryParameters] = useState<
    QueryParameters | undefined
  >(undefined);
  console.log(queryParameters, !queryParameters);

  const { data, loading } = useFetch<PaginatedResponse<IngredientListItem>>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredients`,
    queryParams: queryParameters,
    skip: !queryParameters,
  });

  const currentRecipeIngredients = watch("recipeIngredients");

  const searchIngredients = (searchText: string) => {
    if (searchText.length === 0) {
      setQueryParameters(undefined);
      return;
    }
    setQueryParameters({ ingredientName: `LIKE:${searchText}` });
  };

  return (
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
                  name={`recipeIngredients.${index}.ingredientName`}
                  rules={{
                    required: "Required Field",
                  }}
                  options={(data?.items ?? []).map(
                    (ingredient) => ingredient.ingredientName
                  )}
                  promptMessage="Search Ingredient"
                  onSearch={searchIngredients}
                  resultLabel={(result) => result ?? ""}
                  loading={loading}
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
              {/* TODO - figure out how to restructure this horrid component  */}
              KG
            </UnitContainer>
          </FlexContainer>
        ))}
        defaultItemsCount={1}
        addItem={() =>
          append({
            ingredientName: "",
            quantity: 0,
          })
        }
        removeItem={(index: number) => remove(index)}
      />
    </FlexContainer>
  );
}
