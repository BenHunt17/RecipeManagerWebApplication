export type StorageItem = Record<string, string | number | null | undefined> & {
  itemKey: string;
};

export enum ContainerType {
  RECENT_ACTIVITY = "RECENT_ACTIVITY",
}

export interface Activity extends StorageItem {
  activityName: string;
  title: string;
  description: string;
  pageLink: string;
  timeStamp: string;
  imageUrl?: string;
}
