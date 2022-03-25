export type RecipeIngredient = {
  id: number;
  ingredientName: string;
  ingredientDescription: string; //Unneeded data in the recipe ingredients type i.e. image, description etc. Need to remove from backend too
  imageUrl: string | null;
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
  instructionNumber: Number;
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

export enum MeasureType {
  NONE = "NONE",
  KG = "KG",
  ML = "ML",
  TSP = "TSP",
  TBSP = "TBSP",
}
