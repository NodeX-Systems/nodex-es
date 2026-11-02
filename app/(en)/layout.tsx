import RootHtml from "@/components/site/RootHtml";
import SiteShell from "@/components/site/SiteShell";

// English is the root locale (/). Each locale has its own root layout so the
// <html lang> attribute is right in the exported HTML.
export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootHtml lang="en">
      <SiteShell locale="en">{children}</SiteShell>
    </RootHtml>
  );
}
