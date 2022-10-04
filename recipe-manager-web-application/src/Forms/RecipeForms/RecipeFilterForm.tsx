import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { FilterFormLayout } from "../../Components/Common/StyledComponents/Layouts";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import DiscreteOptionSelector from "../../Components/FormComponents/DiscreteOptionSelector";
import InputContainer from "../../Components/FormComponents/InputContainer";
import { QueryParameters, RangeOrTrueValue } from "../../Types/CommonTypes";
import {
  FilterOperation,
  TryParseBoolean,
  TryParseInteger,
} from "../../Utilities/FilterParsers";
import { getProperty } from "../../Utilities/FilterUtilities";

interface RecipeFilters {
  rating?: RangeOrTrueValue;
  prepTime?: RangeOrTrueValue;
  servingSize?: RangeOrTrueValue;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
}

export default function RecipeFilterForm({
  currentFilters,
  applyFilters,
  clearFilters,
  close,
}: {
  currentFilters: QueryParameters;
  applyFilters: (newFilters: QueryParameters) => void;
  clearFilters: () => void;
  close: () => void;
}) {
  const ratingFilters = getProperty(currentFilters, "rating");
  const prepTimeFilters = getProperty(currentFilters, "prepTime");
  const servingSizeFilters = getProperty(currentFilters, "servingSize");
  const breakfastFilters = getProperty(currentFilters, "breakfast");
  const lunchFilters = getProperty(currentFilters, "lunch");
  const dinnerFilters = getProperty(currentFilters, "dinner");

  const formMethods = useForm<RecipeFilters>({
    defaultValues: {
      rating: {
        min: TryParseInteger(ratingFilters, FilterOperation.GT),
        max: TryParseInteger(ratingFilters, FilterOperation.LT),
        trueValue: TryParseInteger(ratingFilters, FilterOperation.EQ),
      },
      prepTime: {
        min: TryParseInteger(prepTimeFilters, FilterOperation.GT),
        max: TryParseInteger(prepTimeFilters, FilterOperation.LT),
        trueValue: TryParseInteger(prepTimeFilters, FilterOperation.EQ),
      },
      servingSize: {
        min: TryParseInteger(servingSizeFilters, FilterOperation.GT),
        max: TryParseInteger(servingSizeFilters, FilterOperation.LT),
        trueValue: TryParseInteger(servingSizeFilters, FilterOperation.EQ),
      },
      breakfast: TryParseBoolean(breakfastFilters, FilterOperation.EQ),
      lunch: TryParseBoolean(lunchFilters, FilterOperation.EQ),
      dinner: TryParseBoolean(dinnerFilters, FilterOperation.EQ),
    },
  });

  const onSubmit = (data: RecipeFilters) => {
    const ratingValues = [
      ...(data.rating?.min ? [`GT:${data.rating.min}`] : []),
      ...(data.rating?.max ? [`LT:${data.rating.max}`] : []),
      ...(data.rating?.trueValue ? [`EQ:${data.rating.trueValue}`] : []),
    ];
    const prepTimeValues = [
      ...(data.prepTime?.min ? [`GT:${data.prepTime.min}`] : []),
      ...(data.prepTime?.max ? [`LT:${data.prepTime.max}`] : []),
      ...(data.prepTime?.trueValue ? [`EQ:${data.prepTime.trueValue}`] : []),
    ];
    const servingSizeValues = [
      ...(data.servingSize?.min ? [`GT:${data.servingSize.min}`] : []),
      ...(data.servingSize?.max ? [`LT:${data.servingSize.max}`] : []),
      ...(data.servingSize?.trueValue
        ? [`EQ:${data.servingSize.trueValue}`]
        : []),
    ];

    applyFilters({
      ...(!!ratingValues.length ? { rating: ratingValues } : {}),
      ...(!!prepTimeValues.length ? { prepTime: prepTimeValues } : {}),
      ...(!!servingSizeValues.length ? { servingSize: servingSizeValues } : {}),
      ...(data.breakfast !== undefined
        ? { breakfast: `EQ:${data.breakfast}` }
        : {}),
      ...(data.lunch !== undefined ? { lunch: `EQ:${data.lunch}` } : {}),
      ...(data.dinner !== undefined ? { dinner: `EQ:${data.dinner}` } : {}),
    });
    close();
  };

  return (
    <Fragment>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FilterFormLayout>
          {/* <InputContainer
            title="Rating"
            input={
              <RangeInput
                control={formMethods.control}
                name="calories"
                minName="calories.min"
                maxName="calories.max"
                minLimit={0}
                maxLimit={999}
                minError={formMethods.formState.errors.calories?.min?.message}
                maxError={formMethods.formState.errors.calories?.max?.message}
              />
            }
          /> */}
          <InputContainer
            title="Breakfast"
            input={
              <DiscreteOptionSelector
                id="breakfast.filter-selector"
                control={formMethods.control}
                name="breakfast"
                options={[true, false]}
                label={(option) => (option ? "Yes" : "No")}
                width={150}
              />
            }
            error={
              <ErrorMessage>
                {formMethods.formState.errors.breakfast?.message}
              </ErrorMessage>
            }
          />
          <InputContainer
            title="Lunch"
            input={
              <DiscreteOptionSelector
                id="lunch.filter-selector"
                control={formMethods.control}
                name="lunch"
                options={[true, false]}
                label={(option) => (option ? "Yes" : "No")}
                width={150}
              />
            }
            error={
              <ErrorMessage>
                {formMethods.formState.errors.lunch?.message}
              </ErrorMessage>
            }
          />
          <InputContainer
            title="Dinner"
            input={
              <DiscreteOptionSelector
                id="dinner.filter-selector"
                control={formMethods.control}
                name="dinner"
                options={[true, false]}
                label={(option) => (option ? "Yes" : "No")}
                width={150}
              />
            }
            error={
              <ErrorMessage>
                {formMethods.formState.errors.dinner?.message}
              </ErrorMessage>
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
