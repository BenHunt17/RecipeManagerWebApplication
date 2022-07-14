import { MeasureType } from "./IngredientTypes";

export type RecipeIngredient = {
  id: number;
  ingredientId: number;
  ingredientName: string;
  calories: number;
  fruitVeg: boolean;
  fat: number | null;
  salt: number | null;
  protein: number | null;
  carbs: number | null;
  quantity: number;
  measureType: MeasureType;
};

export type RecipeInstruction = {
  id: number;
  instructionText: string;
  instructionNumber: number;
};

export type Recipe = {
  id: number;
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
  id: number;
  recipeName: string;
  imageUrl: string | null;
  rating: number;
  prepTime: number;
};

export type RecipeIngredientInput = {
  ingredientId: number;
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
