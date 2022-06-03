import { Link } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import { IconButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { Label } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import UpdateRecipeIngredientsForm from "../../Forms/RecipeForms/UpdateRecipeIngredientsForm";
import useModal from "../../Hooks/useModal";
import EditIcon from "../../SVGs/EditIcon";
import { MeasureType, Recipe, RecipeIngredient } from "../../Types/RecipeTypes";

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
  id,
  updateInFetchedRecipe,
  recipeIngredients,
}: {
  id: string;
  updateInFetchedRecipe: (recipe: Recipe) => void;
  recipeIngredients: RecipeIngredient[];
}) {
  //TODO - bug where this dialog and overly don't go over the recipe image when modal open
  const [
    updateRecipeIngredientsModal,
    showUpdateRecipeIngredientsModal,
    closeUpdateRecipeIngredientsModal,
  ] = useModal("Update Recipe Ingredients", () => (
    <UpdateRecipeIngredientsForm
      id={id}
      existingRecipeIngredients={recipeIngredients}
      updateInFetchedRecipe={(recipe: Recipe) => updateInFetchedRecipe(recipe)}
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
      {updateRecipeIngredientsModal}
    </ContentBox>
  );
}
