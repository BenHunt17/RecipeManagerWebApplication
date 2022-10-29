/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Control } from "react-hook-form";
import { FlexContainer } from "../../../Components/Common/StyledComponents/ShortcutComponents";
import TextArea from "../../../Components/form/TextArea";
import { InstructionsFormInput } from "../../../types/formTypes";

const InstructionNumber = styled.h4`
  width: 31px;
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
    <div
      key={fieldId}
      css={css`
        width: 100%;
      `}
    >
      <FlexContainer
        key={fieldId}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={10}
      >
        <InstructionNumber>{fieldId + 1}.</InstructionNumber>
        <div
          css={css`
            min-width: 350px;
            width: 100%;
          `}
        >
          <TextArea
            control={control}
            name={`instructions.${fieldId}.instructionText`}
            rules={{
              required: "Required Field",
            }}
          />
        </div>
      </FlexContainer>
    </div>
  );
}
