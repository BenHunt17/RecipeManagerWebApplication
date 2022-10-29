import styled from "@emotion/styled";
import { useState } from "react";
import { Control } from "react-hook-form";
import { FlexContainer } from "../../../Components/Common/StyledComponents/ShortcutComponents";
import SearchSelect from "../../../Components/form/SearchSelect";
import TextInput from "../../../Components/form/TextInput";
import useFetch from "../../../hooks/useFetch";
import { PaginatedResponse, QueryParameters } from "../../../types/commonTypes";
import { RecipeIngredientFormInput } from "../../../types/formTypes";
import {
  IngredientListItem,
  MeasureUnit,
} from "../../../types/ingredientTypes";
import { MeasureUnitToString } from "../../../Utilities/Ingredients";
import { DEFAULT_RECIPE_INGREDIENT_FORM_VALUE } from "./RecipeIngredientsForm";

const UnitContainer = styled.div`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Ingredient {
  ingredientName: string;
  measureUnit: MeasureUnit;
}

export function RecipeIngredientFieldSection({
  fieldId,
  control,
  selectedIngredient,
}: {
  fieldId: number;
  control: Control<RecipeIngredientFormInput>;
  selectedIngredient: Ingredient;
}) {
  const [queryParameters, setQueryParameters] = useState<
    QueryParameters | undefined
  >(undefined);

  const { data, loading } = useFetch<PaginatedResponse<IngredientListItem>>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredients`,
    queryParams: queryParameters,
    skip: !queryParameters,
  });

  const searchIngredients = (searchText: string) => {
    if (searchText.length === 0) {
      setQueryParameters(undefined);
      return;
    }
    setQueryParameters({ ingredientName: `LIKE:${searchText}` });
  };

  return (
    <FlexContainer
      key={fieldId}
      direction="row"
      justifyContent="flex-start"
      gap={10}
    >
      <SearchSelect
        control={control}
        name={`ingredients.${fieldId}.ingredient`}
        rules={{
          required: "Required Field",
        }}
        options={
          data?.items?.map((item) => {
            return {
              ingredientName: item.ingredientName,
              measureUnit: item.measureUnit,
            };
          }) ?? []
        }
        placeholder="Search Ingredient"
        defaultValue={DEFAULT_RECIPE_INGREDIENT_FORM_VALUE.ingredient}
        onSearch={searchIngredients}
        resultLabel={(result) => result.ingredientName}
        deepEqual={(ingredientA, ingredientB) =>
          ingredientA.ingredientName === ingredientB.ingredientName &&
          ingredientA.measureUnit === ingredientB.measureUnit
        }
        loading={loading}
      />
      <TextInput
        control={control}
        rules={{
          required: "Required Field",
        }}
        name={`ingredients.${fieldId}.quantity`}
      />
      {/* TODO - Make this entire form look prettier */}
      <UnitContainer>
        {MeasureUnitToString(selectedIngredient.measureUnit)}
      </UnitContainer>
    </FlexContainer>
  );
}
