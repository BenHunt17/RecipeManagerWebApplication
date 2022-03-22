import styled from "@emotion/styled";
import ContentBox from "../../Components/Common/ContentBox";
import { RecipeIngredient } from "../../Types/RecipeTypes";

const StatsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ListItem = styled.div(({ highlight }: { highlight?: boolean }) => ({
  color: "var(--colour-secondary)",
  backgroundColor: highlight
    ? "rgba(var(--colour-secondary-rgb), 0.2)"
    : "none",
}));

export default function RecipeNutrition({
  recipeIngredients,
}: {
  recipeIngredients: RecipeIngredient[];
}) {
  const kcal = Number(
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

  //TODO: may need to make this table design into a component in the future. Will need to read up on dealing with sequences

  return (
    <ContentBox title="Nutritional Information">
      <StatsLayout>
        <ListItem highlight>
          <b>kcal: </b>
          {kcal}
        </ListItem>
        <ListItem>
          <b>Fat: </b>
          {fat}g
        </ListItem>
        <ListItem>
          <b>Salt: </b>
          {salt}g
        </ListItem>
        <ListItem highlight>
          <b>Protein: </b>
          {protein}g
        </ListItem>
        <ListItem highlight>
          <b>Carbs: </b>
          {carbs}g
        </ListItem>
        <ListItem>
          <b># of 5 a day: </b>
          {fruitVeg}
        </ListItem>
      </StatsLayout>
    </ContentBox>
  );
}
