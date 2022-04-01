import styled from "@emotion/styled";

const PlaceholderContainer = styled.div(({ height }: { height?: string }) => ({
  display: " flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--colour-text)",
  height: height ?? "25vw",
  backgroundColor: "white",
}));

//TODO: Make this placeholder prettier. Also add upload functionailty in future for updating

export default function ImagePlaceholder({ height }: { height?: string }) {
  return (
    <PlaceholderContainer height={height}>
      No Image Available
    </PlaceholderContainer>
  );
}
