import styled from "@emotion/styled";

export const Container = styled.div`
  border: 1px solid var(--colour-border);
  border-radius: 10px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  background-color: var(--colour-primary);
  color: white;
  padding: 10px;
`;

const Content = styled.div`
  padding: 10px;
`;

export default function ContentBox({
  title,
  rightSlot,
  children,
}: {
  title: string;
  rightSlot?: JSX.Element;
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Header>
        <b>{title}</b>
        {rightSlot}
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}
