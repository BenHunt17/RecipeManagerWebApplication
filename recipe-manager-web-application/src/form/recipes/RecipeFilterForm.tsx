import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../component/styled/buttons";
import { FlexContainer } from "../../component/styled/layouts";
import Select from "../../component/form/Select";
import SelectRangeInput from "../../component/form/SelectRangeInput";
import TimeRangeInput from "../../component/form/TimeRangeInput";
import FilterForm from "../../component/layout/FilterForm";
import {
  MinMaxValue,
  QueryParameters,
  RangeOrTrueValue,
} from "../../type/commonTypes";
import {
  FilterOperation,
  TryParseBoolean,
  TryParseInteger,
} from "../../util/filterParsers";
import { getProperty } from "../../util/filterParams";

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
            <SelectRangeInput
              control={formMethods.control}
              name="rating"
              minName="rating.min"
              maxName="rating.max"
              options={[1, 2, 3, 4, 5]}
              label={(option) => option.toString()}
            />,
            <SelectRangeInput
              control={formMethods.control}
              name="servingSize"
              minName="servingSize.min"
              maxName="servingSize.max"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              label={(option) => option.toString()}
            />,
          ]}
          grid={[
            <TimeRangeInput
              control={formMethods.control}
              name="prepTime"
              minName="prepTime.min"
              maxName="prepTime.max"
            />,
          ]}
          compactGrid={[
            <Select
              control={formMethods.control}
              name="breakfast"
              options={[true, false]}
              label={(option) => (option ? "Yes" : "No")}
            />,
            <Select
              control={formMethods.control}
              name="lunch"
              options={[true, false]}
              label={(option) => (option ? "Yes" : "No")}
            />,
            <Select
              control={formMethods.control}
              name="dinner"
              options={[true, false]}
              label={(option) => (option ? "Yes" : "No")}
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
