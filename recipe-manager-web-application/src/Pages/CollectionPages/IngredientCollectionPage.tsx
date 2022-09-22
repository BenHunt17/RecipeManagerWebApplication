import ItemCard from "../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/Layouts";
import useFetch from "../../Hooks/useFetch";
import useModal from "../../Hooks/useModal";
import { Ingredient, IngredientListItem } from "../../Types/IngredientTypes";
import { CollectionContainer, CollectionHeader } from "./CollectionPageStyled";
import { AddButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import CreateIngredientForm from "../../Forms/IngredientForms/CreateIngredientForm";
import DeleteIngredientForm from "../../Forms/IngredientForms/DeleteIngredientForm";
import { useEffect, useState } from "react";
import PageSelector from "../../Components/Common/PageSelector";
import { PaginatedResponse } from "../../Types/CommonTypes";

const PAGINATION_LIMIT = 10;

export default function IngredientCollectionPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const [queryParams, setQueryParams] = useState<Record<string, string>>({
    offset: "PAGE:0",
    limit: `PAGE:${PAGINATION_LIMIT}`,
  });

  const { data, loading, modifyData } = useFetch<
    PaginatedResponse<IngredientListItem>
  >({
    endpointPath: "https://localhost:5001/api/ingredients",
    queryParams: queryParams,
  });
  const [
    createIngredientModal,
    showCreateIngredientModal,
    closeCreateIngredientModal,
  ] = useModal("Create Ingredient", () => (
    <CreateIngredientForm
      addToFetchedIngredients={(ingredient: Ingredient) => {
        if (data) {
          modifyData({ ...data, items: [...data.items, ingredient] });
        }
      }}
      close={() => closeCreateIngredientModal()}
    />
  ));

  const [
    deleteIngredientModal,
    showDeleteIngredientModal,
    closeDeleteIngredientModal,
  ] = useModal("Delete Ingredient", (props: { ingredientName: string }) => (
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
  ));

  useEffect(() => {
    setQueryParams((prev) => {
      return {
        ...prev,
        offset: `PAGE:${(pageNumber - 1) * PAGINATION_LIMIT}`,
      };
    });
  }, [setQueryParams, pageNumber]);

  return (
    <PageTemplate>
      <CollectionHeader>
        <h2>Ingredients</h2>
        <PageSelector
          currentPageNumber={pageNumber}
          totalPages={data ? Math.ceil(data.total / PAGINATION_LIMIT) : 0}
          onSelect={(newPageNumber) => setPageNumber(newPageNumber)}
          disabled={loading}
        />
        <AddButton onClick={showCreateIngredientModal}>
          Create Ingredient
        </AddButton>
      </CollectionHeader>
      <CollectionContainer hasData={!!data}>
        {!loading ? (
          data ? (
            data.items.map((ingredient) => {
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
            })
          ) : (
            <ErrorScreen>Ingredients not available</ErrorScreen>
          )
        ) : (
          <LoadingScreen>Loading Ingredients...</LoadingScreen>
        )}
      </CollectionContainer>
      {createIngredientModal}
      {deleteIngredientModal}
    </PageTemplate>
  );
}
