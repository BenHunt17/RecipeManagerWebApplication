export type Ingredient = {
  id: number;
  ingredientName: string;
  ingredientDescription: string;
  imageUrl: string | null;
  density: number | null;
  calories: number;
  fruitVeg: boolean;
  fat: number | null;
  salt: number | null;
  protein: number | null;
  carbs: number | null;
};

export type IngredientCreateInput = {
  ingredientName: string;
  ingredientDescription: string;
  imageFile: File | null;
  density: number | null;
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
};

export enum QuantityType {
  NONE = "NONE",
  WEIGHT = "WEIGHT",
  DISCRETE = "DISCRETE",
  VOLUME = "VOLUME",
}
