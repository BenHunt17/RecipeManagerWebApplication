/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import StatisticsTable from "../../Components/Common/StatisticsTable";
import { AddButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/Layouts";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import UpdateIngredientImageForm from "../../Forms/IngredientForms/UpdateIngredientImageForm";
import UpdateIngredientForm from "../../Forms/IngredientForms/UpdateIngredientForm";
import useFetch from "../../Hooks/useFetch";
import useModal from "../../Hooks/useModal";
import { Ingredient } from "../../Types/IngredientTypes";
import ImageDisplay from "../../Components/Common/ImageDisplay";

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
  const { id } = useParams();
  const { data, loading, modifyData } = useFetch<Ingredient>({
    endpointPath: `https://localhost:5001/api/ingredient/${id}`,
  });

  const [
    updateIngredientModal,
    showUpdateIngredientModal,
    closeUpdateIngredientModal,
  ] = useModal(
    "Update Ingredient",
    (props: { existingIngredient: Ingredient }) => (
      <UpdateIngredientForm
        id={parseInt(id ?? "")}
        existingIngredient={props.existingIngredient}
        updateInFetchedIngredient={(updatedIngredient: Ingredient) =>
          modifyData(updatedIngredient)
        }
        close={() => closeUpdateIngredientModal()}
      />
    )
  );

  const [uploadImageModal, showUploadImageModal, closeUploadImageModal] =
    useModal("Change Image", () => (
      <UpdateIngredientImageForm
        id={id ?? ""}
        imageUrl={data?.imageUrl ?? null}
        updateInFetchedIngredient={(ingredient: Ingredient) =>
          modifyData(ingredient)
        }
        close={() => closeUploadImageModal()}
      />
    ));

  return (
    <PageTemplate>
      {!loading ? (
        data ? (
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
              {/* TODO-Make this into dedicatated updtae button design  */}
              <AddButton
                onClick={() =>
                  showUpdateIngredientModal({ existingIngredient: data })
                }
              >
                Update Ingredient
              </AddButton>
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
                <p className="noMargin">{data?.ingredientDescription}</p>
              </ContentBox>
              <ContentBox title="Nutritional Information">
                <StatisticsTable
                  id="nutrition-stats-table"
                  data={[
                    { title: "kcal", data: data.calories },
                    { title: "Fat", data: `${data.fat}g` ?? "Unknown" },
                    { title: "Salt", data: `${data.salt}g` ?? "Unknown" },
                    {
                      title: "Protein",
                      data: `${data.protein}g` ?? "Unknown",
                    },
                    { title: "Carbs", data: `${data.carbs}g` ?? "Unknown" },
                    { title: "5 a day", data: data.fruitVeg ? "YES" : "NO" }, //TODO: make this into an icon or something prettier. Also position it somewhere more easily seen
                  ]}
                />
              </ContentBox>
            </FlexContainer>
          </PageLayout>
        ) : (
          <ErrorScreen>Ingredient data not available</ErrorScreen>
        )
      ) : (
        <LoadingScreen>Loading Ingredient Data...</LoadingScreen>
      )}
      {updateIngredientModal}
      {uploadImageModal}
    </PageTemplate>
  );
}
