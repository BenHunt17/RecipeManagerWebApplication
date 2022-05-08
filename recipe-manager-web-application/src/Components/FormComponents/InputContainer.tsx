//Pretty basic but helps reduce redundent code in the forms

import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
`;

export default function InputContainer({
  title,
  input,
  error,
}: {
  title?: string;
  input: JSX.Element;
  error?: JSX.Element;
}) {
  return (
    <Container>
      {title}
      {title && <br />}
      {input}
      {error}
    </Container>
  );
}
