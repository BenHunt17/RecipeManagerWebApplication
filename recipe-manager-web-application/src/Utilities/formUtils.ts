export function formatFieldName(
  name: string,
  required: boolean,
  isSpecificTitle: boolean
) {
  let formattedName = name;
  if (!isSpecificTitle) {
    const splitText = name.split(".");
    if (splitText.length > 1) {
      formattedName = splitText[splitText.length - 1];
    }
    formattedName = formattedName.replace(/([A-Z])/g, " $1");
  }
  return `${formattedName.charAt(0).toUpperCase()}${formattedName.slice(1)} ${
    required ? "*" : ""
  }`;
}
