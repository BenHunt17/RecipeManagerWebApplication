import React, { Fragment, useContext, useRef } from "react";
import Modal from "../component/common/modal/Modal";
import { ModalsContext } from "../providers/ModalsProvider";
import OutsideClickWrapper from "../component/common/OutsideClickWrapper";

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
      <OutsideClickWrapper callback={close}>
        <Modal
          title={title}
          content={<Fragment>{renderContent(contentProps)}</Fragment>}
          onClose={close}
        />
      </OutsideClickWrapper>
    ) : undefined;

    if (modal) {
      modalIndex.current = modalsContext?.addModal(modal);
    }
  };

  return [open, close] as const;
}
