import { useEffect, useState } from "react";
import PageSelector from "../../../Components/Common/PageSelector";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter";
import { AddButton } from "../../../Components/Common/StyledComponents/ButtonComponents";
import CreateIngredientForm from "../../../Forms/IngredientForms/CreateIngredientForm";
import IngredientFilterForm from "../../../Forms/IngredientForms/IngredientFilterForm";
import useModal from "../../../Hooks/useModal";
import { QueryParameters } from "../../../types/commonTypes";
import { Ingredient } from "../../../types/ingredientTypes";
import { getCount, PAGINATION_LIMIT } from "../../../Utilities/FilterUtilities";
import {
  CollectionControlsContainer,
  CollectionHeader,
  CollectionHeaderLeftContainer,
} from "../CollectionPageStyled";

export default function IngredientCollectionHeader({
  queryParams,
  setQueryParams,
  totalPages,
  onAddIngredient,
}: {
  queryParams: QueryParameters;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParameters>>;
  totalPages: number | undefined;
  onAddIngredient: (ingredient: Ingredient) => void;
}) {
  const [ingredientNameQuery, setIngredientNameQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  //TODO - this modal hook is really messy tbh. Need to rework it
  const [
    ingredientFilterModal,
    showIngredientFilterModal,
    closeIngredientFilterModal,
  ] = useModal("Set Filters", (props: { currentFilters: QueryParameters }) => (
    <IngredientFilterForm
      currentFilters={props.currentFilters}
      applyFilters={(newFilters) =>
        setQueryParams({
          offset: "PAGE:0",
          limit: `PAGE:${PAGINATION_LIMIT}`,
          ...(!!ingredientNameQuery.length
            ? { ingredientName: `LIKE:${ingredientNameQuery}` }
            : {}),
          ...newFilters,
        })
      }
      clearFilters={() =>
        setQueryParams({
          offset: "PAGE:0",
          limit: `PAGE:${PAGINATION_LIMIT}`,
          ...(!!ingredientNameQuery.length
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
        ...(!!ingredientNameQuery.length
          ? { ingredientName: `LIKE:${ingredientNameQuery}` }
          : {}),
      }),
    [setQueryParams, ingredientNameQuery]
  );

  return (
    <CollectionHeader>
      <CollectionHeaderLeftContainer>
        <h2>Ingredients</h2>
        <CollectionControlsContainer>
          <SearchAndFilter
            onSearch={(query) => setIngredientNameQuery(query)}
            showFilterModal={() =>
              showIngredientFilterModal({ currentFilters: queryParams })
            }
            filterCount={getCount(queryParams)}
          />
          <PageSelector
            currentPageNumber={pageNumber}
            totalPages={totalPages}
            onSelect={(newPageNumber) => setPageNumber(newPageNumber)}
          />
        </CollectionControlsContainer>
      </CollectionHeaderLeftContainer>
      <AddButton onClick={showCreateIngredientModal}>
        Create Ingredient
      </AddButton>
      {ingredientFilterModal}
      {createIngredientModal}
    </CollectionHeader>
  );
}
