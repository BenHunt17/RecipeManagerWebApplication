/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ContentBox from "../../Components/Common/ContentBox";
import ImagePlaceholder from "../../Components/Common/ImagePlaceholder";
import StatisticsTable from "../../Components/Common/StatisticsTable";
import { ImageFrame } from "../../Components/Common/StyledComponents/ContentComponents";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/ScreenLayouts";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useFetch from "../../Hooks/useFetch";
import { Ingredient } from "../../Types/IngredientTypes";

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

  const { data, loading } = useFetch<Ingredient>({
    endpointPath: `https://localhost:5001/api/ingredient/${id}`,
  });

  return (
    <PageTemplate>
      {!loading ? (
        data ? (
          <PageLayout>
            <h2
              css={css`
                grid-column: span 2;
              `}
            >
              {data.ingredientName}
            </h2>

            <FlexContainer
              direction="column"
              justifyContent="space-between"
              gap={25}
            >
              <ImageFrame>
                {data.imageUrl ? (
                  <img src={data.imageUrl} width="100%" />
                ) : (
                  <ImagePlaceholder />
                )}
              </ImageFrame>
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
    </PageTemplate>
  );
}
