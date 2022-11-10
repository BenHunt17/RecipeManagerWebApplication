import styled from "@emotion/styled";
import { useState } from "react";
import { Control } from "react-hook-form";
import { FlexContainer } from "../../../Components/Common/styled/layouts";
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

const QuantityFieldContainer = styled.div`
  width: 110px;
`;

const UnitContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
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
    setQueryParameters({ searchQuery: `LIKE:${searchText}` });
  };

  return (
    <FlexContainer key={fieldId} alignItems="center" gap={10}>
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
        required
      />
      <QuantityFieldContainer>
        <TextInput
          control={control}
          rules={{
            required: "Required Field",
          }}
          name={`ingredients.${fieldId}.quantity`}
          required
        />
      </QuantityFieldContainer>
      <UnitContainer>
        {MeasureUnitToString(selectedIngredient.measureUnit)}
      </UnitContainer>
    </FlexContainer>
  );
}
