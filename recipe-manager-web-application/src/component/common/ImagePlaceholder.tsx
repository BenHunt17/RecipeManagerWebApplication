import styled from "@emotion/styled";

const PlaceholderContainer = styled.div(
  ({ height }: { height?: string }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--colour-text);
  height: ${height ?? "25vw"};
  background-color: white;
`
);

export default function ImagePlaceholder({ height }: { height?: string }) {
  return (
    <PlaceholderContainer height={height}>
      No Image Available
    </PlaceholderContainer>
  );
}
