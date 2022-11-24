import styled from "@emotion/styled";

const TableLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ListItem = styled.div(({ highlighted }: { highlighted?: boolean }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: "var(--colour-secondary)",
  backgroundColor: highlighted
    ? "rgba(var(--colour-secondary-rgb), 0.2)"
    : "none",
  border: "solid 1px var(--colour-secondary)",
  padding: "10px",
}));

export type TableData = {
  title: String;
  data: number | string;
};

function isInSequence(index: number) {
  /* Table indices pattern sequence: 0, 3, 4, 7, 8, 11, 12, 15
  Formula: If sequence index is even: tableIndex = 2i Else: tableIndex = 2i + 1

  if tableIndex is even [2i] then the sequence index would also be even [2n] inferred from the formula above. Assuming the table index appears in the sequence, then tableIndex = 2(2n) => 4n.
  Therefore the table index is always divisible by 4 if it's even and in the sequence

  If tableIndex is odd [2i + 1] then the sequence index is also odd [2n + 1]. Therefore, assuming the table index appears in the sequence, then tableIndex = 2(2n + 1) + 1 => 4n + 3
  Take away 3 from the tableIndex then the result is always divisible by 4 if tableIndex was odd and is in the sequence*/

  const isOtherEven = index % 4 === 0;
  const isOtherOdd = (index - 3) % 4 === 0;

  return index % 2 === 0 ? isOtherEven : isOtherOdd;
}

export default function StatisticsTable({
  id,
  data,
}: {
  id: string;
  data: TableData[];
}) {
  return (
    <TableLayout>
      {data.map((dataItem, index) => (
        <ListItem
          key={`${id}.table-item.${index}`}
          highlighted={isInSequence(index)}
        >
          <b>{dataItem.title}</b> {dataItem.data}
        </ListItem>
      ))}
    </TableLayout>
  );
}
