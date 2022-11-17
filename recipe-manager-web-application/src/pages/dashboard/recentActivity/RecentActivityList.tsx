import styled from "@emotion/styled";
import { FlexContainer } from "../../../components/styled/layouts";
import { Activity, ContainerType } from "../../../types/storageTypes";
import { getItemsFromStorage } from "../../../utils/storageService";
import { ActivityCard } from "./ActivityCard";

export function isActivity(obj: unknown): obj is Activity {
  return (
    (obj as Activity).itemKey !== undefined &&
    typeof (obj as Activity).itemKey === "string" &&
    (obj as Activity).activityName !== undefined &&
    typeof (obj as Activity).activityName === "string" &&
    (obj as Activity).title !== undefined &&
    typeof (obj as Activity).title === "string" &&
    (obj as Activity).timeStamp !== undefined &&
    typeof (obj as Activity).timeStamp === "string" &&
    (obj as Activity).pageLink !== undefined &&
    typeof (obj as Activity).pageLink === "string"
  );
}

const Root = styled.div`
  width: 100%;
  height: calc(100vh - 270px);
  overflow-y: scroll;
`;

export default function RecentActivityList() {
  const recentActivityData = getItemsFromStorage(ContainerType.RECENT_ACTIVITY);

  if (recentActivityData.length === 0) {
    return (
      <Root>
        <FlexContainer
          justifyContent="center"
          alignItems="center"
          height="100%"
          margin="0px 100px "
        >
          No recent activity yet
        </FlexContainer>
      </Root>
    );
  }

  return (
    <Root>
      <FlexContainer direction="column" gap={25}>
        {recentActivityData.map((item, index) => {
          if (!isActivity(item)) {
            return null;
          }
          return <ActivityCard key={index} activity={item} />;
        })}
      </FlexContainer>
    </Root>
  );
}
