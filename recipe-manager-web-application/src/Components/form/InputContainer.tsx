//Pretty basic but helps reduce redundent code in the forms

import styled from "@emotion/styled";

const Container = styled.div(
  ({ width }: { width?: number }) => `
  width: ${width ? `${width}px` : "100%"};
`
);

export default function InputContainer({
  title,
  input,
  error,
  width,
}: {
  title?: string;
  input: JSX.Element;
  error?: JSX.Element;
  width?: number;
}) {
  return (
    <Container width={width}>
      {title}
      {title && <br />}
      {input}
      {error}
    </Container>
  );
}
