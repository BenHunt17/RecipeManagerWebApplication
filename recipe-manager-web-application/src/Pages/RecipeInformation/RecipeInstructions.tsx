import ContentBox from "../../Components/Common/ContentBox";
import { IconButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import UpdateInstructionsForm from "../../Forms/RecipeForms/UpdateInstructionsForm";
import useModal from "../../Hooks/useModal";
import EditIcon from "../../SVGs/EditIcon";
import { Recipe, RecipeInstruction } from "../../Types/RecipeTypes";

export default function RecipeInstructions({
  recipe,
  updateInFetchedRecipe,
}: {
  recipe: Recipe;
  updateInFetchedRecipe: (recipe: Recipe) => void;
}) {
  const [
    updateinstructionsModal,
    showUpdateinstructionsModal,
    closeUpdateinstructionsModal,
  ] = useModal("Update Recipe Ingredients", () => (
    <UpdateInstructionsForm
      recipeName={recipe.recipeName}
      existingInstructions={recipe.instructions}
      updateInFetchedRecipe={(recipeInstructions: RecipeInstruction[]) =>
        updateInFetchedRecipe({ ...recipe, instructions: recipeInstructions })
      }
      close={() => closeUpdateinstructionsModal()}
    />
  ));

  const sortedInstructions = recipe.instructions.sort(
    (first, second) => first.instructionNumber - second.instructionNumber
  ); //Sorts the instructions by instruction number since it is assumed that they aren't returned in order from api

  return (
    <ContentBox
      title="Instructions"
      rightSlot={
        <IconButton onClick={showUpdateinstructionsModal}>
          <EditIcon width={24} height={30} fill="white" />
        </IconButton>
      }
    >
      <ol>
        {sortedInstructions.map((instruction) => (
          <li key={`recipe-instructions.${instruction.instructionNumber}`}>
            {instruction.instructionText}
          </li>
        ))}
      </ol>
      {updateinstructionsModal}
    </ContentBox>
  );
}
