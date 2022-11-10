import styled from "@emotion/styled";
import { Fragment, useRef } from "react";
import useObserveDimensions from "../../hooks/useObserveDimensions";

const ModalContainer = styled.div(
  ({ width, height }: { width: number; height: number }) => `
  max-width: 50%;
  max-height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-${Math.floor(width / 2)}px, -${Math.floor(
    height / 2
  )}px);
  border-radius: 10px;
  background-color: white;
  overflow-y: auto;
`
);

const ModalContent = styled.div`
  padding: 55px;
`;

const ExitButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
`;

export default function Modal({
  title,
  content,
  onClose,
}: {
  title: string;
  content: JSX.Element;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const dimensions = useObserveDimensions(modalRef);

  return (
    <Fragment>
      <ModalContainer
        ref={modalRef}
        width={dimensions?.width ?? 0}
        height={dimensions?.height ?? 0}
      >
        <ExitButton onClick={onClose}>X</ExitButton>
        <ModalContent>
          <h3>{title}</h3>
          {content}
        </ModalContent>
      </ModalContainer>
    </Fragment>
  );
}
