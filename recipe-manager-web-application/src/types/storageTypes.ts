export type StorageItem = Record<string, string | number | null | undefined> & {
  itemKey: string;
};

export enum ContainerType {
  RECENT_ACTIVITY = "RECENT_ACTIVITY",
}

export enum ItemKeyContext {
  VIEW = "VIEW",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface Activity extends StorageItem {
  activityName: string;
  title: string;
  pageLink: string;
  timeStamp: string;
  imageUrl?: string;
}
