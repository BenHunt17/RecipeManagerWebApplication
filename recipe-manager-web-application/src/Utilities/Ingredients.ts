import { MeasureUnit } from "../Types/IngredientTypes";

export function MeasureUnitUnitString(measureUnit: MeasureUnit) {
  switch (measureUnit) {
    case MeasureUnit.KG:
      return "kg";
    case MeasureUnit.ML:
      return "ml";
    case MeasureUnit.DISCRETE:
      return "units";
    case MeasureUnit.TSP:
      return "tsp";
    case MeasureUnit.TBSP:
      return "tbsp";
    default:
      return "unknown units";
  }
}
