import { useState } from "react";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import { Ingredient } from "../../Types/IngredientTypes";
import UpdateImageForm from "../UpdateImageForm";

export default function UpdateIngredientImageForm({
  id,
  imageUrl,
  updateIngredient,
  close,
}: {
  id: string;
  imageUrl: string | null;
  updateIngredient: (ingredient: Ingredient) => void;
  close: () => void;
}) {
  const [ingredientImage, setIngredientImage] = useState<File | null>(null);

  const { callback: uploadImage, loading: uploadLoading } =
    useMutate<Ingredient>(
      `https://localhost:5001/api/ingredient/${id}/image`,
      HttpMethod.PUT,
      (ingredient) => {
        updateIngredient(ingredient);
        close();
      },
      undefined
    );

  const { callback: removeImage, loading: removeLoading } =
    useMutate<Ingredient>(
      `https://localhost:5001/api/ingredient/${id}/image`,
      HttpMethod.DELETE,
      (ingredient) => {
        updateIngredient(ingredient);
        close();
      },
      undefined
    );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();

    if (ingredientImage) {
      formData.append("imageFile", ingredientImage);
      uploadImage(formData);
    } else {
      removeImage();
    }

    e.preventDefault(); //prevents page from refreshing
  };

  return (
    <UpdateImageForm
      onSubmit={onSubmit}
      initialImageUrl={imageUrl}
      setImageFile={setIngredientImage}
      loading={uploadLoading || removeLoading}
    />
  );
}
