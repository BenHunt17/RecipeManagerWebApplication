//Pretty basic but helps reduce redundent code in the forms

export default function InputContainer({
  title,
  input,
  error,
}: {
  title: string;
  input: JSX.Element;
  error?: JSX.Element;
}) {
  return (
    <div>
      {title}
      <br />
      {input}
      {error}
    </div>
  );
}
