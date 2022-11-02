import { Link } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import { IconButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import Tag from "../../Components/Common/Tag";
import UpdateRecipeIngredientsForm from "../../Forms/recipes/recipeIngredients/UpdateRecipeIngredientsForm";
import useModal from "../../hooks/useModal";
import EditIcon from "../../svg/EditIcon";
import { Recipe, RecipeIngredient } from "../../types/recipeTypes";
import { MeasureUnitToString } from "../../Utilities/Ingredients";

export default function IngredientsList({
  recipe,
  updateInFetchedRecipe,
}: {
  recipe: Recipe;
  updateInFetchedRecipe: (recipe: Recipe) => void;
}) {
  const [showUpdateRecipeIngredientsModal, closeUpdateRecipeIngredientsModal] =
    useModal("Update Recipe Ingredients", () => (
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
            <Tag
              value={ingredient.ingredientName}
              endSlotValue={`${Number(
                ingredient.quantity.toFixed(2)
              )} ${MeasureUnitToString(ingredient.measureUnit)}`}
            />
          </Link>
        ))}
      </FlexContainer>
    </ContentBox>
  );
}
