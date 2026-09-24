import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import ServiceIntroBand from "@/components/services/ServiceIntroBand";
import ServiceDetails from "@/components/services/ServiceDetails";
import { ROUTES, type Locale } from "@/lib/routes";
import introImg from "@/public/assets/img/service/service-details-img1.png";

const CONTENT = {
  es: {
    heroH1: "Equipo Técnico Senior Integrado",
    breadcrumbCurrent: "Equipo integrado",
    introH2: "Equipo Técnico Senior Integrado",
    introP: (
      <>
        Un equipo IT senior que se integra directamente en tu empresa como
        parte central de tu estructura tecnológica. No es externalización
        tradicional — es una extensión directa de tu negocio, con
        responsabilidad real sobre los resultados.
      </>
    ),
    ctaLabel: "Let’s Talk",
    article1H3a: "Rompiendo los cuellos de botella del desarrollo",
    article1P1: (
      <>
        Equipos técnicos sobrecargados, perfiles senior ausentes y proyectos
        bloqueados ralentizan incluso a las empresas más ambiciosas. Avanzar
        sin aumentar la plantilla permanente — y contratar talento
        cualificado rápidamente — son retos que exigen un enfoque diferente.
      </>
    ),
    article1H3b: "Seniority real desde el primer día",
    article1P2: (
      <>
        Nuestro equipo entra con la seniority y el contexto necesarios para
        generar impacto inmediato. Sin ciclos de incorporación largos, sin
        fricción — solo ingenieros competentes que se integran en tus
        procesos y asumen la responsabilidad de los resultados desde el
        principio.
      </>
    ),
    article1P3: (
      <>
        Tanto si se trata de dar soporte al desarrollo operativo del día a
        día como de impulsar iniciativas de producto estratégico, el equipo
        embebido trabaja como parte integral de tu organización — no como un
        proveedor externo.
      </>
    ),
    article2H3: "Haz tu equipo tech adhoc y flexible",
    article2P1: (
      <>
        Incorpora uno o varios perfiles técnicos según lo que necesites en
        cada momento, con total flexibilidad. Solo tienes que decirnos qué
        skills buscas — nosotros nos encargamos de aportarte el talento
        adecuado desde el primer día.
      </>
    ),
    article2P2: (
      <>
        Ajusta tu equipo según crece tu proyecto. Añade o redefine perfiles
        cuando lo necesites, con total flexibilidad.
      </>
    ),
    faq1Q: "¿Es esto externalización tradicional?",
    faq1A: (
      <>
        No. A diferencia de la externalización tradicional, el equipo
        embebido trabaja como una extensión directa de tu negocio —
        totalmente integrado en tu estructura, procesos y cultura, con
        responsabilidad real sobre los resultados y no solo sobre la entrega
        de tareas.
      </>
    ),
    faq2Q: "¿Con qué rapidez puede estar operativo el equipo?",
    faq2A: (
      <>
        El equipo está diseñado para capacidad inmediata. Al ser senior
        desde el principio, requieren un mínimo de incorporación y pueden
        contribuir de forma significativa en los primeros días — sin los
        retrasos de un proceso de contratación tradicional.
      </>
    ),
    faq3Q: "¿Qué ocurre cuando las necesidades del proyecto cambian?",
    faq3A: (
      <>
        El equipo es flexible y ad hoc por diseño. Puedes escalar la
        capacidad hacia arriba o hacia abajo a medida que cambian las
        prioridades del proyecto — sin el compromiso ni la fricción de
        ajustar la plantilla permanente.
      </>
    ),
    faq4Q: "¿Cómo se estructuran los costes?",
    faq4A: (
      <>
        Los costes son estables y predecibles, sin el overhead variable del
        empleo permanente. Obtienes un modelo de contratación claro y
        consistente que simplifica la planificación presupuestaria y elimina
        gastos inesperados de contratación o retención.
      </>
    ),
  },
  en: {
    heroH1: "Integrated Senior Tech Team",
    breadcrumbCurrent: "Embedded Development",
    introH2: "Integrated Senior Tech Team",
    introP: (
      <>
        A senior IT team that integrates directly into your company as a
        core part of your technology structure. Not traditional outsourcing
        — a direct extension of your business, with real ownership and
        accountability over outcomes.
      </>
    ),
    ctaLabel: "Let’s Talk",
    article1H3a: "Breaking through development bottlenecks",
    article1P1: (
      <>
        Overloaded tech teams, missing senior profiles, and blocked projects
        slow down even the most ambitious companies. Moving forward without
        growing your permanent headcount — and hiring qualified talent
        quickly — are challenges that demand a different approach.
      </>
    ),
    article1H3b: "Real seniority from day one",
    article1P2: (
      <>
        Our team steps in with the seniority and context needed to make an
        immediate impact. No lengthy onboarding cycles, no ramp-up friction
        — just capable engineers who integrate with your processes and take
        ownership of results from the start.
      </>
    ),
    article1P3: (
      <>
        Whether supporting day-to-day operational development or driving
        strategic product initiatives, the embedded team works as a
        seamless part of your organisation — not as an external vendor.
      </>
    ),
    article2H3: "Build your ad hoc, flexible tech team",
    article2P1: (
      <>
        Add one or more technical profiles based on what you need at any
        given moment, with complete flexibility. Just tell us what skills
        you&apos;re looking for — we&apos;ll bring you the right talent from
        day one.
      </>
    ),
    article2P2: (
      <>
        Adjust your team as your project grows. Add or redefine profiles
        whenever you need to, with total flexibility.
      </>
    ),
    faq1Q: "Is this traditional outsourcing?",
    faq1A: (
      <>
        No. Unlike traditional outsourcing, the embedded team works as a
        direct extension of your business — fully integrated into your
        structure, processes, and culture, with real responsibility for
        outcomes rather than just task delivery.
      </>
    ),
    faq2Q: "How quickly can the team be operational?",
    faq2A: (
      <>
        The team is designed for immediate capacity. Because engineers are
        senior from the start, they require minimal onboarding and can
        contribute meaningfully within the first days — without the delays
        of a traditional hiring process.
      </>
    ),
    faq3Q: "What happens when our project needs change?",
    faq3A: (
      <>
        The team is flexible and ad hoc by design. You can scale capacity up
        or down as your project priorities shift — without the commitment or
        friction of adjusting permanent headcount.
      </>
    ),
    faq4Q: "How are costs structured?",
    faq4A: (
      <>
        Costs are stable and predictable, without the variable overhead of
        permanent employment. You get a clear, consistent engagement model
        that makes budgeting straightforward and eliminates unexpected
        hiring or retention expenses.
      </>
    ),
  },
} as const;

export default function ServiceEmbeddedTemplate({
  locale,
}: {
  locale: Locale;
}) {
  const t = CONTENT[locale];
  const homeLabel = locale === "es" ? "Inicio" : "Home";

  return (
    <>
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <PageHero
        width="wide"
        title={t.heroH1}
        homeHref={ROUTES[locale].home}
        homeLabel={homeLabel}
        current={t.breadcrumbCurrent}
      />

      <ServiceIntroBand
        image={introImg}
        title={t.introH2}
        text={t.introP}
        ctaLabel={t.ctaLabel}
        ctaHref={ROUTES[locale].contact}
      />

      <ServiceDetails
        articles={[
          [
            { title: t.article1H3a, paragraphs: [t.article1P1] },
            {
              title: t.article1H3b,
              paragraphs: [t.article1P2, t.article1P3],
            },
          ],
          [{ title: t.article2H3, paragraphs: [t.article2P1, t.article2P2] }],
        ]}
        faq={[
          { question: t.faq1Q, answer: t.faq1A },
          { question: t.faq2Q, answer: t.faq2A },
          { question: t.faq3Q, answer: t.faq3A },
          { question: t.faq4Q, answer: t.faq4A },
        ]}
      />

      <Footer locale={locale} copyrightVariant="hyphen" />
    </>
  );
}
