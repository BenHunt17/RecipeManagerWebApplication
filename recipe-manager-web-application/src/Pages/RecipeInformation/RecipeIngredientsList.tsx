import { Link } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import { Label } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
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
          <Link
            key={`ingredients-list.${ingredient.ingredientName}`}
            to={`/ingredient/${ingredient.ingredientId}`}
            className="nakedLink"
          >
            <Label>{`${ingredient.ingredientName} | ${Number(
              ingredient.quantity.toFixed(2)
            )} ${MeasureUnitString(ingredient.measureType)}`}</Label>
          </Link>
        ))}
      </FlexContainer>
    </ContentBox>
  );
}
