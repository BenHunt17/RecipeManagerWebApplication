import ContentBox from "../../Components/Common/ContentBox";
import StatisticsTable from "../../Components/Common/StatisticsTable";
import { RecipeIngredient } from "../../Types/RecipeTypes";

export default function RecipeNutrition({
  recipeIngredients,
}: {
  recipeIngredients: RecipeIngredient[];
}) {
  //TODO - make this data scale to suit serving size
  const calories = Number(
    recipeIngredients
      .reduce((total, ingredient) => total + ingredient.calories, 0)
      .toFixed(2)
  ); //Cast to number explicitly to remove trailing 0s

  const fat = Number(
    recipeIngredients
      .reduce((total, ingredient) => total + (ingredient.fat ?? 0), 0)
      .toFixed(2)
  );

  const salt = Number(
    recipeIngredients
      .reduce((total, ingredient) => total + (ingredient.salt ?? 0), 0)
      .toFixed(2)
  );

  const protein = Number(
    recipeIngredients
      .reduce((total, ingredient) => total + (ingredient.protein ?? 0), 0)
      .toFixed(2)
  );

  const carbs = Number(
    recipeIngredients
      .reduce((total, ingredient) => total + (ingredient.carbs ?? 0), 0)
      .toFixed(2)
  );

  const fruitVeg = Number(
    recipeIngredients
      .reduce((total, ingredient) => total + (ingredient.fruitVeg ? 1 : 0), 0)
      .toFixed(2)
  );

  return (
    <ContentBox title="Nutritional Information">
      <StatisticsTable
        id="recipe.nutrition-table"
        data={[
          { title: "Kcal", data: `${calories}g` },
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
