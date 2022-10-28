import React, { useEffect, useRef } from "react";

export default function OutsideClickProvider({
  children,
  callback,
}: {
  children: React.ReactNode;
  callback: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //When the on outside click function changes, will add a click event listener to the document. The on outside click function is warpped in another which ensures the click isn't in the overlay
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        e.target instanceof Node &&
        !wrapperRef.current.contains(e.target)
      ) {
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callback]);

  return <div ref={wrapperRef}>{children}</div>;
}
