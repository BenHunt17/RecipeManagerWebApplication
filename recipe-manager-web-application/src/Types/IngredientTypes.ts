export type Ingredient = {
  id: number;
  ingredientName: string;
  ingredientDescription: string;
  imageUrl: string | null;
  measureType: MeasureType;
  calories: number;
  fruitVeg: boolean;
  fat: number | null;
  salt: number | null;
  protein: number | null;
  carbs: number | null;
};

export type IngredientInput = {
  ingredientName: string;
  ingredientDescription: string;
  imageFile: File | null;
  quantity: number;
  measureType: MeasureType;
  calories: number;
  fruitVeg: boolean;
  fat: number | null;
  salt: number | null;
  protein: number | null;
  carbs: number | null;
};

export type IngredientListItem = {
  id: number;
  ingredientName: string;
  imageUrl: string | null;
  fruitVeg: boolean;
  measureType: MeasureType;
};

export enum MeasureType {
  NONE = "NONE",
  KG = "KG",
  ML = "ML",
  DISCRETE = "DISCRETE",
  TSP = "TSP",
  TBSP = "TBSP",
}
