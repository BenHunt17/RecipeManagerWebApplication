import ContentBox from "../../Components/Common/ContentBox";
import { RecipeInstruction } from "../../Types/RecipeTypes";

export default function RecipeInstructions({
  recipeInstructions,
}: {
  recipeInstructions: RecipeInstruction[];
}) {
  const sortedInstructions = recipeInstructions.sort((first, second) =>
    first.instructionNumber > second.instructionNumber ? 1 : -1
  ); //Sorts the inmstructions by instruction number since it is assumed that they aren't returned in order from api

  return (
    <ContentBox title="Instructions">
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
