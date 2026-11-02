import type { Metadata } from "next";
import Link from "next/link";
import RootHtml from "@/components/site/RootHtml";
import SiteShell from "@/components/site/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found | Nodex",
  robots: { index: false },
};

// One 404 for the whole site, in English with a pointer to the Spanish home.
export default function NotFound() {
  return (
    <RootHtml lang="en">
    <SiteShell locale="en">
      <section className="py-[clamp(64px,calc(var(--cqi)*9),140px)]">
        <Container>
          <p className="t-tag text-brand">404</p>
          <h1 className="t-h1 mt-4 max-w-[760px]">
            Page not found. <span className="text-faint">It may have moved.</span>
          </h1>
          <p className="t-lead mt-6 max-w-[520px] text-body">
            The page you’re looking for doesn’t exist or has changed address.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ButtonLink href={ROUTES.en.home}>Back to home</ButtonLink>
            <Link href={ROUTES.es.home} className="text-[15px] text-body hover:text-ink">
              Volver al inicio (ES)
            </Link>
          </div>
        </Container>
      </section>
    </SiteShell>
    </RootHtml>
  );
}
