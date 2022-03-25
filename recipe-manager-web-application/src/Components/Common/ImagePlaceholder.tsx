import styled from "@emotion/styled";

const PlaceholderContaainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vw;
  background-color: white;
`;

//TODO: Make this placeholder prettier. Also add upload functionailty in future for updating

export default function ImagePlaceholder() {
  return <PlaceholderContaainer>No Image Available</PlaceholderContaainer>;
}
