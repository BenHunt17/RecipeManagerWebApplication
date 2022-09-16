import { MeasureUnit } from "./IngredientTypes";

export type RecipeIngredient = {
  ingredientName: string;
  calories: number;
  fruitVeg: boolean;
  fat: number | null;
  salt: number | null;
  protein: number | null;
  carbs: number | null;
  quantity: number;
  measureUnit: MeasureUnit;
};

export type RecipeInstruction = {
  instructionText: string;
  instructionNumber: number;
};

export type Recipe = {
  recipeName: string;
  recipeDescription: string;
  imageUrl: string | null;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  rating: number;
  prepTime: number;
  servingSize: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

export type RecipeListItem = {
  recipeName: string;
  imageUrl: string | null;
  rating: number;
  prepTime: number;
};

export type RecipeIngredientInput = {
  ingredientName: string;
  quantity: number;
};

export type RecipeInstructionInput = {
  instructionText: string;
  instructionNumber: number;
};

export type RecipeInput = {
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: RecipeIngredientInput[];
  instructions: RecipeInstructionInput[];
  rating: number;
  prepTime: number;
  servingSize: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};
