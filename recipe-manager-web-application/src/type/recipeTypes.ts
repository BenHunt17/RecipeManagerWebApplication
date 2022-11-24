import { MeasureUnit } from "./ingredientTypes";

export interface RecipeIngredient {
  ingredientName?: string;
  calories?: number;
  fruitVeg?: boolean;
  fat?: number | null;
  salt?: number | null;
  protein?: number | null;
  carbs?: number | null;
  quantity?: number;
  measureUnit?: MeasureUnit;
}

export interface RecipeInstruction {
  instructionText?: string;
  instructionNumber?: number;
}

export interface Recipe {
  recipeName?: string;
  recipeDescription?: string;
  imageUrl?: string | null;
  ingredients?: RecipeIngredient[];
  instructions?: RecipeInstruction[];
  rating?: number;
  prepTime?: number;
  servingSize?: number;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
}

export interface RecipeListItem {
  recipeName?: string;
  imageUrl?: string | null;
  rating?: number;
  prepTime?: number;
}

export interface RecipeIngredientInput {
  ingredientName: string;
  quantity: number;
}

export interface RecipeInstructionInput {
  instructionText: string;
  instructionNumber: number;
}

export interface RecipeInput {
  recipeName: string;
  recipeDescription: string;
  rating: number;
  prepTime: number;
  servingSize: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}
