import ContentBox from "../../components/common/ContentBox";
import StatisticsTable from "../../components/common/StatisticsTable";
import { Ingredient, MeasureUnit } from "../../types/ingredientTypes";

function getMeasureUnitBaseValueString(measureUnit: MeasureUnit) {
  switch (measureUnit) {
    case MeasureUnit.KG:
      return "100kg";
    case MeasureUnit.ML:
      return "100ml";
    case MeasureUnit.DISCRETE:
      return "unit";
    case MeasureUnit.TSP:
      return "tsp";
    case MeasureUnit.TBSP:
      return "tbsp";
    default:
      return "unknown unit";
  }
}

export default function IngredientNutrition({
  ingredient,
}: {
  ingredient: Ingredient;
}) {
  return (
    <ContentBox
      title={`Nutritional Information (Per ${getMeasureUnitBaseValueString(
        ingredient.measureUnit
      )})`}
    >
      <StatisticsTable
        id="nutrition-stats-table"
        data={[
          { title: "kcal", data: ingredient.calories },
          {
            title: "Fat",
            data: ingredient.fat ? `${ingredient.fat}g` : "Unknown",
          },
          {
            title: "Salt",
            data: ingredient.salt ? `${ingredient.salt}g` : "Unknown",
          },
          {
            title: "Protein",
            data: ingredient.protein ? `${ingredient.protein}g` : "Unknown",
          },
          {
            title: "Carbs",
            data: ingredient.carbs ? `${ingredient.carbs}g` : "Unknown",
          },
        ]}
      />
    </ContentBox>
  );
}
