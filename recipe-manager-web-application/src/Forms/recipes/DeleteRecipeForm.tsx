import DeleteForm from "../../components/layout/DeleteForm";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import { ItemKeyContext } from "../../type/storageTypes";
import { addToRecentActivity } from "../../util/recentActivityController";

export default function DeleteRecipeForm({
  recipeName,
  removeFromFetchedRecipes,
  close,
}: {
  recipeName: string;
  removeFromFetchedRecipes: () => void;
  close: () => void;
}) {
  const { callback: deleteRecipe, loading } = useMutate({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}`,
    httpMethod: HttpMethod.DELETE,
    onComplete: () => {
      removeFromFetchedRecipes();
      addToRecentActivity(
        "ingredient",
        recipeName,
        ItemKeyContext.DELETE,
        "recipes",
        null
      );
      close();
    },
  });

  return (
    <DeleteForm
      message="Are you sure you want to delete this Recipe? This action cannot be
        reverted."
      loading={loading}
      onConfirm={() => deleteRecipe()}
      onCancel={close}
    />
  );
}
