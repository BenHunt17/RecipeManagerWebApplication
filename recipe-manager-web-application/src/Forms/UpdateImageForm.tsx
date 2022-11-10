import styled from "@emotion/styled";
import React, { Fragment, useState } from "react";
import { AddButton, SubmitButton } from "../Components/Common/styled/buttons";
import { FlexContainer } from "../Components/Common/styled/layouts";
import { LoadingSpinner } from "../Components/Common/styled/output";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
`;

const ImageUploadContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  color: white;
  font-weight: bold;
  background-color: var(--colour-primary);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

export default function UpdateImageForm({
  onSubmit,
  initialImageUrl,
  setImageFile,
  loading,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialImageUrl: string | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <FlexContainer
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          gap={25}
        >
          <ImageContainer>
            {imageUrl ? <img src={imageUrl} width="200px" /> : null}
          </ImageContainer>
          <ImageUploadContainer>
            <input
              type="file"
              onChange={(e) => {
                if (!e.target.files?.[0]) return;
                setImageFile(e.target.files?.[0]);
                setImageUrl(URL.createObjectURL(e.target.files?.[0]));
              }}
              style={{ width: 0, height: 0 }}
            />
            Upload Image
          </ImageUploadContainer>
          {imageUrl && (
            <AddButton
              type="button"
              onClick={() => {
                setImageFile(null);
                setImageUrl(null);
              }}
            >
              Remove Image
            </AddButton>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SubmitButton type="submit">Submit</SubmitButton>
          )}
        </FlexContainer>
      </form>
    </Fragment>
  );
}
