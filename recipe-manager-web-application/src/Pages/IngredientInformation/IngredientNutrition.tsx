import ContentBox from "../../components/common/ContentBox";
import StatisticsTable from "../../components/common/StatisticsTable";
import { Ingredient, MeasureUnit } from "../../types/ingredientTypes";
import { measureUnitToString } from "../../utils/ingredient";

export default function IngredientNutrition({
  ingredient,
}: {
  ingredient: Ingredient;
}) {
  return (
    <ContentBox
      title={`Nutritional Information (Per ${measureUnitToString(
        ingredient?.measureUnit ?? MeasureUnit.NONE
      )})`}
    >
      <StatisticsTable
        id="nutrition-stats-table"
        data={[
          {
            title: "kcal",
            data:
              ingredient.calories !== undefined
                ? ingredient.calories
                : "Unknown",
          },
          {
            title: "Fat",
            data:
              ingredient.fat !== undefined ? `${ingredient.fat}g` : "Unknown",
          },
          {
            title: "Salt",
            data:
              ingredient.salt !== undefined ? `${ingredient.salt}g` : "Unknown",
          },
          {
            title: "Protein",
            data:
              ingredient.protein !== undefined
                ? `${ingredient.protein}g`
                : "Unknown",
          },
          {
            title: "Carbs",
            data:
              ingredient.carbs !== undefined
                ? `${ingredient.carbs}g`
                : "Unknown",
          },
        ]}
      />
    </ContentBox>
  );
}
