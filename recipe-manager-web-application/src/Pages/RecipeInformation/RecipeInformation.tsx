import { ImageFrame } from "../../Components/Common/StyledComponents/ContentComponents";
import styled from "@emotion/styled";
import ContentBox from "../../Components/Common/ContentBox";
import { Recipe } from "../../Types/RecipeTypes";
import RecipeInstructions from "./RecipeInstructions";
import RecipeIngredientsList from "./RecipeIngredientsList";
import RecipeNutrition from "./RecipeNutrition";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";
import BreakfastIcon from "../../SVGs/BreakfastIcon";
import DinnerIcon from "../../SVGs/DinnerIcon";
import LunchIcon from "../../SVGs/LunchIcon";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/ScreenLayouts";
import ImagePlaceholder from "../../Components/Common/ImagePlaceholder";

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 25px;
  max-height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export function minutesToTimeString(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

export default function RecipeInformation() {
  const { id } = useParams();

  const { data, loading } = useFetch<Recipe>({
    endpointPath: `https://localhost:5001/api/recipe/${id}`,
  });

  return (
    <PageTemplate>
      {!loading ? (
        data ? (
          <ContentLayout>
            <h2>{data.recipeName}</h2>
            <FlexContainer
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={25}
            >
              <p>
                🕐
                <b> {minutesToTimeString(data.prepTime)}</b>
              </p>
              <p>
                Serves: <b>{data?.servingSize}</b>
              </p>
              <FlexContainer
                direction="row"
                justifyContent="space-between"
                gap={10}
              >
                <BreakfastIcon
                  opacity={data.breakfast ? "1" : "0.2"}
                  width={25}
                  height={25}
                />
                <LunchIcon
                  opacity={data.lunch ? "1" : "0.2"}
                  width={25}
                  height={25}
                />
                <DinnerIcon
                  opacity={data.dinner ? "1" : "0.2"}
                  width={25}
                  height={25}
                />
              </FlexContainer>
              <h2>{"⭐".repeat(data.rating ?? 0)}</h2>
            </FlexContainer>

            <FlexContainer
              direction="column"
              justifyContent="flex-start"
              gap={25}
            >
              <RecipeIngredientsList recipeIngredients={data.ingredients} />
              <RecipeInstructions recipeInstructions={data.instructions} />
            </FlexContainer>
            <FlexContainer
              direction="column"
              justifyContent="flex-start"
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
                {/* TODO: make noMargin class into a generic "text" styled component  */}
                <p className="noMargin">{data?.recipeDescription}</p>
              </ContentBox>
              <RecipeNutrition recipeIngredients={data.ingredients} />
            </FlexContainer>
          </ContentLayout>
        ) : (
          <ErrorScreen>Recipe data not available</ErrorScreen>
        )
      ) : (
        <LoadingScreen>Loading Recipe Data...</LoadingScreen>
      )}
    </PageTemplate>
  );
}
