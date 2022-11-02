import React, { Fragment, useContext, useRef, useState } from "react";
import OutsideClickProvider from "../Components/Common/OutsideClickProvider";
import Modal from "../Components/modal/Modal";
import { ModalsContext } from "../providers/ModalsProvider";

export default function useModal<T>(
  title: string,
  renderContent: (props: T) => React.ReactNode
) {
  const modalsContext = useContext(ModalsContext);
  const modalIndex = useRef<number>();

  const close = () => {
    if (modalIndex.current !== undefined) {
      modalsContext?.removeModal(modalIndex.current);
    }
  };

  const open = (contentProps: T) => {
    const modal = contentProps ? (
      <OutsideClickProvider callback={close}>
        <Modal
          title={title}
          content={<Fragment>{renderContent(contentProps)}</Fragment>}
          onClose={close}
        />
      </OutsideClickProvider>
    ) : undefined;

    if (modal) {
      modalIndex.current = modalsContext?.addModal(modal);
    }
  };

  return [open, close] as const;
}
