import ItemCard from "../../Components/Common/ItemCard";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/ScreenLayouts";
import useFetch from "../../Hooks/useFetch";
import { RecipeListItem } from "../../Types/RecipeTypes";
import { minutesToTimeString } from "../RecipeInformation/RecipeInformation";
import { CollectionContainer, CollectionHeader } from "./CollectionPageStyled";

export default function RecipeCollectionPage() {
  const { data, loading } = useFetch<RecipeListItem[]>({
    endpointPath: `https://localhost:5001/api/recipes`,
  });

  return (
    <PageTemplate>
      <CollectionHeader>
        <h2>Recipes</h2>
      </CollectionHeader>
      <CollectionContainer hasData={!!data}>
        {!loading ? (
          data ? (
            data.map((recipe) => (
              <ItemCard
                key={`recipe-card.${recipe.recipeName}`}
                title={recipe.recipeName}
                footerText={[
                  `Rating: ${"★".repeat(recipe.rating)}`,
                  `🕐 ${minutesToTimeString(recipe.prepTime)}`,
                ]}
                imageUrl={recipe.imageUrl}
                linkTo={`/recipe/${recipe.id}`}
              />
            ))
          ) : (
            <ErrorScreen>Recipes not available</ErrorScreen>
          )
        ) : (
          <LoadingScreen>Loading Recipes...</LoadingScreen>
        )}
      </CollectionContainer>
    </PageTemplate>
  );
}
