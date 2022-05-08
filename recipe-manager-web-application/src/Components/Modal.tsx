import styled from "@emotion/styled";
import { Fragment } from "react";

const Overlay = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  position: fixed;
  top: 150px;
  left: 0px;
  background-color: var(--colour-shadow);
  opacity: 0.8;
`;

const ModalContainer = styled.div`
  max-width: 50%;
  max-height: 90%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% + 75px));
  border-radius: 10px;
  background-color: white;
  overflow-y: scroll;
`;

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
  return (
    <Fragment>
      <Overlay />
      <ModalContainer>
        <ExitButton onClick={onClose}>X</ExitButton>
        <ModalContent>
          <h3>{title}</h3>
          {content}
        </ModalContent>
      </ModalContainer>
    </Fragment>
  );
}
