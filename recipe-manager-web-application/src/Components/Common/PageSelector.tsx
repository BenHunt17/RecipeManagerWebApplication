import styled from "@emotion/styled";
import { FlexContainer } from "./styled/layouts";

const StepButton = styled.button(
  ({ disabled }: { disabled: boolean }) => `
  height: 36px;
  width: 36px;
  font-size: 16px;
  color: var(--colour-secondary);
  background-color: white;
  border: 1px solid var(--colour-secondary);
  border-radius: 50%;
  opacity: ${disabled ? "0.5" : "1"};
  cursor: ${disabled ? "default" : "pointer"};
`
);

const PageCountDisplay = styled.p`
  color: var(--colour-text);
`;

export default function PageSelector({
  currentPageNumber,
  totalPages,
  onSelect,
}: {
  currentPageNumber: number;
  totalPages: number | undefined;
  onSelect: (pageNumber: number) => void;
}) {
  const disabled = totalPages === undefined;

  return (
    <FlexContainer
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={12}
    >
      <StepButton
        onClick={() => onSelect(currentPageNumber - 1)}
        disabled={disabled || currentPageNumber === 1}
      >
        <b>&lt;</b>
      </StepButton>
      <PageCountDisplay>
        {!disabled ? `${currentPageNumber} / ${totalPages}` : "Loading items"}
      </PageCountDisplay>
      <StepButton
        onClick={() => onSelect(currentPageNumber + 1)}
        disabled={disabled || currentPageNumber === totalPages}
      >
        <b>&gt;</b>
      </StepButton>
    </FlexContainer>
  );
}
