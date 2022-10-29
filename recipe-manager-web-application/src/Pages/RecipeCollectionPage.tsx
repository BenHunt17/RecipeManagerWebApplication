import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../Components/Common/ItemCard";
import CollectionPage from "../Components/templates/CollectionPage";
import CreateRecipeForm from "../Forms/recipes/CreateRecipeForm";
import DeleteRecipeForm from "../Forms/recipes/DeleteRecipeForm";
import RecipeFilterForm from "../Forms/recipes/RecipeFilterForm";
import useFetch from "../hooks/useFetch";
import { useFilters } from "../hooks/useFilters";
import useModal from "../hooks/useModal";
import { PaginatedResponse, QueryParameters } from "../types/commonTypes";
import { RecipeListItem } from "../types/recipeTypes";
import { PAGINATION_LIMIT } from "../Utilities/FilterUtilities";
import { minutesToTimeString } from "../Utilities/Recipes";

export default function RecipeCollectionPage() {
  const {
    queryParams,
    pageNumber,
    appendFilters,
    clearFilters,
    onSearch,
    onPageChange,
  } = useFilters();
  const navigate = useNavigate();

  const { data, loading, modifyData } = useFetch<
    PaginatedResponse<RecipeListItem>
  >({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipes`,
    queryParams: queryParams,
  });

  const [showRecipeFilterModal, closeRecipeFilterModal] = useModal(
    "Set Filters",
    (props: { currentFilters: QueryParameters }) => (
      <RecipeFilterForm
        currentFilters={props.currentFilters}
        applyFilters={appendFilters}
        clearFilters={clearFilters}
        close={() => closeRecipeFilterModal()}
      />
    )
  );

  const [showCreateRecipeModal, closeCreateRecipeModal] = useModal(
    "Create Recipe",
    () => (
      <CreateRecipeForm
        onComplete={(recipe) => navigate(`/recipes/${recipe.recipeName}`)}
        close={() => closeCreateRecipeModal()}
      />
    )
  );

  const [showDeleteRecipeModal, closeDeleteRecipeModal] = useModal(
    "Delete Recipe",
    (props: { recipeName: string }) => (
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
    )
  );

  return (
    <Fragment>
      <CollectionPage
        entityName="Ingredient"
        data={data?.items}
        loading={loading}
        renderItem={(recipe: RecipeListItem) => {
          return (
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
          );
        }}
        filter={{
          queryParams: queryParams,
          pageNumber: pageNumber,
          totalPages: data ? Math.ceil(data.total / PAGINATION_LIMIT) : 0,
        }}
        callbacks={{
          setSearchFilter: onSearch,
          setPageNumber: onPageChange,
          showFilterModal: () =>
            showRecipeFilterModal({ currentFilters: queryParams }),
          showCreateModal: () => showCreateRecipeModal({}),
        }}
      />
    </Fragment>
  );
}
