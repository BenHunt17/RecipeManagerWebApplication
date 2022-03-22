import {
  ErrorScreen,
  FlexContainer,
  ImageFrame,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/StyledComponents";
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

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 25px;
`;

function minutesToTimeString(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

export default function RecipeInformation() {
  const { id } = useParams();

  const { data, loading } = useFetch<Recipe>({
    endpointPath: `https://localhost:5001/api/recipe?id=${id}`,
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
                Time:
                <b> {minutesToTimeString(data.prepTime ?? 0)}</b>
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
                <img src={data?.imageUrl} width="100%" />
              </ImageFrame>
              <ContentBox title="About">
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
