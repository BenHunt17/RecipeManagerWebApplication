import styled from "@emotion/styled";
import { FlexContainer } from "../styled/layouts";
import ImageUpload from "../form/ImageUpload";

const Root = styled.div`
  max-width: 600px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
`;

export default function StandardForm({
  basicFields,
  imageController,
  centerFields,
  columnFields,
  gridFields,
}: {
  basicFields: { nameField: JSX.Element; descriptionField: JSX.Element };
  imageController?: {
    value: File | null;
    onChange: React.Dispatch<React.SetStateAction<File | null>>;
  };
  centerFields?: JSX.Element[];
  columnFields?: JSX.Element[];
  gridFields?: JSX.Element[];
}) {
  return (
    <Root>
      <FlexContainer direction="column" gap={25}>
        <FlexContainer gap={25}>
          <FlexContainer
            direction={imageController ? "column" : "row"}
            justifyContent="flex-start"
            gap={25}
            width="100%"
          >
            {basicFields.nameField}
            {basicFields.descriptionField}
          </FlexContainer>
          {imageController && (
            <ImageUpload
              image={imageController.value}
              setImage={imageController.onChange}
            />
          )}
        </FlexContainer>
        {centerFields?.map((centerField, index) => (
          <FlexContainer
            key={index}
            justifyContent="center"
            alignItems="center"
          >
            {centerField}
          </FlexContainer>
        ))}
        <FlexContainer justifyContent="space-between" gap={25}>
          {columnFields?.map((columnField, index) => (
            <div key={index}>{columnField}</div>
          ))}
        </FlexContainer>
        <GridContainer>
          {gridFields?.map((gridField, index) => (
            <div key={index}>{gridField}</div>
          ))}
        </GridContainer>
      </FlexContainer>
    </Root>
  );
}
