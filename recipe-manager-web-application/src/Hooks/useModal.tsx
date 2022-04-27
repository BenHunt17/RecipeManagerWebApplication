import React, { Fragment, useState } from "react";
import Modal from "../Components/Modal";

export default function useModal<T>(
  title: string,
  renderContent: (props: T) => React.ReactNode
) {
  const [showing, setShowing] = useState(false);
  const [props, setProps] = useState<T | undefined>(undefined);

  const close = () => {
    setShowing(false);
  };

  const open = (contentProps: T) => {
    setProps(contentProps);
    setShowing(true);
  };

  const modal = props && showing && (
    <Modal
      title={title}
      content={<Fragment>{renderContent(props)}</Fragment>}
      onClose={close}
    />
  );

  return [modal, open, close] as const;
}
