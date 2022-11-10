import { useLayoutEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export default function useObserveDimensions<T extends Element>(
  ref: React.RefObject<T>
) {
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(() =>
      setDimensions({
        width: ref.current?.getBoundingClientRect().width ?? 0,
        height: ref.current?.getBoundingClientRect().height ?? 0,
      })
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
}
