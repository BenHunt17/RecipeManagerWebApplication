import { useState } from "react";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import UpdateImageForm from "../UpdateImageForm";

export default function UpdateIngredientImageForm({
  ingredientName,
  imageUrl,
  updateInFetchedIngredient,
  close,
}: {
  ingredientName: string;
  imageUrl: string | null;
  updateInFetchedIngredient: (imageUrl: string | null) => void;
  close: () => void;
}) {
  const [ingredientImage, setIngredientImage] = useState<File | null>(null);

  const { callback: uploadImage, loading: uploadLoading } = useMutate({
    endpointPath: `https://localhost:5001/api/ingredient/${ingredientName}/image`,
    httpMethod: HttpMethod.PUT,
    onComplete: (imageUrl: string) => {
      updateInFetchedIngredient(imageUrl);
      close();
    },
    textResult: true,
  });

  const { callback: removeImage, loading: removeLoading } = useMutate({
    endpointPath: `https://localhost:5001/api/ingredient/${ingredientName}/image`,
    httpMethod: HttpMethod.DELETE,
    onComplete: () => {
      updateInFetchedIngredient(null);
      close();
    },
  });

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
