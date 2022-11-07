import { useLayoutEffect, useState } from "react";

export default function useObserveRect<T extends Element>(
  ref: React.RefObject<T>
) {
  const [rect, setRect] = useState<DOMRect | undefined>(undefined);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(() =>
      setRect(ref.current?.getBoundingClientRect())
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return rect;
}
