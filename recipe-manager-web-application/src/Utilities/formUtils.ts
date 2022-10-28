export function formatFieldName(
  name: string,
  required: boolean,
  dontSpacify: boolean
) {
  let formatedName = name;
  if (!dontSpacify) {
    const splitText = name.split(".");
    if (splitText.length > 1) {
      formatedName = splitText[splitText.length - 1];
    }
    formatedName = formatedName.replace(/([A-Z])/g, " $1");
  }
  return `${formatedName.charAt(0).toUpperCase()}${formatedName.slice(1)} ${
    required ? "*" : ""
  }`;
}
