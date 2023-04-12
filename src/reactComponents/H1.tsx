export default function H1(props: { children: string }) {
  const { children } = props;

  return <h1 className="p-3">{children}</h1>;
}
