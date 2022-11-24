import DeleteForm from "../../components/layout/DeleteForm";
import useMutate, { HttpMethod } from "../../hooks/useMutate";
import { ItemKeyContext } from "../../type/storageTypes";
import { addToRecentActivity } from "../../util/recentActivityController";

export default function DeleteIngredientForm({
  ingredientName,
  removeFromFetchedIngredients,
  close,
}: {
  ingredientName: string;
  removeFromFetchedIngredients: () => void;
  close: () => void;
}) {
  const { callback: deleteIngredient, loading } = useMutate({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}ingredient/${ingredientName}`,
    httpMethod: HttpMethod.DELETE,
    onComplete: () => {
      removeFromFetchedIngredients();
      addToRecentActivity(
        "ingredient",
        ingredientName,
        ItemKeyContext.DELETE,
        "ingredients",
        null
      );
      close();
    },
  });

  return (
    <DeleteForm
      message="Are you sure you want to delete this ingredient? This action cannot be reverted."
      loading={loading}
      onConfirm={() => deleteIngredient()}
      onCancel={close}
    />
  );
}
