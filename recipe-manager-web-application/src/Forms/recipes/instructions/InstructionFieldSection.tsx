import styled from "@emotion/styled";
import { Control } from "react-hook-form";
import { FlexContainer } from "../../../Components/Common/StyledComponents/ShortcutComponents";
import TextArea from "../../../Components/form/TextArea";
import { InstructionsFormInput } from "../../../types/formTypes";

const InstructionNumber = styled.h4`
  width: 21px;
  font-size: 20px;
  color: var(--colour-text);
  margin: 0;
`;

export default function InstructionFieldSection({
  fieldId,
  control,
}: {
  fieldId: number;
  control: Control<InstructionsFormInput>;
}) {
  return (
    <div key={fieldId} className="hundredWidth">
      <FlexContainer
        key={fieldId}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={10}
      >
        <InstructionNumber>{fieldId + 1}</InstructionNumber>
        <div className="hundredWidth">
          <TextArea
            control={control}
            name={`instructions.${fieldId}.instructionText`}
            rules={{
              required: "Required Field",
            }}
            required
          />
        </div>
      </FlexContainer>
    </div>
  );
}
