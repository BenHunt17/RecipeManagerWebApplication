import { QuantityType } from "../../Types/IngredientTypes";

export type IngredientInputData = {
  ingredientName: string;
  ingredientDescription: string;
  density: number;
  fruitVeg: boolean;
  quantityType: QuantityType;
  quantity: number;
  calories: number;
  fat: number;
  salt: number;
  protein: number;
  carbs: number;
};

export function quantityUnitString(quantityType: QuantityType) {
  switch (quantityType) {
    case QuantityType.WEIGHT:
      return "Kg";
    case QuantityType.VOLUME:
      return "Ml";
    default:
      return undefined;
  }
}
