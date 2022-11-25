import { Fragment } from "react";
import { SubmitButton } from "../styled/buttons";
import { FlexContainer } from "../styled/layouts";
import { LoadingSpinner } from "../styled/output";

export default function DeleteForm({
  message,
  loading,
  onConfirm,
  onCancel,
}: {
  message: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Fragment>
      <p>{message}</p>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlexContainer
          direction="row"
          justifyContent="flex-start"
          gap={25}
          margin="35px 0 0 0"
        >
          <SubmitButton onClick={onConfirm}>Yes</SubmitButton>
          <SubmitButton onClick={onCancel}>No</SubmitButton>
        </FlexContainer>
      )}
    </Fragment>
  );
}