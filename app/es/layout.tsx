import RootHtml from "@/components/site/RootHtml";
import SiteShell from "@/components/site/SiteShell";

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootHtml lang="es">
      <SiteShell locale="es">{children}</SiteShell>
    </RootHtml>
  );
}
