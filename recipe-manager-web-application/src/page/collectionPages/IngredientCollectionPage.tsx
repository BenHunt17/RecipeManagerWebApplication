import ItemCard from "../../component/common/ItemCard";
import useFetch from "../../hook/useFetch";
import useModal from "../../hook/useModal";
import { IngredientListItem } from "../../type/ingredientTypes";
import DeleteIngredientForm from "../../form/ingredients/DeleteIngredientForm";
import { Fragment } from "react";
import { PaginatedResponse, QueryParameters } from "../../type/commonTypes";
import { PAGINATION_LIMIT } from "../../util/filterParams";
import CollectionPage from "../../component/layout/CollectionPage";
import IngredientFilterForm from "../../form/ingredients/IngredientFilterForm";
import CreateIngredientForm from "../../form/ingredients/CreateIngredientForm";
import { useFilters } from "../../hook/useFilters";
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

  const total = data?.total ? data.total - 1 : 0;

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
                data.items?.filter(
                  (item) => item.ingredientName !== props.ingredientName
                ) ?? [],
              total,
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
              title={ingredient?.ingredientName ?? ""}
              footerText={footerText}
              imageUrl={ingredient?.imageUrl}
              linkTo={`/ingredient/${ingredient.ingredientName}`}
              onDeleteButtonClick={() =>
                showDeleteIngredientModal({
                  ingredientName: ingredient?.ingredientName ?? "",
                })
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
            showIngredientFilterModal({ currentFilters: queryParams }),
          showCreateModal: () => showCreateIngredientModal({}),
        }}
      />
    </Fragment>
  );
}
