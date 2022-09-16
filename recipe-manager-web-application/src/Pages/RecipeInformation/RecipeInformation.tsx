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
} from "../../Components/Common/StyledComponents/Layouts";
import ImageDisplay from "../../Components/Common/ImageDisplay";
import useModal from "../../Hooks/useModal";
import { IconButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import UpdateRecipeImageForm from "../../Forms/RecipeForms/UpdateRecipeImageForm";
import EditIcon from "../../SVGs/EditIcon";
import { TightParagraph } from "../../Components/Common/StyledComponents/ContentComponents";
import UpdateRecipeForm from "../../Forms/RecipeForms/UpdateRecipeForm";

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
  const { recipeName } = useParams();

  const { data, loading, modifyData } = useFetch<Recipe>({
    endpointPath: `https://localhost:5001/api/recipe/${recipeName}`,
  });

  const [updateRecipeModal, showUpdateRecipeModal, closeUpdateRecipeModal] =
    useModal("Update Recipe", (props: { existingRecipe: Recipe }) => (
      <UpdateRecipeForm
        recipeName={recipeName ?? ""}
        existingRecipe={props.existingRecipe}
        updateInFetchedRecipe={(recipe: Recipe) => modifyData(recipe)}
        close={() => closeUpdateRecipeModal()}
      />
    ));

  const [uploadImageModal, showUploadImageModal, closeUploadImageModal] =
    useModal("Change Image", () => (
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
    ));

  return (
    <PageTemplate>
      {!loading ? (
        data ? (
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
              <RecipeIngredientsList
                recipe={data}
                updateInFetchedRecipe={modifyData}
              />
              <RecipeInstructions
                recipe={data}
                updateInFetchedRecipe={modifyData}
              />
            </FlexContainer>
            <FlexContainer
              direction="column"
              justifyContent="flex-start"
              gap={25}
            >
              <ImageDisplay
                imageUrl={data.imageUrl}
                onClick={() => showUploadImageModal({})}
              />
              <ContentBox title="About">
                <TightParagraph>{data?.recipeDescription}</TightParagraph>
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
      {updateRecipeModal}
      {uploadImageModal}
    </PageTemplate>
  );
}
