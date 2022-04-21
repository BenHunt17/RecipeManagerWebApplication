import { useMemo, useState } from "react";
import Modal from "../Components/Modal";

export default function useModal(title: string, content: JSX.Element) {
  const [showing, setShowing] = useState(false);

  const close = () => {
    setShowing(false);
  };

  const open = () => {
    setShowing(true);
  };

  const modal = showing && (
    <Modal title={title} content={content} onClose={close} />
  );

  return [modal, open, close] as const;
}
