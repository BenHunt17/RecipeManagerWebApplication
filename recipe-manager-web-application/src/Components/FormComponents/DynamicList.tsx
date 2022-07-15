import styled from "@emotion/styled";
import BinIcon from "../../SVGs/BinIcon";
import { IconButton } from "../Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

const ItemsList = styled.div`
  max-height: 350px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-top: solid 1px var(--colour-dark-grey);
  padding: 10px;
  overflow-y: auto;
`;

const AddNewButton = styled.button`
  width: 100px;
  height: 26px;
  color: var(--colour-text);
  border: 1px solid var(--colour-light-grey);
  border-radius: 10px;
  box-shadow: 0px 2px 1px var(--colour-light-grey);
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

export default function DynamicList({
  title,
  items,
  defaultItemsCount,
  addItem,
  removeItem,
}: {
  title: string;
  items: JSX.Element[];
  defaultItemsCount?: number;
  addItem: () => void;
  removeItem: (index: number) => void;
}) {
  //A generic component which allows user to add as many inputs as they need

  return (
    <FlexContainer direction="column" justifyContent="space-between" gap={25}>
      <b>{title}</b>
      <ItemsList>
        {items?.map((item, index) => (
          <FlexContainer
            key={index}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={25}
          >
            {item}
            {items.length > (defaultItemsCount ?? 0) && (
              <IconButton type="button" onClick={() => removeItem(index)}>
                <BinIcon width={17} height={26} />
              </IconButton>
            )}
          </FlexContainer>
        ))}
      </ItemsList>
      <AddNewButton type="button" onClick={addItem}>
        Add Item +
      </AddNewButton>
    </FlexContainer>
  );
}
