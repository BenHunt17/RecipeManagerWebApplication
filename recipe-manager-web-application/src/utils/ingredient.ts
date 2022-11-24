import { MeasureUnit } from "../types/ingredientTypes";

export function measureUnitToString(measureUnit: MeasureUnit) {
  switch (measureUnit) {
    case MeasureUnit.G:
      return "g";
    case MeasureUnit.ML:
      return "ml";
    case MeasureUnit.DISCRETE:
      return "unit";
    case MeasureUnit.TSP:
      return "tsp";
    case MeasureUnit.TBSP:
      return "tbsp";
    default:
      return "N/A";
  }
}
