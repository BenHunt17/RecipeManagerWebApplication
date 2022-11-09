import styled from "@emotion/styled";
import { useRef } from "react";
import useObserveRect from "../../hooks/useObserveRect";
import BinIcon from "../../svg/BinIcon";
import {
  AddButton,
  IconButton,
} from "../Common/StyledComponents/ButtonComponents";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

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

const Section = styled.div`
  width: calc(100% - 65px);
  background-color: rgba(var(--colour-secondary-rgb), 0.25);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 6px;
`;

const SectionEndSlot = styled.div(
  ({ height }: { height: number }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: ${height}px;
  background-color: var(--colour-primary);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`
);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const rect = useObserveRect(sectionRef);

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
          <FlexContainer alignItems="center">
            <Section key={section.key} ref={sectionRef}>
              {section}
            </Section>
            <SectionEndSlot height={rect?.height ?? 0}>
              {sections.length > defaultItemsCount && (
                <IconButton type="button" onClick={() => removeItem(index)}>
                  <BinIcon width={17} height={26} fill="white" />
                </IconButton>
              )}
            </SectionEndSlot>
          </FlexContainer>
        ))}
      </ItemsList>
    </FlexContainer>
  );
}
