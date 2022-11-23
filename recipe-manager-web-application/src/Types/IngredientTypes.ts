export interface Ingredient {
  ingredientName?: string;
  ingredientDescription?: string;
  imageUrl?: string | null;
  measureUnit?: MeasureUnit;
  calories?: number;
  fruitVeg?: boolean;
  fat?: number | null;
  salt?: number | null;
  protein?: number | null;
  carbs?: number | null;
}

export interface IngredientInput {
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
}

export interface IngredientListItem {
  ingredientName?: string;
  imageUrl?: string | null;
  fruitVeg?: boolean;
  measureUnit?: MeasureUnit;
}

export enum MeasureUnit {
  NONE = "NONE",
  G = "G",
  ML = "ML",
  DISCRETE = "DISCRETE",
  TSP = "TSP",
  TBSP = "TBSP",
}
