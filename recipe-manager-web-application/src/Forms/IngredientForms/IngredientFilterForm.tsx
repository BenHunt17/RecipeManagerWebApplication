import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { MainFormLayout } from "../../Components/Common/StyledComponents/Layouts";
import InputContainer from "../../Components/FormComponents/InputContainer";
import RangeInput from "../../Components/FormComponents/RangeInput";
import { MinMaxValue, QueryParamters } from "../../Types/CommonTypes";
import { getProperty } from "../../Utilities/FilterUtilities";
import {
  FilterOperation,
  TryParseBoolean,
  TryParseFloat,
} from "../../Utilities/FilterParsers";

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
      ...(data.fruitVeg ? { fruitVeg: `EQ:${data.fruitVeg}` } : {}),
    });
    console.log({
      ...(caloriesValues ? { calories: caloriesValues } : {}),
      ...(saltValues ? { salt: saltValues } : {}),
      ...(fatValues ? { fat: fatValues } : {}),
      ...(proteinValues ? { protein: proteinValues } : {}),
      ...(carbValues ? { carbs: caloriesValues } : {}),
      ...(data.fruitVeg ? { fruitVeg: `EQ:${data.fruitVeg}` } : {}),
    });

    close();
  };

  return (
    <Fragment>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <MainFormLayout>
          <InputContainer
            title="Calories"
            input={
              <RangeInput
                control={formMethods.control}
                name="calories"
                minName="calories.min"
                maxName="calories.max"
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
              />
            }
            error={
              <ErrorMessage>
                {formMethods.formState.errors.carbs?.min ||
                  (formMethods.formState.errors.carbs?.max &&
                    "Fields can only contain numbers")}
              </ErrorMessage>
            }
          />
          <SubmitButton type="submit">Apply Filters</SubmitButton>
          <SubmitButton
            onClick={() => {
              clearFilters();
              close();
            }}
          >
            Clear Filters
          </SubmitButton>
        </MainFormLayout>
      </form>
    </Fragment>
  );
}
