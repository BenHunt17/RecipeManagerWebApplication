import { Link } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import { IconButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { Label } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import UpdateRecipeIngredientsForm from "../../Forms/RecipeForms/UpdateRecipeIngredientsForm";
import useModal from "../../Hooks/useModal";
import EditIcon from "../../svg/EditIcon";
import { Recipe, RecipeIngredient } from "../../types/recipeTypes";
import { MeasureUnitUnitString } from "../../Utilities/Ingredients";

export default function IngredientsList({
  recipe,
  updateInFetchedRecipe,
}: {
  recipe: Recipe;
  updateInFetchedRecipe: (recipe: Recipe) => void;
}) {
  const [
    updateRecipeIngredientsModal,
    showUpdateRecipeIngredientsModal,
    closeUpdateRecipeIngredientsModal,
  ] = useModal("Update Recipe Ingredients", () => (
    <UpdateRecipeIngredientsForm
      recipeName={recipe.recipeName}
      existingRecipeIngredients={recipe.ingredients}
      updateInFetchedRecipe={(recipeIngredients: RecipeIngredient[]) =>
        updateInFetchedRecipe({ ...recipe, ingredients: recipeIngredients })
      }
      close={() => closeUpdateRecipeIngredientsModal()}
    />
  ));

  return (
    <ContentBox
      title="Ingredients"
      rightSlot={
        <IconButton onClick={showUpdateRecipeIngredientsModal}>
          <EditIcon width={24} height={30} fill="white" />
        </IconButton>
      }
    >
      <FlexContainer direction="row" justifyContent="flex-start" gap={25}>
        {recipe.ingredients.map((ingredient) => (
          <Link
            key={`ingredients-list.${ingredient.ingredientName}`}
            to={`/ingredient/${ingredient.ingredientName}`}
            className="nakedLink"
          >
            <Label>{`${ingredient.ingredientName} | ${Number(
              ingredient.quantity.toFixed(2)
            )} ${MeasureUnitUnitString(ingredient.measureUnit)}`}</Label>
          </Link>
        ))}
      </FlexContainer>
      {updateRecipeIngredientsModal}
    </ContentBox>
  );
}
