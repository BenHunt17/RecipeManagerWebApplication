import DeleteForm from "../../Components/layouts/DeleteForm";
import useMutate, { HttpMethod } from "../../hooks/useMutate";

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
