import styled from "@emotion/styled";
import { useRef } from "react";
import UploadIcon from "../../svg/UploadIcon";

const ImageUploadContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border: 1px solid var(--colour-light-grey);
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    background-color: rgba(var(--colour-light-grey-rgb), 0.2);
  }
`;

const ImageInput = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  &:hover + button {
    //Yes I'm terrible
    opacity: 1;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  height: 25px;
  bottom: 10px;
  transform: translate (50%);
  border: 1px solid var(--colour-light-grey);
  border-radius: 30px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

export default function ImageUpload({
  image,
  setImage,
}: {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const imageUploadRef = useRef<HTMLInputElement>(null);

  return (
    <ImageUploadContainer>
      {image ? (
        <img width={250} height={250} src={URL.createObjectURL(image)} />
      ) : (
        <UploadIcon width={100} height={100} fill="var(--colour-dark-grey)" />
      )}
      <ImageInput
        ref={imageUploadRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (image && !e.target.files?.[0]) return; //If the image is already set and no file was uploaded then bail because no change needs to be made
          setImage(e.target.files?.[0] ?? null);
        }}
      />
      {image && (
        <RemoveButton
          onClick={(e) => {
            e.preventDefault(); //Prevents button from submitting form since it's a child of a form tag
            if (imageUploadRef.current?.files) {
              imageUploadRef.current.value = ""; //Will directly set value of file input to empty string so since it's technically decoupled from the state
            }
            setImage(null);
          }}
        >
          <b>Remove Image</b>
        </RemoveButton>
      )}
    </ImageUploadContainer>
  );
}
