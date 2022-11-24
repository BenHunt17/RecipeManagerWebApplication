import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../../component/common/ItemCard";
import CollectionPage from "../../component/layout/CollectionPage";
import CreateRecipeForm from "../../form/recipes/CreateRecipeForm";
import DeleteRecipeForm from "../../form/recipes/DeleteRecipeForm";
import RecipeFilterForm from "../../form/recipes/RecipeFilterForm";
import useFetch from "../../hook/useFetch";
import { useFilters } from "../../hook/useFilters";
import useModal from "../../hook/useModal";
import { PaginatedResponse, QueryParameters } from "../../type/commonTypes";
import { RecipeListItem } from "../../type/recipeTypes";
import { PAGINATION_LIMIT } from "../../util/filterParams";
import { minutesToTimeString } from "../../util/recipe";

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

  const total = data?.total ?? 0;

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
        onComplete={(recipe) => navigate(`/recipe/${recipe.recipeName}`)}
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
                data.items?.filter(
                  (recipe) => recipe.recipeName !== props.recipeName
                ) ?? [],
              total,
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
        entityName="Recipe"
        data={data?.items}
        loading={loading}
        renderItem={(recipe: RecipeListItem) => {
          return (
            <ItemCard
              key={`recipe-card.${recipe.recipeName}`}
              id={`recipe-card.${recipe.recipeName}`}
              title={recipe?.recipeName ?? ""}
              footerText={[
                `Rating: ${"★".repeat(recipe?.rating ?? 0)}`,
                `🕐 ${minutesToTimeString(recipe?.prepTime ?? 0)}`,
              ]}
              imageUrl={recipe.imageUrl}
              linkTo={`/recipe/${recipe.recipeName}`}
              onDeleteButtonClick={() =>
                showDeleteRecipeModal({ recipeName: recipe?.recipeName ?? "" })
              }
            />
          );
        }}
        filter={{
          queryParams: queryParams,
          pageNumber: pageNumber,
          totalPages: data ? Math.ceil(total / PAGINATION_LIMIT) : 0,
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
