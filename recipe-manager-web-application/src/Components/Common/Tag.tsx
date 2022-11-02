import styled from "@emotion/styled";

const Root = styled.div`
  display: flex;
  color: white;
  border: 2px solid var(--colour-secondary);
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    background-color: rgba(var(--colour-secondary-rgb), 0.75);
    cursor: pointer;
  }
  &:active {
    opacity: 0.7;
  }
`;

const MainContent = styled.div`
  background-color: var(--colour-primary);
  padding: 10px;
`;

const EndSlot = styled.div`
  //   background-color: rgba(var(--colour-secondary-rgb), 0.6);
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
