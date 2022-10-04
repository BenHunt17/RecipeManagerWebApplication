import { useEffect, useState } from "react";
import PageSelector from "../../../Components/Common/PageSelector";
import SearchAndFilter from "../../../Components/Common/SearchAndFilter";
import { AddButton } from "../../../Components/Common/StyledComponents/ButtonComponents";
import CreateRecipeForm from "../../../Forms/RecipeForms/CreateRecipeForm";
import RecipeFilterForm from "../../../Forms/RecipeForms/RecipeFilterForm";
import useModal from "../../../Hooks/useModal";
import { QueryParameters } from "../../../Types/CommonTypes";
import { Recipe } from "../../../Types/RecipeTypes";
import { getCount, PAGINATION_LIMIT } from "../../../Utilities/FilterUtilities";
import {
  CollectionControlsContainer,
  CollectionHeader,
  CollectionHeaderLeftContainer,
} from "../CollectionPageStyled";

export default function RecipeCollectionHeader({
  queryParams,
  setQueryParams,
  totalPages,
  loading,
  onAddRecipe,
}: {
  queryParams: QueryParameters;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParameters>>;
  totalPages: number;
  loading: boolean;
  onAddRecipe: (recipe: Recipe) => void;
}) {
  const [recipeNameQuery, setRecipeNameQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [recipeFilterModal, showRecipeFilterModal, closeRecipeFilterModal] =
    useModal("Set Filters", (props: { currentFilters: QueryParameters }) => (
      <RecipeFilterForm
        currentFilters={props.currentFilters}
        applyFilters={(newFilters) =>
          setQueryParams({
            offset: "PAGE:0",
            limit: `PAGE:${PAGINATION_LIMIT}`,
            ...(!!recipeNameQuery.length
              ? { recipeName: `LIKE:${recipeFilterModal}` }
              : {}),
            ...newFilters,
          })
        }
        clearFilters={() =>
          setQueryParams({
            offset: "PAGE:0",
            limit: `PAGE:${PAGINATION_LIMIT}`,
            ...(!!recipeNameQuery.length
              ? { recipeName: `LIKE:${recipeNameQuery}` }
              : {}),
          })
        }
        close={() => closeRecipeFilterModal()}
      />
    ));

  const [createRecipeModal, showCreateRecipeModal, closeCreateRecipeModal] =
    useModal("Create Recipe", () => (
      <CreateRecipeForm
        addToFetchedRecipes={onAddRecipe}
        close={() => closeCreateRecipeModal()}
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
        ...(!!recipeNameQuery.length
          ? { recipeName: `LIKE:${recipeNameQuery}` }
          : {}),
      }),
    [setQueryParams, recipeNameQuery]
  );

  return (
    <CollectionHeader>
      <CollectionHeaderLeftContainer>
        <h2>Recipes</h2>
        <CollectionControlsContainer>
          <SearchAndFilter
            onSearch={(query) => setRecipeNameQuery(query)}
            showFilterModal={() =>
              showRecipeFilterModal({ currentFilters: queryParams })
            }
            filterCount={getCount(queryParams)}
          />
          <PageSelector
            currentPageNumber={pageNumber}
            totalPages={totalPages}
            onSelect={(newPageNumber) => setPageNumber(newPageNumber)}
            disabled={loading}
          />
        </CollectionControlsContainer>
      </CollectionHeaderLeftContainer>
      <AddButton onClick={showCreateRecipeModal}>Create Recipe</AddButton>
      {recipeFilterModal}
      {createRecipeModal}
    </CollectionHeader>
  );
}
