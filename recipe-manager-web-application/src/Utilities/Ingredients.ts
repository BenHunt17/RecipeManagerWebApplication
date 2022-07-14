import { MeasureType } from "../Types/IngredientTypes";

export function MeasureTypeUnitString(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.KG:
      return "kg";
    case MeasureType.ML:
      return "ml";
    case MeasureType.DISCRETE:
      return "units";
    case MeasureType.TSP:
      return "tsp";
    case MeasureType.TBSP:
      return "tbsp";
    default:
      return "unknown units";
  }
}
