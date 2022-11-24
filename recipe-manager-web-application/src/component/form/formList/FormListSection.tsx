import styled from "@emotion/styled";
import { useRef } from "react";
import useObserveDimensions from "../../../hook/useObserveDimensions";
import BinIcon from "../../../svg/BinIcon";
import { IconButton } from "../../styled/buttons";
import { FlexContainer } from "../../styled/layouts";

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

export default function FormListSection({
  section,
  showBinButton,
  onRemove,
}: {
  section: JSX.Element;
  showBinButton: boolean;
  onRemove: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dimensions = useObserveDimensions(sectionRef);

  return (
    <FlexContainer alignItems="center">
      <Section ref={sectionRef}>{section}</Section>
      <SectionEndSlot height={dimensions?.height ?? 0}>
        {showBinButton && (
          <IconButton type="button" onClick={() => onRemove()}>
            <BinIcon width={17} height={26} fill="white" />
          </IconButton>
        )}
      </SectionEndSlot>
    </FlexContainer>
  );
}
