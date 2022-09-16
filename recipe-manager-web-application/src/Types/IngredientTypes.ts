export type Ingredient = {
  ingredientName: string;
  ingredientDescription: string;
  imageUrl: string | null;
  measureUnit: MeasureUnit;
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
  measureUnit: MeasureUnit;
  calories: number;
  fruitVeg: boolean;
  fat: number | null;
  salt: number | null;
  protein: number | null;
  carbs: number | null;
};

export type IngredientListItem = {
  ingredientName: string;
  imageUrl: string | null;
  fruitVeg: boolean;
  measureUnit: MeasureUnit;
};

export enum MeasureUnit {
  NONE = "NONE",
  KG = "KG",
  ML = "ML",
  DISCRETE = "DISCRETE",
  TSP = "TSP",
  TBSP = "TBSP",
}
