import { ButtonLink } from "@/components/ui/Button";
import CtaBanner from "@/components/ui/CtaBanner";
import Image from "next/image";
import Media from "@/components/ui/Media";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/icons";
import { FOUNDER_LINKEDIN } from "@/lib/constants";
import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";
import ivanPhoto from "@/public/assets/img/team/ivan.jpg";
import miguelPhoto from "@/public/assets/img/team/miguel.jpg";

const PHOTOS = { miguel: miguelPhoto, ivan: ivanPhoto } as const;

const CONTENT = {
  es: {
    heroLead: "El equipo",
    heroTail: "detrás del trabajo.",
    heroIntro:
      "Nodex es un equipo de Forward Deployed Engineers con base en Valencia. Construimos software e IA que funciona en producción, dentro de los equipos de nuestros clientes.",
    founders: [
      {
        key: "miguel" as const,
        name: "Miguel Romero",
        role: "Founder & CEO",
        bio: "Construye equipos de ingeniería senior que asumen la responsabilidad real de los sistemas de sus clientes. Antes de Nodex cofundó Atria Movilidad Eléctrica y la dirigió como CEO durante cuatro años, tras empezar en sistemas empresariales en Capgemini.",
      },
      {
        key: "ivan" as const,
        name: "Iván Ruiz",
        role: "Founder & CTO",
        bio: "Lleva más de once años poniendo sistemas en producción: siete como cofundador y CTO de una empresa SaaS, y como ingeniero senior de equipos de producto en Berlín y Austin. Ayuda a las empresas a decidir cuándo usar IA y cuándo no.",
      },
    ],
    teamTitle: "Un equipo de ingeniería senior.",
    careers: "Carreras",
    figures: [
      { value: "3", text: "países: España, EE. UU. y Reino Unido" },
      { value: "7+", text: "años de experiencia mínima" },
    ],
    ctaTitle: "Trabaja con Nodex.",
    join: "O únete al equipo",
  },
  en: {
    heroLead: "The team",
    heroTail: "behind the work.",
    heroIntro:
      "Nodex is a team of Forward Deployed Engineers based in Valencia, Spain. We build software and AI that runs in production, inside our clients’ teams.",
    founders: [
      {
        key: "miguel" as const,
        name: "Miguel Romero",
        role: "Founder & CEO",
        bio: "He builds senior engineering teams that take real ownership of their clients’ systems. Before Nodex, he co-founded Atria Movilidad Eléctrica and led it as CEO for four years, after starting out in enterprise systems at Capgemini.",
      },
      {
        key: "ivan" as const,
        name: "Iván Ruiz",
        role: "Founder & CTO",
        bio: "He has been putting systems into production for more than eleven years: seven as co-founder and CTO of a SaaS company, and as a senior engineer for product teams in Berlin and Austin. He helps companies decide when to use AI, and when not to.",
      },
    ],
    teamTitle: "A senior engineering team.",
    careers: "Careers",
    figures: [
      { value: "3", text: "countries: Spain, the US and the UK" },
      { value: "7+", text: "years of experience at minimum" },
    ],
    ctaTitle: "Work with Nodex.",
    join: "Or join the team",
  },
} as const;

export default function AboutTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];

  return (
    <>
      <PageHero
        lead={t.heroLead}
        tail={t.heroTail}
        intro={t.heroIntro}
        media={["globe", "head", "tv"]}
      />

      <Section className="pt-[clamp(48px,calc(var(--cqi)*6),96px)] pb-[clamp(72px,calc(var(--cqi)*9),140px)] max-[700px]:py-16">
        <ul className="grid gap-x-12 gap-y-12 min-[961px]:grid-cols-2">
          {t.founders.map((f) => (
            <li key={f.name} className="grid grid-cols-[200px_1fr] items-start gap-6 max-[700px]:grid-cols-[96px_1fr] max-[700px]:gap-4">
              <Image
                src={PHOTOS[f.key]}
                alt={f.name}
                sizes="200px"
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
              <div>
                <h2 className="font-display text-[24px] leading-[1.1] font-semibold tracking-[-0.03em] max-[700px]:text-[20px]">
                  {f.name}
                </h2>
                <p className="t-tag mt-1.5 text-brand">{f.role}</p>
                <p className="mt-4 text-[16px] leading-[1.55] text-body max-[700px]:text-[15px]">
                  {f.bio}
                </p>
                {FOUNDER_LINKEDIN[f.key] ? (
                  <a
                    href={FOUNDER_LINKEDIN[f.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-10 items-center border-b border-line-strong text-[15px] text-ink hover:border-brand"
                  >
                    LinkedIn ↗
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {FEATURES.engineersTeam ? (
        <Section className="py-[clamp(56px,calc(var(--cqi)*7),112px)] max-[700px]:py-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="t-h2">{t.teamTitle}</h2>
            <ButtonLink href={r.careers} variant="outline">
              {t.careers}
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-3 min-[701px]:grid-cols-2">
            {t.figures.map((f) => (
              <li key={f.value} className="rounded-2xl border border-line-strong bg-card p-6">
                <b className="t-stat font-semibold">{f.value}</b>
                <p className="mt-3 text-[15px] text-body">{f.text}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="hole"
      />
      <p className="-mt-6 pb-12 text-center">
        <a
          href={r.careers}
          className="inline-flex items-center gap-2 text-[15px] text-body hover:text-ink"
        >
          {t.join} <ArrowIcon className="text-[12px]" />
        </a>
      </p>
    </>
  );
}
