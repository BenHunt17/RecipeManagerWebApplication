import { useState } from "react";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import { Recipe } from "../../Types/RecipeTypes";
import UpdateImageForm from "../UpdateImageForm";

export default function UpdateRecipeImageForm({
  id,
  imageUrl,
  updateInFetchedRecipe,
  close,
}: {
  id: string;
  imageUrl: string | null;
  updateInFetchedRecipe: (recipe: Recipe) => void;
  close: () => void;
}) {
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  const { callback: uploadImage, loading: uploadLoading } = useMutate<Recipe>(
    `https://localhost:5001/api/recipe/${id}/image`,
    HttpMethod.PUT,
    (recipe) => {
      updateInFetchedRecipe(recipe);
      close();
    },
    undefined
  );

  const { callback: removeImage, loading: removeLoading } = useMutate<Recipe>(
    `https://localhost:5001/api/recipe/${id}/image`,
    HttpMethod.DELETE,
    (recipe) => {
      updateInFetchedRecipe(recipe);
      close();
    },
    undefined
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();

    if (recipeImage) {
      formData.append("imageFile", recipeImage);
      uploadImage(formData);
    } else {
      removeImage();
    }

    e.preventDefault();
  };

  return (
    <UpdateImageForm
      onSubmit={onSubmit}
      initialImageUrl={imageUrl}
      setImageFile={setRecipeImage}
      loading={uploadLoading || removeLoading}
    />
  );
}
