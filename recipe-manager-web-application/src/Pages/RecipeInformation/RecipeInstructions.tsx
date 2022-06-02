import ContentBox from "../../Components/Common/ContentBox";
import UpdateInstructionsForm from "../../Forms/RecipeForms/UpdateInstructionsForm";
import useModal from "../../Hooks/useModal";
import { Recipe, RecipeInstruction } from "../../Types/RecipeTypes";

export default function RecipeInstructions({
  id,
  updateInFetchedRecipe,
  recipeInstructions,
}: {
  id: string;
  updateInFetchedRecipe: (recipe: Recipe) => void;
  recipeInstructions: RecipeInstruction[];
}) {
  const [
    updateinstructionsModal,
    showUpdateinstructionsModal,
    closeUpdateinstructionsModal,
  ] = useModal("Update Recipe Ingredients", () => (
    <UpdateInstructionsForm
      id={id}
      existingInstructions={recipeInstructions}
      updateInFetchedRecipe={(recipe: Recipe) => updateInFetchedRecipe(recipe)}
      close={() => closeUpdateinstructionsModal()}
    />
  ));

  const sortedInstructions = recipeInstructions.sort((first, second) =>
    first.instructionNumber > second.instructionNumber ? 1 : -1
  ); //Sorts the inmstructions by instruction number since it is assumed that they aren't returned in order from api

  return (
    <ContentBox
      title="Instructions"
      rightSlot={
        <button onClick={showUpdateinstructionsModal}>
          Update instructions
        </button>
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
