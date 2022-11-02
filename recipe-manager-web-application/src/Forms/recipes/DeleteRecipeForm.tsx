import { Fragment } from "react";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { LoadingSpinner } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import useMutate, { HttpMethod } from "../../hooks/useMutate";

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
      close();
    },
  });

  //TODO - make this form more generic since its used alot
  return (
    <Fragment>
      <p>
        Are you sure you want to delete this Recipe? This action cannot be
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
          <SubmitButton onClick={() => deleteRecipe()}>Yes</SubmitButton>
          <SubmitButton onClick={close}>No</SubmitButton>
        </FlexContainer>
      )}
    </Fragment>
  );
}
