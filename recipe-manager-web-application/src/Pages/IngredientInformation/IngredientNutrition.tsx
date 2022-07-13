import ContentBox from "../../Components/Common/ContentBox";
import StatisticsTable from "../../Components/Common/StatisticsTable";
import { Ingredient, MeasureType } from "../../Types/IngredientTypes";

function getMeasureTypeBaseValueString(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.KG:
      return "100kg";
    case MeasureType.ML:
      return "100ml";
    case MeasureType.DISCRETE:
      return "unit";
    case MeasureType.TSP:
      return "tsp";
    case MeasureType.TBSP:
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
      title={`Nutritional Information (Per ${getMeasureTypeBaseValueString(
        ingredient.measureType
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
