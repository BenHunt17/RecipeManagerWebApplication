/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder";
import { FlexContainer } from "./StyledComponents/ShortcutComponents";

const CardContainer = styled.div`
  width: 100%;
  height: 206px;
  background-color: rgba(var(--colour-secondary-rgb), 0.25);
  box-shadow: 2px 2px 2px var(--colour-shadow);
  border-radius: 10px;
  overflow: hidden;
  margin-left: 110px; //Pushs card to righ to make room for overlapping image
`;

const ImageContainer = styled.div`
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--colour-secondary);
  background-color: white;
  border-radius: 50%;
  height: 203px;
  width: 200px;
  overflow: hidden;
  margin-left: calc(
    -100% - 110px
  ); //Pushes image to left of card and additional 110px so that half of it is hanging off the card.
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 140px;
  color: var(--colour-text);
  padding-left: 110px; //Pushes content to the right so that it isn't hidden behind image
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
  height: 70px;
  color: white;
  font-size: 11px;
  background-color: var(--colour-primary);
  padding-left: 110px;
`;

const textEllipses = css`
  max-width: 260px; //Shortest the cards can get in width. This means that the title will have a really early cut off on long cards but sacrifices must be made for preventing ugly overflow
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function ItemCard({
  title,
  footerText,
  imageUrl,
  linkTo,
}: {
  title: string;
  footerText?: string[]; //Only first 3 strings will actually be regarded
  imageUrl: string | null;
  linkTo: string;
}) {
  return (
    <Link to={linkTo} className="nakedLink">
      <div
        css={css`
          width: calc(
            100% - 110px
          ); //Takes away the width of the section image which sticks out
        `}
      >
        <FlexContainer direction="row" justifyContent="flex-start">
          <CardContainer>
            <MainContent>
              <h3 css={textEllipses}>{title}</h3>
            </MainContent>
            <FooterContainer>
              {footerText?.slice(0, 3)?.map((text) => (
                //Only maps the first 3 strings overwise overflow will happen
                <div>{text}</div>
              ))}
            </FooterContainer>
          </CardContainer>
          <ImageContainer>
            {/* Image is technically to right of the card so that it is rendered over it. Some fiddly css margin is used to re-position it */}
            {imageUrl ? (
              <img src={imageUrl} height={160} />
            ) : (
              <ImagePlaceholder height="150px" />
            )}
          </ImageContainer>
        </FlexContainer>
      </div>
    </Link>
  );
}
