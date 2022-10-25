import ItemCard from "../../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../../Components/Common/StyledComponents/Layouts";
import useFetch from "../../../Hooks/useFetch";
import useModal from "../../../Hooks/useModal";
import { Ingredient, IngredientListItem } from "../../../Types/IngredientTypes";
import { CollectionContainer } from "../CollectionPageStyled";
import DeleteIngredientForm from "../../../Forms/IngredientForms/DeleteIngredientForm";
import { useState } from "react";
import { PaginatedResponse, QueryParameters } from "../../../Types/CommonTypes";
import IngredientCollectionHeader from "./IngredientCollectionHeader";
import { PAGINATION_LIMIT } from "../../../Utilities/FilterUtilities";

export default function IngredientCollectionPage() {
  const [queryParams, setQueryParams] = useState<QueryParameters>({
    offset: "PAGE:0",
    limit: `PAGE:${PAGINATION_LIMIT}`,
  });

  const { data, loading, modifyData } = useFetch<
    PaginatedResponse<IngredientListItem>
  >({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredients`,
    queryParams: queryParams,
  });

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

  return (
    <PageTemplate>
      <IngredientCollectionHeader
        onAddIngredient={(ingredient: Ingredient) => {
          if (data) {
            modifyData({ ...data, items: [...data.items, ingredient] });
          }
        }}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        totalPages={data ? Math.ceil(data.total / PAGINATION_LIMIT) : undefined}
      />
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
      {deleteIngredientModal}
    </PageTemplate>
  );
}
