import ItemCard from "../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/ScreenLayouts";
import Modal from "../../Components/Modal";
import CreateIngredientForm from "../../Forms/CreateIngredientForm";
import useFetch from "../../Hooks/useFetch";
import useModal from "../../Hooks/useModal";
import { IngredientListItem } from "../../Types/IngredientTypes";
import { CollectionContainer, CollectionHeader } from "./CollectionPageStyled";

export default function IngredientCollectionPage() {
  const { data, loading } = useFetch<IngredientListItem[]>({
    endpointPath: "https://localhost:5001/api/ingredients",
  });
  const [modal, OpenModal] = useModal(
    "Create Ingredient",
    <CreateIngredientForm />
  );

  return (
    <PageTemplate>
      <CollectionHeader>
        <h2>Ingredients</h2>
        <button onClick={OpenModal}>Create Ingredient</button>
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
      {modal}
    </PageTemplate>
  );
}
