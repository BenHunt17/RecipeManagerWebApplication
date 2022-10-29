import styled from "@emotion/styled";
import BinIcon from "../../svg/BinIcon";
import { IconButton } from "../Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

const Title = styled.b`
  color: var(--colour-text);
`;

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

export default function FormList({
  title,
  sections,
  defaultItemsCount = 0,
  addItem,
  removeItem,
}: {
  title: string;
  sections: JSX.Element[];
  defaultItemsCount?: number;
  addItem: () => void;
  removeItem: (index: number) => void;
}) {
  return (
    <FlexContainer direction="column" justifyContent="space-between" gap={25}>
      <Title>{title}</Title>
      <ItemsList>
        {sections?.map((section, index) => (
          <FlexContainer
            key={section.key}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={25}
          >
            {section}
            {sections.length > defaultItemsCount && (
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
