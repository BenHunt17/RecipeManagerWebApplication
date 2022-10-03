import styled from "@emotion/styled";
import { Fragment } from "react";
import { FlexContainer } from "./StyledComponents/ShortcutComponents";

const SquareButton = styled.button(
  ({ selected }: { selected?: boolean }) => `
  height: 35px;
  width: 35px;
  color:${selected ? "white" : "var(--colour-text)"};
  background-color: ${selected ? "var(--colour-primary)" : "white"};
  font-weight: bold;
  border: ${
    selected
      ? "2px solid var(--colour-primary)"
      : "1px solid var(--colour-secondary)"
  };
`
);

const StepButton = styled.button`
  height: 35px;
  width: 80px;
  background-color: white;
  border: 1px solid var(--colour-secondary);
`;

export default function PageSelector({
  currentPageNumber,
  totalPages,
  onSelect,
  disabled,
}: {
  currentPageNumber: number;
  totalPages: number;
  onSelect: (pageNumber: number) => void;
  disabled?: boolean;
}) {
  const lhsCutOff = Math.max(1, currentPageNumber - 1);
  const rhsCutOff = Math.min(totalPages - 1, currentPageNumber + 1);

  let neighbourPageRange = [];
  for (let i = lhsCutOff; i < rhsCutOff + 1; i++) {
    neighbourPageRange.push(i);
  }

  const pageNumbers = [...new Set([1, ...neighbourPageRange, totalPages - 1])];

  return (
    <Fragment>
      <FlexContainer direction="row" justifyContent="space-between">
        <StepButton
          onClick={() => onSelect(currentPageNumber - 1)}
          disabled={disabled || currentPageNumber === 1}
        >
          Previous
        </StepButton>
        {pageNumbers.map((pageNumber, index) => (
          <Fragment key={`page-button.page-${pageNumber}`}>
            {index === 1 && pageNumber > 2 && <SquareButton>...</SquareButton>}
            <SquareButton
              key={`select-page.button.page-${pageNumber}`}
              selected={pageNumber === currentPageNumber}
              onClick={() => onSelect(pageNumber)}
              disabled={disabled}
            >
              {pageNumber}
            </SquareButton>
            {index === pageNumbers.length - 2 &&
              pageNumber < totalPages - 2 && <SquareButton>...</SquareButton>}
          </Fragment>
        ))}
        <StepButton
          onClick={() => onSelect(currentPageNumber + 1)}
          disabled={disabled || currentPageNumber === totalPages - 1}
        >
          Next
        </StepButton>
      </FlexContainer>
    </Fragment>
  );
}
