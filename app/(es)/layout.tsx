// Spanish is the default lang already set at the root layout (lang="es"),
// so no LangSetter is needed here.
export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
