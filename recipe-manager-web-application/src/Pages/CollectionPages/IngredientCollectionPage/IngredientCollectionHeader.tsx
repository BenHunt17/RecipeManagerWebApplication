import { useEffect, useState } from "react";
import PageSelector from "../../../Components/Common/PageSelector";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter";
import { AddButton } from "../../../Components/Common/StyledComponents/ButtonComponents";
import CreateIngredientForm from "../../../Forms/IngredientForms/CreateIngredientForm";
import IngredientFilterForm from "../../../Forms/IngredientForms/IngredientFilterForm";
import useModal from "../../../Hooks/useModal";
import { QueryParamters } from "../../../Types/CommonTypes";
import { Ingredient } from "../../../Types/IngredientTypes";
import { PAGINATION_LIMIT } from "../../../Utilities/FilterUtilities";
import { CollectionHeader } from "../CollectionPageStyled";

export default function IngredientCollectionHeader({
  queryParams,
  setQueryParams,
  totalPages,
  loading,
  onAddIngredient,
}: {
  queryParams: QueryParamters;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamters>>;
  totalPages: number;
  loading: boolean;
  onAddIngredient: (ingredient: Ingredient) => void;
}) {
  const [ingredientNameQuery, setIngredientNameQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  //TODO - this modal hook is really messy tbh. Need to rework it
  const [
    ingredientFilterModal,
    showIngredientFilterModal,
    closeIngredientFilterModal,
  ] = useModal("Set Filters", (props: { currentFilters: QueryParamters }) => (
    <IngredientFilterForm
      currentFilters={props.currentFilters}
      applyFilters={(newFilters) =>
        setQueryParams({
          offset: "PAGE:0",
          limit: `PAGE:${PAGINATION_LIMIT}`,
          ...(ingredientNameQuery
            ? { ingredientName: `LIKE:${ingredientNameQuery}` }
            : {}),
          ...newFilters,
        })
      }
      clearFilters={() =>
        setQueryParams({
          offset: "PAGE:0",
          limit: `PAGE:${PAGINATION_LIMIT}`,
          ...(ingredientNameQuery
            ? { ingredientName: `LIKE:${ingredientNameQuery}` }
            : {}),
        })
      }
      close={() => closeIngredientFilterModal()}
    />
  ));

  const [
    createIngredientModal,
    showCreateIngredientModal,
    closeCreateIngredientModal,
  ] = useModal("Create Ingredient", () => (
    <CreateIngredientForm
      addToFetchedIngredients={onAddIngredient}
      close={() => closeCreateIngredientModal()}
    />
  ));

  useEffect(() => {
    setQueryParams(() => {
      return {
        ...queryParams,
        offset: `PAGE:${(pageNumber - 1) * PAGINATION_LIMIT}`,
      };
    });
  }, [setQueryParams, pageNumber]);

  useEffect(
    () =>
      setQueryParams({
        offset: "PAGE:0",
        limit: `PAGE:${PAGINATION_LIMIT}`,
        ingredientName: `LIKE:${ingredientNameQuery}`,
      }),
    [setQueryParams, ingredientNameQuery]
  );

  return (
    <CollectionHeader>
      <h2>Ingredients</h2>
      <SearchAndFilter
        onSearch={(query) => setIngredientNameQuery(query)}
        showFilterModal={() =>
          showIngredientFilterModal({ currentFilters: queryParams })
        }
        onFilterApply={(filters: QueryParamters) => {
          setQueryParams({
            ...filters,
            offset: "PAGE:0",
            limit: `PAGE:${PAGINATION_LIMIT}`,
            ingredientNameParam: `LIKE:${ingredientNameQuery}`,
          });
        }}
      />
      <PageSelector
        currentPageNumber={pageNumber}
        totalPages={totalPages}
        onSelect={(newPageNumber) => setPageNumber(newPageNumber)}
        disabled={loading}
      />
      <AddButton onClick={showCreateIngredientModal}>
        Create Ingredient
      </AddButton>
      {ingredientFilterModal}
      {createIngredientModal}
    </CollectionHeader>
  );
}
