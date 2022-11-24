/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FlexContainer } from "../../../component/styled/layouts";
import { TightParagraph } from "../../../component/styled/output";
import { Activity } from "../../../type/storageTypes";

const CardRoot = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(var(--colour-secondary-rgb), 0.25);
  border-radius: 10px;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 200px;
  padding: 8px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  background-color: var(--colour-primary);
`;

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <CardRoot>
      <FlexContainer
        gap={10}
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <FlexContainer
          gap={10}
          justifyContent="center"
          alignItems="center"
          width="100%"
          margin="8px"
        >
          <ContentContainer>
            <div>
              <TightParagraph>{activity.activityName}:</TightParagraph>
              <b className="textColour">{activity.title}</b>
            </div>
            <p css={{ fontSize: 12 }}>{activity.timeStamp}</p>
          </ContentContainer>
          <img
            src={activity.imageUrl}
            alt="activity-card"
            width={100}
            height={100}
          />
        </FlexContainer>
        <LinkContainer>
          <Link
            className="nakedLink"
            css={css`
              color: white;
              font-size: 32px;
            `}
            to={activity.pageLink}
          >
            &rsaquo;
          </Link>
        </LinkContainer>
      </FlexContainer>
    </CardRoot>
  );
}
