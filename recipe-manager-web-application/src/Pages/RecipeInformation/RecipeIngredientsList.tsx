import ContentBox from "../../Components/Common/ContentBox";
import {
  FlexContainer,
  Label,
} from "../../Components/Common/StyledComponents/StyledComponents";
import { MeasureType, RecipeIngredient } from "../../Types/RecipeTypes";

function MeasureUnitString(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.KG:
      return "Kg";
    case MeasureType.ML:
      return "Ml";
    case MeasureType.TSP:
      return "tsp";
    case MeasureType.TBSP:
      return "tbsp";
    case MeasureType.NONE:
    default:
      return "";
  }
}

export default function IngredientsList({
  recipeIngredients,
}: {
  recipeIngredients: RecipeIngredient[];
}) {
  return (
    <ContentBox title="Ingredients">
      <FlexContainer direction="row" justifyContent="flex-start" gap={25}>
        {recipeIngredients.map((ingredient) => (
          <Label key={`ingredients-list.${ingredient.ingredientName}`}>{`${
            ingredient.ingredientName
          } | ${Number(ingredient.quantity.toFixed(2))} ${MeasureUnitString(
            ingredient.measureType
          )}`}</Label>
        ))}
      </FlexContainer>
    </ContentBox>
  );
}
