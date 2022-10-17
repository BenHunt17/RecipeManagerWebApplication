import { useState } from "react";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import { Recipe } from "../../Types/RecipeTypes";
import UpdateImageForm from "../UpdateImageForm";

export default function UpdateRecipeImageForm({
  recipeName,
  imageUrl,
  updateInFetchedRecipe,
  close,
}: {
  recipeName: string;
  imageUrl: string | null;
  updateInFetchedRecipe: (imageUrl: string | null) => void;
  close: () => void;
}) {
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  const { callback: uploadImage, loading: uploadLoading } = useMutate({
    endpointPath: `https://localhost:5001/api/recipe/${recipeName}/image`,
    httpMethod: HttpMethod.PUT,
    onComplete: (imageUrl: string) => {
      updateInFetchedRecipe(imageUrl);
      close();
    },
    textResult: true,
  });

  const { callback: removeImage, loading: removeLoading } = useMutate({
    endpointPath: `https://localhost:5001/api/recipe/${recipeName}/image`,
    httpMethod: HttpMethod.DELETE,
    onComplete: () => {
      updateInFetchedRecipe(null);
      close();
    },
  });

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
