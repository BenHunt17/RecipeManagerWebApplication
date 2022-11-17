import { ContainerType, ItemKeyContext } from "../types/storageTypes";
import { addItemToStorage } from "./storageService";

const MAX_ITEMS = 10;

function getActivityName(entity: string, itemKeyContext: ItemKeyContext) {
  switch (itemKeyContext) {
    case ItemKeyContext.CREATE:
      return `Created ${entity}`;
    case ItemKeyContext.UPDATE:
      return `Updated ${entity}`;
    case ItemKeyContext.DELETE:
      return `Deleted ${entity}`;
    case ItemKeyContext.VIEW:
      return `Viewed ${entity}`;
  }
}

export function addToRecentActivity(
  entity: string,
  entityName: string,
  itemKeyContext: ItemKeyContext,
  pageLink: string,
  imageUrl?: string | null
) {
  addItemToStorage(
    ContainerType.RECENT_ACTIVITY,
    {
      itemKey: `${itemKeyContext}-${entityName}` ?? "",
      activityName: getActivityName(entity, itemKeyContext),
      title: entityName,
      pageLink,
      timeStamp: new Date().toUTCString(),
      imageUrl,
    },
    MAX_ITEMS
  );
}
