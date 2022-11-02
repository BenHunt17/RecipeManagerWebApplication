import ItemCard from "../Components/Common/ItemCard";
import useFetch from "../hooks/useFetch";
import useModal from "../hooks/useModal";
import { IngredientListItem } from "../types/ingredientTypes";
import DeleteIngredientForm from "../Forms/IngredientForms/DeleteIngredientForm";
import { Fragment } from "react";
import { PaginatedResponse, QueryParameters } from "../types/commonTypes";
import { PAGINATION_LIMIT } from "../Utilities/FilterUtilities";
import CollectionPage from "../Components/layouts/CollectionPage";
import IngredientFilterForm from "../Forms/IngredientForms/IngredientFilterForm";
import CreateIngredientForm from "../Forms/IngredientForms/CreateIngredientForm";
import { useFilters } from "../hooks/useFilters";
import { useNavigate } from "react-router-dom";

export default function IngredientCollectionPage() {
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
    PaginatedResponse<IngredientListItem>
  >({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredients`,
    queryParams: queryParams,
  });

  const [showDeleteIngredientModal, closeDeleteIngredientModal] = useModal(
    "Delete Ingredient",
    (props: { ingredientName: string }) => (
      <DeleteIngredientForm
        ingredientName={props.ingredientName}
        removeFromFetchedIngredients={() => {
          if (data) {
            modifyData({
              ...data,
              items:
                data.items.filter(
                  (item) => item.ingredientName !== props.ingredientName
                ) ?? [],
              total: data.total - 1,
            });
          }
        }}
        close={() => closeDeleteIngredientModal()}
      />
    )
  );

  const [showIngredientFilterModal, closeIngredientFilterModal] = useModal(
    "Set Filters",
    (props: { currentFilters: QueryParameters }) => (
      <IngredientFilterForm
        currentFilters={props.currentFilters}
        applyFilters={appendFilters}
        clearFilters={clearFilters}
        close={() => closeIngredientFilterModal()}
      />
    )
  );

  const [showCreateIngredientModal, closeCreateIngredientModal] = useModal(
    "Create Ingredient",
    () => (
      <CreateIngredientForm
        onComplete={(ingredient) =>
          navigate(`/ingredient/${ingredient.ingredientName}`)
        }
        close={() => closeCreateIngredientModal()}
      />
    )
  );

  return (
    <Fragment>
      <CollectionPage
        entityName="Ingredient"
        data={data?.items}
        loading={loading}
        renderItem={(ingredient: IngredientListItem) => {
          const footerText = [
            ...(ingredient.fruitVeg ? ["one of your 5 a day"] : []),
          ];

          return (
            <ItemCard
              key={`ingredient-card.${ingredient.ingredientName}`}
              id={`ingredient-card.${ingredient.ingredientName}`}
              title={ingredient.ingredientName}
              footerText={footerText}
              imageUrl={ingredient.imageUrl}
              linkTo={`/ingredient/${ingredient.ingredientName}`}
              onDeleteButtonClick={() =>
                showDeleteIngredientModal({
                  ingredientName: ingredient.ingredientName,
                })
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
            showIngredientFilterModal({ currentFilters: queryParams }),
          showCreateModal: () => showCreateIngredientModal({}),
        }}
      />
    </Fragment>
  );
}
