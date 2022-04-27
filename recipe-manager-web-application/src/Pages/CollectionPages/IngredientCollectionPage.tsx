import { useState } from "react";
import ItemCard from "../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/ScreenLayouts";
import DeleteIngredientForm from "../../Forms/DeleteIngredientForm";
import CreateIngredientForm from "../../Forms/CreateIngredientForm";
import useFetch from "../../Hooks/useFetch";
import useModal from "../../Hooks/useModal";
import { Ingredient, IngredientListItem } from "../../Types/IngredientTypes";
import { CollectionContainer, CollectionHeader } from "./CollectionPageStyled";
import { AddButton } from "../../Components/Common/StyledComponents/ButtonComponents";

export default function IngredientCollectionPage() {
  const { data, loading, modifyData } = useFetch<IngredientListItem[]>({
    endpointPath: "https://localhost:5001/api/ingredients",
  });
  const [createIngredientModal, showCreateIngredientModal] = useModal(
    "Create Ingredient",
    () => <CreateIngredientForm />
  );

  const [
    deleteIngredientModal,
    showDeleteIngredientModal,
    closeDeleteIngredientModal,
  ] = useModal("Delete Ingredient", (props: { id: number }) => (
    <DeleteIngredientForm
      id={props.id}
      removeFromFetchedIngredients={(id: number) =>
        modifyData(data?.filter((ingredient) => ingredient.id !== id))
      }
      close={() => closeDeleteIngredientModal()}
    />
  ));

  return (
    <PageTemplate>
      <CollectionHeader>
        <h2>Ingredients</h2>
        <AddButton onClick={showCreateIngredientModal}>
          Create Ingredient
        </AddButton>
      </CollectionHeader>
      <CollectionContainer hasData={!!data}>
        {!loading ? (
          data ? (
            data.map((ingredient) => {
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
                  linkTo={`/ingredient/${ingredient.id}`}
                  onDeleteButtonClick={() =>
                    showDeleteIngredientModal({ id: ingredient.id })
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
