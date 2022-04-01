import ItemCard from "../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/ScreenLayouts";
import useFetch from "../../Hooks/useFetch";
import { IngredientListItem } from "../../Types/IngredientTypes";
import { CollectionContainer, CollectionHeader } from "./CollectionPageStyled";

export default function IngredientCollectionPage() {
  const { data, loading } = useFetch<IngredientListItem[]>({
    endpointPath: `https://localhost:5001/api/ingredients`,
  });

  return (
    <PageTemplate>
      <CollectionHeader>
        <h2>Ingredients</h2>
      </CollectionHeader>
      <CollectionContainer hasData={!!data}>
        {!loading ? (
          data ? (
            data.map((ingredient) => (
              <ItemCard
                key={`ingredient-card.${ingredient.ingredientName}`}
                title={ingredient.ingredientName}
                footerText={ingredient.fruitVeg ? ["One of your 5 a day"] : []}
                imageUrl={ingredient.imageUrl}
                linkTo={`/ingredient/${ingredient.id}`}
              />
            ))
          ) : (
            <ErrorScreen>Ingredients not available</ErrorScreen>
          )
        ) : (
          <LoadingScreen>Loading Ingredients...</LoadingScreen>
        )}
      </CollectionContainer>
    </PageTemplate>
  );
}
