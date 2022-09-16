import { Fragment } from "react";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";
import { Ingredient } from "../../Types/IngredientTypes";

export default function DeleteIngredientForm({
  ingredientName,
  removeFromFetchedIngredients,
  close,
}: {
  ingredientName: string;
  removeFromFetchedIngredients: () => void;
  close: () => void;
}) {
  const { callback: deleteIngredient, loading } = useMutate(
    `https://localhost:5001/api/ingredient/${ingredientName}`,
    HttpMethod.DELETE,
    () => {
      removeFromFetchedIngredients();
      close();
    },
    undefined
  );

  return (
    <Fragment>
      <p>
        Are you sure you want to delete this ingredient? This action cannot be
        reverted.
      </p>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlexContainer
          direction="row"
          justifyContent="flex-start"
          gap={25}
          margin="35px 0 0 0"
        >
          <SubmitButton onClick={() => deleteIngredient()}>Yes</SubmitButton>
          <SubmitButton onClick={close}>No</SubmitButton>
        </FlexContainer>
      )}
    </Fragment>
  );
}
