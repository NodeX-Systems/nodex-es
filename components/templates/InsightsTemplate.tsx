import Link from "next/link";
import CtaBanner from "@/components/ui/CtaBanner";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { CONTACT_EMAIL } from "@/lib/constants";
import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

// Articles and reports are empty until real pieces exist; a section with no
// entries is not rendered.
const ARTICLES: readonly { kind: string; title: string; meta: string; href: string }[] = [];
const REPORTS: readonly { kind: string; title: string; meta: string; href: string }[] = [];

const CONTENT = {
  es: {
    lead: "Insights.",
    tail: "Notas de construir IA en producción.",
    intro: "Guías prácticas de nuestros ingenieros, casos de cliente y Nodex en los medios.",
    sub: { articles: "Artículos", reports: "Informes", guides: "Guías", news: "Noticias y prensa" },
    guideKind: "GUÍA",
    guideTitle: "¿Qué es Forward Deployed Engineering?",
    guideMeta: "Una guía breve · 6 min",
    newsKind: "ENTREVISTA · QONTO",
    newsTitle: "Qonto entrevista a Miguel Romero e Iván Ruiz, fundadores de Nodex",
    newsMeta: "Entrevista",
    allNews: "Todas las noticias",
  },
  en: {
    lead: "Insights.",
    tail: "Notes from building AI in production.",
    intro: "Practical guides from our engineers, client stories and Nodex in the media.",
    sub: { articles: "Articles", reports: "Reports", guides: "Guides", news: "News and press" },
    guideKind: "GUIDE",
    guideTitle: "What is Forward Deployed Engineering?",
    guideMeta: "A short guide · 6 min",
    newsKind: "INTERVIEW · QONTO",
    newsTitle: "Qonto interviews Miguel Romero and Iván Ruiz, founders of Nodex",
    newsMeta: "Interview",
    allNews: "All news",
  },
} as const;

function Card({ kind, title, meta, href }: { kind: string; title: string; meta: string; href?: string }) {
  const inner = (
    <>
      <Eyebrow tone="brand">{kind}</Eyebrow>
      <h3 className="t-pcard mt-3">{title}</h3>
      <p className="mt-auto pt-8 text-[14px] text-body">{meta}</p>
    </>
  );
  const cls =
    "flex min-h-[220px] flex-col rounded-2xl border border-line-strong bg-card p-6 transition-colors duration-200";
  return href ? (
    <Link href={href} className={`${cls} hover:border-brand`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function InsightsTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];

  const sections = [
    ARTICLES.length
      ? { id: "ins-articles", title: t.sub.articles, cards: ARTICLES }
      : null,
    REPORTS.length
      ? { id: "ins-reports", title: t.sub.reports, cards: REPORTS }
      : null,
    {
      id: "ins-guides",
      title: t.sub.guides,
      cards: [{ kind: t.guideKind, title: t.guideTitle, meta: t.guideMeta, href: r.guide }],
    },
    FEATURES.news
      ? {
          id: "ins-news",
          title: t.sub.news,
          cards: [{ kind: t.newsKind, title: t.newsTitle, meta: t.newsMeta, href: "" }],
          all: { href: r.news, label: t.allNews },
        }
      : null,
  ].filter((s) => s !== null);

  return (
    <>
      <PageHero lead={t.lead} tail={t.tail} intro={t.intro} media={["globe", "map", "portal"]} />

      <nav
        aria-label="Insights"
        className="sticky top-[var(--hh)] z-20 flex h-[50px] items-center gap-6 border-y border-line bg-canvas px-[var(--hpad)] text-[15px] text-body"
      >
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-ink">
            {s.title}
          </a>
        ))}
      </nav>

      {sections.map((s) => (
        <Section key={s.id} id={s.id} divider={false} className="py-[clamp(40px,calc(var(--cqi)*5),72px)] max-[700px]:py-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="t-h2s">{s.title}</h2>
            {"all" in s && s.all ? (
              <Link href={s.all.href} className="text-[15px] font-medium text-ink hover:text-brand">
                {s.all.label} →
              </Link>
            ) : null}
          </div>
          <ul className="mt-8 grid gap-4 min-[761px]:grid-cols-3">
            {s.cards.map((c) => (
              <li key={c.title}>
                <Card {...c} href={c.href || undefined} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <p className="sr-only">{CONTACT_EMAIL}</p>
      <CtaBanner title={locale === "es" ? "Habla de tu proyecto con un ingeniero senior." : "Discuss your project with a senior engineer."} label={NAV_LABELS[locale].scopingCall} href={r.contact} variant="hole" />
    </>
  );
}
