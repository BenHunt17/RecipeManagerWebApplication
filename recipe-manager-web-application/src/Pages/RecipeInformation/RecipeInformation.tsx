import styled from "@emotion/styled";
import ContentBox from "../../components/common/ContentBox";
import { Recipe } from "../../types/recipeTypes";
import RecipeInstructions from "./RecipeInstructions";
import RecipeIngredientsList from "./RecipeIngredientsList";
import RecipeNutrition from "./RecipeNutrition";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import BreakfastIcon from "../../svg/BreakfastIcon";
import DinnerIcon from "../../svg/DinnerIcon";
import LunchIcon from "../../svg/LunchIcon";
import { FlexContainer } from "../../components/styled/layouts";
import { PageTemplate } from "../../components/styled/layouts";
import ImageDisplay from "../../components/common/ImageDisplay";
import useModal from "../../hooks/useModal";
import { IconButton } from "../../components/styled/buttons";
import UpdateRecipeImageForm from "../../forms/recipes/recipeImage/UpdateRecipeImageForm";
import EditIcon from "../../svg/EditIcon";
import {
  ErrorScreen,
  LoadingScreen,
  TightParagraph,
} from "../../components/styled/output";
import UpdateRecipeForm from "../../forms/recipes/UpdateRecipeForm";
import { minutesToTimeString } from "../../utils/recipe";
import { useEffect } from "react";
import { ItemKeyContext } from "../../types/storageTypes";
import { addToRecentActivity } from "../../utils/recentActivityController";

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

export default function RecipeInformation() {
  const { recipeName } = useParams();

  const { data, loading, modifyData } = useFetch<Recipe>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}`,
  });

  const [showUpdateRecipeModal, closeUpdateRecipeModal] = useModal(
    "Update Recipe",
    (props: { existingRecipe: Recipe }) => (
      <UpdateRecipeForm
        recipeName={recipeName ?? ""}
        existingRecipe={props.existingRecipe}
        updateInFetchedRecipe={(recipe: Recipe) => modifyData(recipe)}
        close={() => closeUpdateRecipeModal()}
      />
    )
  );

  const [showUploadImageModal, closeUploadImageModal] = useModal(
    "Change Image",
    () => (
      <UpdateRecipeImageForm
        recipeName={recipeName ?? ""}
        imageUrl={data?.imageUrl ?? null}
        updateInFetchedRecipe={(imageUrl: string | null) => {
          if (data) {
            modifyData({ ...data, imageUrl: imageUrl });
          }
        }}
        close={() => closeUploadImageModal()}
      />
    )
  );

  useEffect(() => {
    addToRecentActivity(
      "recipe",
      data?.recipeName ?? "",
      ItemKeyContext.VIEW,
      `recipe/${data?.recipeName ?? ""}`,
      data?.imageUrl
    );
  }, [data, recipeName]);

  if (loading) {
    return (
      <PageTemplate>
        <LoadingScreen>Loading Recipe...</LoadingScreen>
      </PageTemplate>
    );
  }
  if (!data) {
    return (
      <PageTemplate>
        <ErrorScreen>Recipe not available</ErrorScreen>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <ContentLayout>
        <FlexContainer
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={25}
        >
          <h2>{data.recipeName}</h2>
          <IconButton
            onClick={() => showUpdateRecipeModal({ existingRecipe: data })}
          >
            <EditIcon width={24} height={30} />
          </IconButton>
        </FlexContainer>
        <FlexContainer
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={25}
        >
          <p>
            🕐
            <b> {minutesToTimeString(data?.prepTime ?? 0)}</b>
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
        <FlexContainer direction="column" justifyContent="flex-start" gap={25}>
          <RecipeIngredientsList
            recipe={data}
            updateInFetchedRecipe={modifyData}
          />
          <RecipeInstructions
            recipe={data}
            updateInFetchedRecipe={modifyData}
          />
        </FlexContainer>
        <FlexContainer direction="column" justifyContent="flex-start" gap={25}>
          <ImageDisplay
            imageUrl={data.imageUrl}
            onClick={() => showUploadImageModal({})}
          />
          <ContentBox title="About">
            <TightParagraph>{data?.recipeDescription}</TightParagraph>
          </ContentBox>
          <RecipeNutrition
            recipeIngredients={data?.ingredients ?? []}
            servingSize={data?.servingSize ?? 0}
          />
        </FlexContainer>
      </ContentLayout>
    </PageTemplate>
  );
}
