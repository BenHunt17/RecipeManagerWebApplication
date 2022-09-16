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

export default function IngredientCollectionPage() {
  const { data, loading, modifyData } = useFetch<IngredientListItem[]>({
    endpointPath: "https://localhost:5001/api/ingredients",
  });
  const [
    createIngredientModal,
    showCreateIngredientModal,
    closeCreateIngredientModal,
  ] = useModal("Create Ingredient", () => (
    <CreateIngredientForm
      addToFetchedIngredients={(ingredient: Ingredient) => {
        if (data) {
          modifyData([...data, ingredient]);
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
      removeFromFetchedIngredients={() =>
        modifyData(
          data?.filter(
            (ingredient) => ingredient.ingredientName !== props.ingredientName
          )
        )
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
