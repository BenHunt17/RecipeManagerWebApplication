export enum FilterOperation {
  PAGE = "PAGE",
  LIKE = "LIKE",
  GT = "GT",
  LT = "LT",
  GTE = "GTE",
  LTE = "LTE",
  EQ = "EQ",
  NEW = "NEQ",
}

function extractPayload(
  values: string | string[] | undefined,
  filterOperation: FilterOperation
) {
  const value =
    values instanceof Array
      ? values.find((value) => value.includes(filterOperation))
      : values;
  if (!value) {
    return undefined;
  }

  const valueParts = value.split(":");
  if (valueParts.length !== 2) {
    return undefined;
  }

  return valueParts[1];
}

export function TryParseFloat(
  values: string | string[] | undefined,
  filterOperation: FilterOperation
) {
  const payload = extractPayload(values, filterOperation);
  if (!payload) {
    return undefined;
  }

  const parsedFloat = parseFloat(payload);
  return !isNaN(parsedFloat) ? parsedFloat : undefined;
}

export function TryParseInteger(
  values: string | string[] | undefined,
  filterOperation: FilterOperation
) {
  const payload = extractPayload(values, filterOperation);
  if (!payload) {
    return undefined;
  }

  const parsedInteger = parseInt(payload);
  return !isNaN(parsedInteger) ? parsedInteger : undefined;
}

export function TryParseBoolean(
  values: string | string[] | undefined,
  filterOperation: FilterOperation
) {
  const payload = extractPayload(values, filterOperation);
  if (!payload) {
    return undefined;
  }

  return payload === "true" ? true : payload === "false" ? false : undefined;
}
