/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import { IconButton } from "../../Components/Common/styled/buttons";
import { PageTemplate } from "../../Components/Common/styled/layouts";
import { FlexContainer } from "../../Components/Common/styled/layouts";
import UpdateIngredientImageForm from "../../Forms/ingredients/UpdateIngredientImageForm";
import UpdateIngredientForm from "../../Forms/ingredients/UpdateIngredientForm";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import { Ingredient } from "../../types/ingredientTypes";
import ImageDisplay from "../../Components/Common/ImageDisplay";
import EditIcon from "../../svg/EditIcon";
import {
  ErrorScreen,
  LoadingScreen,
  TightParagraph,
} from "../../Components/Common/styled/output";
import IngredientNutrition from "./IngredientNutrition";

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 25px;
  max-height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function IngredientInformation() {
  const { ingredientName } = useParams();
  const { data, loading, modifyData } = useFetch<Ingredient>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredient/${ingredientName}`,
  });

  const [showUpdateIngredientModal, closeUpdateIngredientModal] = useModal(
    "Update Ingredient",
    (props: { existingIngredient: Ingredient }) => (
      <UpdateIngredientForm
        ingredientName={ingredientName ?? ""}
        existingIngredient={props.existingIngredient}
        updateInFetchedIngredient={(updatedIngredient: Ingredient) =>
          modifyData(updatedIngredient)
        }
        close={() => closeUpdateIngredientModal()}
      />
    )
  );

  const [showUploadImageModal, closeUploadImageModal] = useModal(
    "Change Image",
    () => (
      <UpdateIngredientImageForm
        ingredientName={ingredientName ?? ""}
        imageUrl={data?.imageUrl ?? null}
        updateInFetchedIngredient={(imageUrl: string | null) => {
          if (data) {
            modifyData({ ...data, imageUrl: imageUrl });
          }
        }}
        close={() => closeUploadImageModal()}
      />
    )
  );

  if (loading) {
    return (
      <PageTemplate>
        <LoadingScreen>Loading Ingredient...</LoadingScreen>
      </PageTemplate>
    );
  }
  if (!data) {
    return (
      <PageTemplate>
        <ErrorScreen>Ingredient not available</ErrorScreen>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <PageLayout>
        <FlexContainer
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={25}
        >
          <h2
            css={css`
              grid-column: span 2;
            `}
          >
            {data.ingredientName}
          </h2>
          {data.fruitVeg && <p>🍏 5 a Day</p>}
          <IconButton
            onClick={() =>
              showUpdateIngredientModal({
                existingIngredient: data,
              })
            }
          >
            <EditIcon width={24} height={30} />
          </IconButton>
        </FlexContainer>
        <div />
        <FlexContainer
          direction="column"
          justifyContent="space-between"
          gap={25}
        >
          <ImageDisplay
            imageUrl={data.imageUrl}
            onClick={() => {
              showUploadImageModal({});
            }}
          />
          <ContentBox title="About">
            <TightParagraph>{data?.ingredientDescription}</TightParagraph>
          </ContentBox>
          <IngredientNutrition ingredient={data} />
        </FlexContainer>
      </PageLayout>
    </PageTemplate>
  );
}
