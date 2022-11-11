import styled from "@emotion/styled";
import ImagePlaceholder from "./ImagePlaceholder";

const ImageFrame = styled.div`
  position: relative;
  padding: 10px;
  padding-bottom: 20px;
  background-color: var(--colour-primary);
  border-radius: 10px;
`;

const ImageFrameEditOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: calc(100% - 30px);
  background-color: rgba(var(--colour-light-grey-rgb), 0);
  opacity: 0;
  &:hover {
    background-color: rgba(var(--colour-light-grey-rgb), 0.75);
    opacity: 1;
    transition: 0.4s;
    cursor: pointer;
  }
`;

const EditImageText = styled.b`
  font-size: 30px;
  color: var(--colour-text);
  opacity: 1;
`;

export default function ImageDisplay({
  imageUrl,
  onClick,
}: {
  imageUrl: string | null;
  onClick?: () => void;
}) {
  return (
    <ImageFrame>
      {onClick && (
        <ImageFrameEditOverlay onClick={onClick}>
          <EditImageText>Change Image</EditImageText>
        </ImageFrameEditOverlay>
      )}
      {imageUrl ? (
        <img src={imageUrl} width="100%" alt="read write display" />
      ) : (
        <ImagePlaceholder height="400px" />
      )}
    </ImageFrame>
  );
}
