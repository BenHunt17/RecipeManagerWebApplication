import { MeasureUnit } from "./ingredientTypes";
import { RecipeInstructionInput } from "./recipeTypes";

export interface RecipeIngredientFormInput {
  ingredients: {
    ingredient: {
      ingredientName: string;
      measureUnit: MeasureUnit;
    };
    quantity: number;
  }[];
}

export interface InstructionsFormInput {
  instructions: { instructionText: string }[];
}
