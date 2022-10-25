import { Fragment } from "react";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../Hooks/useMutate";

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
