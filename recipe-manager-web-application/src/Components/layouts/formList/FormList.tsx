import styled from "@emotion/styled";
import { AddButton } from "../../Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../../Common/StyledComponents/ShortcutComponents";
import FormListSection from "./FormListSection";

const Title = styled.b`
  color: var(--colour-text);
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: calc(100% - 55px);
  overflow-y: auto;
  border: 2px solid var(--colour-primary);
  border-radius: 5px;
  padding: 5px;
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
    <FlexContainer
      direction="column"
      justifyContent="flex-start"
      gap={10}
      height="100%"
    >
      <FlexContainer alignItems="center" height={55}>
        <Title>{title}</Title>
        <AddButton type="button" onClick={addItem}>
          Add Item +
        </AddButton>
      </FlexContainer>
      <ItemsList>
        {sections?.map((section, index) => (
          <FormListSection
            key={section.key}
            section={section}
            showBinButton={sections.length > defaultItemsCount}
            onRemove={() => removeItem(index)}
          />
        ))}
      </ItemsList>
    </FlexContainer>
  );
}
