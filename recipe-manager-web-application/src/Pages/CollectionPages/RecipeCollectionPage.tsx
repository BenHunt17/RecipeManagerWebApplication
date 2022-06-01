import ItemCard from "../../Components/Common/ItemCard";
import { AddButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import {
  ErrorScreen,
  LoadingScreen,
  PageTemplate,
} from "../../Components/Common/StyledComponents/Layouts";
import CreateRecipeForm from "../../Forms/CreateRecipeForm/CreateRecipeForm";
import DeleteRecipeForm from "../../Forms/CreateRecipeForm/DeleteRecipeForm";
import useFetch from "../../Hooks/useFetch";
import useModal from "../../Hooks/useModal";
import { RecipeListItem } from "../../Types/RecipeTypes";
import { minutesToTimeString } from "../RecipeInformation/RecipeInformation";
import { CollectionContainer, CollectionHeader } from "./CollectionPageStyled";

export default function RecipeCollectionPage() {
  const { data, loading, modifyData } = useFetch<RecipeListItem[]>({
    endpointPath: "https://localhost:5001/api/recipes",
  });
  const [createRecipeModal, showCreateRecipeModal] = useModal(
    "Create Recipe",
    () => <CreateRecipeForm />
  );

  const [deleteReipeModal, showDeleteRecipeModal, closeDeleteRecipeModal] =
    useModal("Delete Recipe", (props: { id: number }) => (
      <DeleteRecipeForm
        id={props.id}
        removeFromFetchedRecipes={(id: number) =>
          modifyData(data?.filter((recipe) => recipe.id !== id))
        }
        close={() => closeDeleteRecipeModal()}
      />
    ));

  return (
    <PageTemplate>
      <CollectionHeader>
        <h2>Recipes</h2>
        <AddButton onClick={showCreateRecipeModal}>Create Recipe</AddButton>
      </CollectionHeader>
      <CollectionContainer hasData={!!data}>
        {!loading ? (
          data ? (
            data.map((recipe) => (
              <ItemCard
                key={`recipe-card.${recipe.recipeName}`}
                id={`recipe-card.${recipe.recipeName}`}
                title={recipe.recipeName}
                footerText={[
                  `Rating: ${"★".repeat(recipe.rating)}`,
                  `🕐 ${minutesToTimeString(recipe.prepTime)}`,
                ]}
                imageUrl={recipe.imageUrl}
                linkTo={`/recipe/${recipe.id}`}
                onDeleteButtonClick={() =>
                  showDeleteRecipeModal({ id: recipe.id })
                }
              />
            ))
          ) : (
            <ErrorScreen>Recipes not available</ErrorScreen>
          )
        ) : (
          <LoadingScreen>Loading Recipes...</LoadingScreen>
        )}
      </CollectionContainer>
      {createRecipeModal}
      {deleteReipeModal}
    </PageTemplate>
  );
}
