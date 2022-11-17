import { ContainerType, StorageItem } from "../types/storageTypes";

function getMaxItems(containerType: ContainerType) {
  switch (containerType) {
    case ContainerType.RECENT_ACTIVITY:
      return 12;
    default:
      return 0;
  }
}

export function getItemsFromStorage(containerName: ContainerType) {
  try {
    const serialisedObject = localStorage.getItem(containerName);

    if (serialisedObject === null) {
      return [];
    }
    return JSON.parse(serialisedObject) as unknown[];
  } catch {
    throw Error("Failed to parse object");
  }
}

export function addItemToStorage(
  containerName: ContainerType,
  item: StorageItem
) {
  if (item.itemKey === undefined || typeof item.itemKey !== "string") {
    throw Error("No item key included in object");
  }

  const existingObjects: unknown[] | null = getItemsFromStorage(containerName);

  if (!Array.isArray(existingObjects)) {
    return;
  }

  try {
    const maxItems = getMaxItems(containerName);
    const newObjects = [
      item,
      ...existingObjects.filter((object) => object.itemKey !== item.itemKey), //Removes item from existing array if it is the same as the newly added item
    ].slice(0, maxItems);

    localStorage.setItem(containerName, JSON.stringify(newObjects));
  } catch {
    throw Error("Failed to add item to local storage");
  }
}
