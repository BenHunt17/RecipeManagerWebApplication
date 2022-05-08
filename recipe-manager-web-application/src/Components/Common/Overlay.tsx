import styled from "@emotion/styled";
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

const OVERLAY_BOTTOM_MARGIN = 10;
const OVERLAY_MIN_HEIGHT = 100;

const OverlayContainer = styled.div(
  ({ maxHeight }: { maxHeight: number }) => `
    position: absolute;
    max-height: ${maxHeight}px;
    width: 30%;
    background-color: white;
    border: solid 1px var(--colour-border);
    border-radius: 5px;
    overflow-y: scroll;
  `
);

export default function Overlay({
  children,
  anchorRef,
  onOutsideClick,
}: {
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLDivElement>;
  onOutsideClick: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //When the on outside click function changes, will add a click event listener to the document. The on outside click function is warpped in another which ensures the click isn't in the overlay
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        e.target instanceof Node &&
        !wrapperRef.current.contains(e.target)
      ) {
        onOutsideClick();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onOutsideClick]);

  useLayoutEffect(() => {
    //When the overlay is changed in the DOM, a margin is calculated and applied so that it behaves correctly. Will apply DOM changes before the render
    if (!wrapperRef?.current) return;

    const anchorTop = anchorRef.current?.getBoundingClientRect().top ?? 0;
    const overlayTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;

    const AnchorDisplacement = overlayTop - anchorTop; //Calculates the total displacement of the overlay from the anchor (displacement occurs when page is scrolled)
    const anchorHeight = anchorRef.current?.getBoundingClientRect().height ?? 0;
    const overlayHeight = wrapperRef.current.getBoundingClientRect().height;

    if (overlayMaxHeight > overlayHeight) {
      //If the overlay maximum height is greater than the minimum height, then it is assumed there is enough room to display the overlay beneath the anchor. Will apply a margin which mitigates the scroll displacement and adds the anchor height so that it appear at the bottom of the anchor
      wrapperRef.current.style.marginTop = `${(
        -AnchorDisplacement + anchorHeight
      ).toFixed()}px`;
    } else {
      //Else, it is assumed that the overlay won't fit underneath the anch so it will need to appear above it instead. Will mitigate the scroll displacement as well as the entire height of the overlay so that all of it appears above
      wrapperRef.current.style.marginTop = `${(
        -AnchorDisplacement - overlayHeight
      ).toFixed()}px`;
    }
  }, [wrapperRef?.current]);

  const documentElement = document.body;
  const anchorBottom = anchorRef.current?.getBoundingClientRect().bottom;
  const pageBottom = documentElement?.getBoundingClientRect().bottom;

  //Height of the overlay is the distance between the anchor and the bottom of the document. Also removes the margin value to ensure the correct gap
  const overlayMaxHeight =
    anchorBottom && pageBottom
      ? pageBottom - anchorBottom - OVERLAY_BOTTOM_MARGIN
      : 0;

  return (
    <Fragment>
      <OverlayContainer
        ref={wrapperRef}
        maxHeight={Math.max(overlayMaxHeight, OVERLAY_MIN_HEIGHT)}
      >
        {children}
      </OverlayContainer>
    </Fragment>
  );
}
