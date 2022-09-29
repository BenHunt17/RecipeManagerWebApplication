import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { FilterFormLayout } from "../../Components/Common/StyledComponents/Layouts";
import InputContainer from "../../Components/FormComponents/InputContainer";
import RangeInput from "../../Components/FormComponents/RangeInput";
import { MinMaxValue, QueryParamters } from "../../Types/CommonTypes";
import { getProperty } from "../../Utilities/FilterUtilities";
import {
  FilterOperation,
  TryParseBoolean,
  TryParseFloat,
} from "../../Utilities/FilterParsers";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import DiscreteOptionSelector from "../../Components/FormComponents/DiscreteOptionSelector";

interface IngredientFilters {
  calories?: MinMaxValue;
  fat?: MinMaxValue;
  salt?: MinMaxValue;
  protein?: MinMaxValue;
  carbs?: MinMaxValue;
  fruitVeg?: boolean;
}

export default function IngredientFilterForm({
  currentFilters,
  applyFilters,
  clearFilters,
  close,
}: {
  currentFilters: QueryParamters;
  applyFilters: (newFilters: QueryParamters) => void;
  clearFilters: () => void;
  close: () => void;
}) {
  const calorieFilters = getProperty(currentFilters, "calories");
  const saltFilters = getProperty(currentFilters, "salt");
  const fatFilters = getProperty(currentFilters, "fat");
  const proteinFilters = getProperty(currentFilters, "protein");
  const carbsFilters = getProperty(currentFilters, "carbs");
  const fruitVegFilters = getProperty(currentFilters, "fruitVeg");

  const formMethods = useForm<IngredientFilters>({
    defaultValues: {
      calories: {
        min: TryParseFloat(calorieFilters, FilterOperation.GT),
        max: TryParseFloat(calorieFilters, FilterOperation.LT),
      },
      salt: {
        min: TryParseFloat(saltFilters, FilterOperation.GT),
        max: TryParseFloat(saltFilters, FilterOperation.LT),
      },
      fat: {
        min: TryParseFloat(fatFilters, FilterOperation.GT),
        max: TryParseFloat(fatFilters, FilterOperation.LT),
      },
      protein: {
        min: TryParseFloat(proteinFilters, FilterOperation.GT),
        max: TryParseFloat(proteinFilters, FilterOperation.LT),
      },
      carbs: {
        min: TryParseFloat(carbsFilters, FilterOperation.GT),
        max: TryParseFloat(carbsFilters, FilterOperation.LT),
      },
      fruitVeg: TryParseBoolean(fruitVegFilters, FilterOperation.EQ),
    },
  });

  const onSubmit = (data: IngredientFilters) => {
    const caloriesValues = [
      ...(data.calories?.min ? [`GT:${data.calories.min}`] : []),
      ...(data.calories?.max ? [`LT:${data.calories.max}`] : []),
    ];
    const saltValues = [
      ...(data.salt?.min ? [`GT:${data.salt.min}`] : []),
      ...(data.salt?.max ? [`LT:${data.salt.max}`] : []),
    ];
    const fatValues = [
      ...(data.fat?.min ? [`GT:${data.fat.min}`] : []),
      ...(data.fat?.max ? [`LT:${data.fat.max}`] : []),
    ];
    const proteinValues = [
      ...(data.protein?.min ? [`GT:${data.protein.min}`] : []),
      ...(data.protein?.max ? [`LT:${data.protein.max}`] : []),
    ];
    const carbValues = [
      ...(data.carbs?.min ? [`GT:${data.carbs.min}`] : []),
      ...(data.carbs?.max ? [`LT:${data.carbs.max}`] : []),
    ];

    applyFilters({
      ...(caloriesValues ? { calories: caloriesValues } : {}),
      ...(saltValues ? { salt: saltValues } : {}),
      ...(fatValues ? { fat: fatValues } : {}),
      ...(proteinValues ? { protein: proteinValues } : {}),
      ...(carbValues ? { carbs: caloriesValues } : {}),
      ...(data.fruitVeg !== undefined
        ? { fruitVeg: `EQ:${data.fruitVeg}` }
        : {}),
    });
    close();
  };

  return (
    <Fragment>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FilterFormLayout>
          <InputContainer
            title="Calories"
            input={
              <RangeInput
                control={formMethods.control}
                name="calories"
                minName="calories.min"
                maxName="calories.max"
                minLimit={0}
                maxLimit={999}
              />
            }
          />
          <InputContainer
            title="Salt"
            input={
              <RangeInput
                control={formMethods.control}
                name="salt"
                minName="salt.min"
                maxName="salt.max"
                minLimit={0}
                maxLimit={999}
              />
            }
          />
          <InputContainer
            title="Fat"
            input={
              <RangeInput
                control={formMethods.control}
                name="fat"
                minName="fat.min"
                maxName="fat.max"
                minLimit={0}
                maxLimit={999}
              />
            }
          />
          <InputContainer
            title="Protein"
            input={
              <RangeInput
                control={formMethods.control}
                name="protein"
                minName="protein.min"
                maxName="protein.max"
                minLimit={0}
                maxLimit={999}
              />
            }
          />
          <InputContainer
            title="Carbs"
            input={
              <RangeInput
                control={formMethods.control}
                name="carbs"
                minName="carbs.min"
                maxName="carbs.max"
                minLimit={0}
                maxLimit={999}
              />
            }
          />
          <InputContainer
            title="1 of 5 a day"
            input={
              <DiscreteOptionSelector
                id="fruit-veg.filter-selector"
                control={formMethods.control}
                name="fruitVeg"
                options={[true, false]}
                label={(option) => (option ? "Yes" : "No")}
                width={150}
              />
            }
          />
          <FlexContainer
            direction="row"
            justifyContent="flex-start"
            gap={25}
            margin="35px 0 0 0"
          >
            <SubmitButton type="submit">Apply Filters</SubmitButton>
            <SubmitButton
              onClick={() => {
                clearFilters();
                close();
              }}
            >
              Clear Filters
            </SubmitButton>
          </FlexContainer>
        </FilterFormLayout>
      </form>
    </Fragment>
  );
}
