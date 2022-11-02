import styled from "@emotion/styled";

const Root = styled.div`
  display: flex;
  color: white;
  border: 2px solid var(--colour-secondary);
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    filter: brightness(95%);
    cursor: pointer;
  }
  &:active {
    filter: brightness(90%);
  }
`;

const MainContent = styled.div`
  background-color: var(--colour-primary);
  padding: 10px;
`;

const EndSlot = styled.div`
  background-color: white;
  color: var(--colour-text);
  border-left: 1px solid var(--colour-text);
  padding: 10px;
`;

export default function Tag({
  value,
  endSlotValue,
}: {
  value: string;
  endSlotValue?: string;
}) {
  return (
    <Root>
      <MainContent>{value}</MainContent>
      {!!endSlotValue && (
        <EndSlot>
          <b>{endSlotValue}</b>
        </EndSlot>
      )}
    </Root>
  );
}
