import ContentBox from "../../components/common/ContentBox";
import { IconButton } from "../../components/styled/buttons";
import UpdateInstructionsForm from "../../forms/recipes/instructions/UpdateInstructionsForm";
import useModal from "../../hooks/useModal";
import EditIcon from "../../svg/EditIcon";
import { Recipe, RecipeInstruction } from "../../types/recipeTypes";

export default function RecipeInstructions({
  recipe,
  updateInFetchedRecipe,
}: {
  recipe: Recipe;
  updateInFetchedRecipe: (recipe: Recipe) => void;
}) {
  const [showUpdateinstructionsModal, closeUpdateinstructionsModal] = useModal(
    "Update Recipe Ingredients",
    () => (
      <UpdateInstructionsForm
        recipeName={recipe.recipeName}
        existingInstructions={recipe.instructions}
        updateInFetchedRecipe={(recipeInstructions: RecipeInstruction[]) =>
          updateInFetchedRecipe({ ...recipe, instructions: recipeInstructions })
        }
        close={() => closeUpdateinstructionsModal()}
      />
    )
  );

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
    </ContentBox>
  );
}
