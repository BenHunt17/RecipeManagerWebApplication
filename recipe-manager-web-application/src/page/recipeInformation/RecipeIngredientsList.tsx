import { Link } from "react-router-dom";
import ContentBox from "../../component/common/ContentBox";
import { IconButton } from "../../component/styled/buttons";
import { FlexContainer } from "../../component/styled/layouts";
import Tag from "../../component/common/Tag";
import UpdateRecipeIngredientsForm from "../../form/recipes/recipeIngredients/UpdateRecipeIngredientsForm";
import useModal from "../../hook/useModal";
import EditIcon from "../../svg/EditIcon";
import { Recipe, RecipeIngredient } from "../../type/recipeTypes";
import { measureUnitToString } from "../../util/ingredient";
import { ErrorScreen } from "../../component/styled/output";
import { MeasureUnit } from "../../type/ingredientTypes";

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
        recipeName={recipe?.recipeName ?? ""}
        existingRecipeIngredients={recipe?.ingredients ?? []}
        updateInFetchedRecipe={(recipeIngredients: RecipeIngredient[]) =>
          updateInFetchedRecipe({ ...recipe, ingredients: recipeIngredients })
        }
        close={() => closeUpdateRecipeIngredientsModal()}
      />
    ));

  if (!recipe.ingredients) {
    return <ErrorScreen>Could not find recipe ingredients</ErrorScreen>;
  }

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
              value={ingredient?.ingredientName ?? ""}
              endSlotValue={`${Number(
                (ingredient?.quantity ?? 0).toFixed(2)
              )} ${measureUnitToString(
                ingredient?.measureUnit ?? MeasureUnit.NONE
              )}`}
            />
          </Link>
        ))}
      </FlexContainer>
    </ContentBox>
  );
}