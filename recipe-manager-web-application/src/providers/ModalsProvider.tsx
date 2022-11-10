import React, { createContext, Fragment, useState } from "react";
import { ModalOverlay } from "../components/common/modal/ModalOverlayStyled";

interface ModalsContextType {
  addModal: (modal: JSX.Element) => number;
  removeModal: (index: number) => void;
}

export const ModalsContext = createContext<ModalsContextType | undefined>(
  undefined
);

export default function ModalsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modals, setModals] = useState<JSX.Element[]>([]);

  const addModal = (modal: JSX.Element) => {
    let currentIndex = modals.length;
    setModals([...modals, modal]);

    return currentIndex;
  };

  const removeModal = (index: number) => {
    setModals(modals.filter((_, i) => i !== index));
  };

  return (
    <ModalsContext.Provider value={{ addModal, removeModal }}>
      {children}
      {modals.length > 0 && (
        <Fragment>
          <ModalOverlay />
          {modals.map((modal, index) => (
            <Fragment key={index}>{modal}</Fragment>
          ))}
        </Fragment>
      )}
    </ModalsContext.Provider>
  );
}
