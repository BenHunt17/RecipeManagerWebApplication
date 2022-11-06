import React, { Children } from "react";
import { FlexContainer } from "../Common/StyledComponents/ShortcutComponents";

export default function RangeInput({
  children,
}: {
  children: React.ReactNode;
}) {
  if (Children.count(children) !== 2) {
    throw Error("RangeInput should have exactly two child nodes");
  }

  const childrenArray = Children.toArray(children);

  return (
    <FlexContainer justifyContent="flex-start" alignItems="center" gap={25}>
      {childrenArray?.[0]}
      <pre>- To -</pre>
      {childrenArray?.[1]}
    </FlexContainer>
  );
}
