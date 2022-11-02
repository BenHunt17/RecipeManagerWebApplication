import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import DiscreteOptionSelector from "../../Components/form/DiscreteOptionSelector";
import NumberSelector from "../../Components/form/NumberSelector";
import TimeRangeInput from "../../Components/form/TimeRangeInput";
import FilterForm from "../../Components/layouts/FilterForm";
import {
  MinMaxValue,
  QueryParameters,
  RangeOrTrueValue,
} from "../../types/commonTypes";
import {
  FilterOperation,
  TryParseBoolean,
  TryParseInteger,
} from "../../Utilities/FilterParsers";
import { getProperty } from "../../Utilities/FilterUtilities";

interface RecipeFilters {
  rating?: RangeOrTrueValue;
  prepTime?: MinMaxValue;
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
        min: TryParseInteger(ratingFilters, FilterOperation.GTE),
        max: TryParseInteger(ratingFilters, FilterOperation.LTE),
        trueValue: TryParseInteger(ratingFilters, FilterOperation.EQ),
      },
      prepTime: {
        min: TryParseInteger(prepTimeFilters, FilterOperation.GTE) ?? 0,
        max: TryParseInteger(prepTimeFilters, FilterOperation.LTE) ?? 0,
      },
      servingSize: {
        min: TryParseInteger(servingSizeFilters, FilterOperation.GTE),
        max: TryParseInteger(servingSizeFilters, FilterOperation.LTE),
        trueValue: TryParseInteger(servingSizeFilters, FilterOperation.EQ),
      },
      breakfast: TryParseBoolean(breakfastFilters, FilterOperation.EQ),
      lunch: TryParseBoolean(lunchFilters, FilterOperation.EQ),
      dinner: TryParseBoolean(dinnerFilters, FilterOperation.EQ),
    },
  });

  const onSubmit = (data: RecipeFilters) => {
    const ratingValues = [
      ...(data.rating?.min ? [`GTE:${data.rating.min}`] : []),
      ...(data.rating?.max ? [`LTE:${data.rating.max}`] : []),
      ...(data.rating?.trueValue ? [`EQ:${data.rating.trueValue}`] : []),
    ];
    const prepTimeValues = [
      ...(data.prepTime?.min ? [`GTE:${data.prepTime.min}`] : []),
      ...(data.prepTime?.max ? [`LTE:${data.prepTime.max}`] : []),
    ];
    const servingSizeValues = [
      ...(data.servingSize?.min ? [`GTE:${data.servingSize.min}`] : []),
      ...(data.servingSize?.max ? [`LTE:${data.servingSize.max}`] : []),
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
        <FilterForm
          rows={[
            <NumberSelector
              id="rating.number-selector"
              control={formMethods.control}
              name="rating"
              options={[1, 2, 3, 4, 5]}
            />,
            <NumberSelector
              id="rating.number-selector"
              control={formMethods.control}
              name="servingSize"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            />,
          ]}
          grid={[
            <TimeRangeInput control={formMethods.control} name="prepTime" />,
          ]}
          compactGrid={[
            <DiscreteOptionSelector
              id="breakfast.filter-selector"
              control={formMethods.control}
              name="breakfast"
              options={[true, false]}
              label={(option) => (option ? "Yes" : "No")}
              width={150}
            />,
            <DiscreteOptionSelector
              id="lunch.filter-selector"
              control={formMethods.control}
              name="lunch"
              options={[true, false]}
              label={(option) => (option ? "Yes" : "No")}
              width={150}
            />,
            <DiscreteOptionSelector
              id="dinner.filter-selector"
              control={formMethods.control}
              name="dinner"
              options={[true, false]}
              label={(option) => (option ? "Yes" : "No")}
              width={150}
            />,
          ]}
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
      </form>
    </Fragment>
  );
}
