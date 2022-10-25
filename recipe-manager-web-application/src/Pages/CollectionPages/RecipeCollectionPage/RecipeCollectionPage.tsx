import { SetStateAction, useState } from "react";
import ItemCard from "../../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../../Components/Common/StyledComponents/Layouts";
import DeleteRecipeForm from "../../../Forms/RecipeForms/DeleteRecipeForm";
import useFetch from "../../../hooks/useFetch";
import useModal from "../../../hooks/useModal";
import { PaginatedResponse, QueryParameters } from "../../../types/commonTypes";
import { Recipe, RecipeListItem } from "../../../types/recipeTypes";
import { PAGINATION_LIMIT } from "../../../Utilities/FilterUtilities";
import { minutesToTimeString } from "../../../Utilities/Recipes";
import { CollectionContainer } from "../CollectionPageStyled";
import RecipeCollectionHeader from "./RecipeCollectionHeader";

export default function RecipeCollectionPage() {
  const [queryParams, setQueryParams] = useState<QueryParameters>({
    offset: "PAGE:0",
    limit: `PAGE:${PAGINATION_LIMIT}`,
  });

  const { data, loading, modifyData } = useFetch<
    PaginatedResponse<RecipeListItem>
  >({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipes`,
    queryParams: queryParams,
  });

  const [deleteReipeModal, showDeleteRecipeModal, closeDeleteRecipeModal] =
    useModal("Delete Recipe", (props: { recipeName: string }) => (
      <DeleteRecipeForm
        recipeName={props.recipeName}
        removeFromFetchedRecipes={() => {
          if (data) {
            modifyData({
              ...data,
              items:
                data.items.filter(
                  (recipe) => recipe.recipeName !== props.recipeName
                ) ?? [],
              total: data.total - 1,
            });
          }
        }}
        close={() => closeDeleteRecipeModal()}
      />
    ));

  return (
    <PageTemplate>
      <RecipeCollectionHeader
        onAddRecipe={(recipe: Recipe) => {
          if (data) {
            modifyData({ ...data, items: [...data.items, recipe] });
          }
        }}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        totalPages={data ? Math.ceil(data.total / PAGINATION_LIMIT) : undefined}
      />
      <CollectionContainer hasData={!!data}>
        {!loading ? (
          data ? (
            data.items.map((recipe) => (
              <ItemCard
                key={`recipe-card.${recipe.recipeName}`}
                id={`recipe-card.${recipe.recipeName}`}
                title={recipe.recipeName}
                footerText={[
                  `Rating: ${"★".repeat(recipe.rating)}`,
                  `🕐 ${minutesToTimeString(recipe.prepTime)}`,
                ]}
                imageUrl={recipe.imageUrl}
                linkTo={`/recipe/${recipe.recipeName}`}
                onDeleteButtonClick={() =>
                  showDeleteRecipeModal({ recipeName: recipe.recipeName })
                }
              />
            ))
          ) : (
            <ErrorScreen>Recipes not available</ErrorScreen>
          )
        ) : (
          <LoadingScreen>Loading Recipes...</LoadingScreen>
        )}
      </CollectionContainer>
      {deleteReipeModal}
    </PageTemplate>
  );
}
