import ContentBox from "../../components/common/ContentBox";
import { FlexContainer, PageTemplate } from "../../components/styled/layouts";
import RecentActivityList from "./recentActivity/RecentActivityList";

export default function Dashboard() {
  return (
    <PageTemplate>
      <FlexContainer justifyContent="space-between" height="100%">
        <h2>Home</h2>
        <ContentBox title="Recent Activity">
          <RecentActivityList />
        </ContentBox>
      </FlexContainer>
    </PageTemplate>
  );
}
