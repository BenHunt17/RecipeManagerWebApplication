import { useState } from "react";
import useMutate, { HttpMethod } from "../../../hooks/useMutate";
import { ItemKeyContext } from "../../../types/storageTypes";
import { addToRecentActivity } from "../../../utils/recentActivityController";
import UpdateImageForm from "../../UpdateImageForm";

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

  const { callback: uploadImage, loading: uploadLoading } = useMutate<string>({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}/image`,
    httpMethod: HttpMethod.PUT,
    onComplete: (imageUrl) => {
      if (!imageUrl) {
        return;
      }
      updateInFetchedRecipe(imageUrl);
      addToRecentActivity(
        "recipe image",
        recipeName,
        ItemKeyContext.UPDATE,
        `recipe/${recipeName}`,
        imageUrl
      );
      close();
    },
  });

  const { callback: removeImage, loading: removeLoading } = useMutate({
    endpointPath: `${process.env.REACT_APP_RECIPE_MANAGER_API_URL}recipe/${recipeName}/image`,
    httpMethod: HttpMethod.DELETE,
    onComplete: () => {
      updateInFetchedRecipe(null);
      addToRecentActivity(
        "recipe image",
        recipeName,
        ItemKeyContext.DELETE,
        `recipe/${recipeName}`,
        null
      );
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
