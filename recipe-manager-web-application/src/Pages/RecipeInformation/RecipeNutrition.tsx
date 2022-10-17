import ContentBox from "../../Components/Common/ContentBox";
import StatisticsTable from "../../Components/Common/StatisticsTable";
import { RecipeIngredient } from "../../Types/RecipeTypes";

export default function RecipeNutrition({
  recipeIngredients,
  servingSize,
}: {
  recipeIngredients: RecipeIngredient[];
  servingSize: number;
}) {
  const calories = (
    recipeIngredients.reduce(
      (total, ingredient) => total + ingredient.calories,
      0
    ) / servingSize
  ).toFixed(2);

  const fat = (
    recipeIngredients.reduce(
      (total, ingredient) => total + (ingredient.fat ?? 0),
      0
    ) / servingSize
  ).toFixed(2);

  const salt = (
    recipeIngredients.reduce(
      (total, ingredient) => total + (ingredient.salt ?? 0),
      0
    ) / servingSize
  ).toFixed(2);

  const protein = (
    recipeIngredients.reduce(
      (total, ingredient) => total + (ingredient.protein ?? 0),
      0
    ) / servingSize
  ).toFixed(2);

  const carbs = (
    recipeIngredients.reduce(
      (total, ingredient) => total + (ingredient.carbs ?? 0),
      0
    ) / servingSize
  ).toFixed(2);

  const fruitVeg = recipeIngredients.reduce(
    (total, ingredient) => total + (ingredient.fruitVeg ? 1 : 0),
    0
  );

  return (
    <ContentBox title="Nutritional Information (Per Serving)">
      <StatisticsTable
        id="recipe.nutrition-table"
        data={[
          { title: "Kcal", data: `${calories}` },
          { title: "Fat", data: `${fat}g` },
          { title: "Salt", data: `${salt}g` },
          { title: "Protein", data: `${protein}g` },
          { title: "Carbs", data: `${carbs}g` },
          { title: "# of 5 a day", data: fruitVeg },
        ]}
      />
    </ContentBox>
  );
}
