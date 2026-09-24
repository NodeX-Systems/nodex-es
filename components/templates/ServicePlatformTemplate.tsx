import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import ServiceIntroBand from "@/components/services/ServiceIntroBand";
import ServiceDetails from "@/components/services/ServiceDetails";
import { ROUTES, type Locale } from "@/lib/routes";
import introImg from "@/public/assets/img/service/service-details-img2.png";

const CONTENT = {
  es: {
    heroH1: "Desarrollo de Plataforma y Producto Llave en Mano",
    homeLabel: "Inicio",
    crumb: "Producto adhoc",
    introH2: "Desarrollo de Plataforma y Producto Llave en Mano",
    introP: (
      <>
        NodeX asume la responsabilidad técnica total de tu proyecto — desde el
        diseño inicial hasta el despliegue en producción. Construimos
        plataformas digitales, productos tecnológicos a medida, aplicaciones
        empresariales, apps internas y externas, soluciones SaaS y sistemas
        tecnológicos personalizados adaptados a tus necesidades exactas.
      </>
    ),
    ctaLabel: "Hablemos",
    article1H3a: "Diseñado para las empresas que más lo necesitan",
    article1Pa: (
      <>
        Tanto si estás lanzando una nueva plataforma, creando una solución
        tecnológica propia o desarrollando una aplicación interna crítica, el
        desarrollo improvisado no es una opción. Los proyectos estratégicos y
        las nuevas líneas de negocio digital requieren un socio que aporte
        estructura y responsabilidad desde el primer día.
      </>
    ),
    article1H3b: "Arquitectura sólida, preparada para escalar",
    article1Pb: (
      <>
        Cada proyecto comienza con la arquitectura correcta — diseñada para
        el crecimiento, no solo para el requisito inmediato. Esto significa
        menos errores estructurales en el futuro, una plataforma que puede
        evolucionar con tu negocio y una entrega llave en mano en la que
        puedes confiar.
      </>
    ),
    article1Pc: (
      <>
        Tras la entrega, NodeX permanece disponible para el mantenimiento y
        la evolución continua, garantizando la continuidad y la capacidad de
        adaptación a medida que cambien tus necesidades.
      </>
    ),
    article2H3: "Cómo trabajamos",
    article2Pa: (
      <>
        Nuestro proceso de entrega está estructurado para minimizar el
        riesgo y garantizar la calidad en cada etapa — desde la primera
        conversación hasta la producción y más allá.
      </>
    ),
    article2Pb: (
      <>
        Comenzamos con una definición funcional y técnica exhaustiva, luego
        avanzamos por el diseño arquitectónico, el desarrollo completo, el
        despliegue en producción y el mantenimiento y evolución continuos.
      </>
    ),
    faqQ1: "¿Qué tipos de proyectos podéis construir?",
    faqA1: (
      <>
        Cubrimos todo el espectro: plataformas digitales, productos
        tecnológicos a medida, aplicaciones empresariales, apps internas y
        externas, soluciones SaaS y sistemas tecnológicos personalizados. Si
        necesitas que se construya correctamente, nosotros lo construimos.
      </>
    ),
    faqQ2: "¿Quién asume la responsabilidad técnica?",
    faqA2: (
      <>
        NodeX asume la responsabilidad técnica total del proyecto — desde el
        diseño arquitectónico hasta el despliegue en producción. Tú
        conservas la propiedad del producto; nosotros nos hacemos
        responsables de entregarlo correctamente.
      </>
    ),
    faqQ3: "¿Cómo es el proceso de entrega?",
    faqA3: (
      <>
        Seguimos cinco fases estructuradas: definición funcional y técnica,
        diseño arquitectónico, desarrollo completo, despliegue en producción
        y mantenimiento y evolución continuos. Cada fase se completa antes
        de pasar a la siguiente, manteniendo la calidad y la claridad en
        todo momento.
      </>
    ),
    faqQ4: "¿Qué ocurre después del lanzamiento de la plataforma?",
    faqA4: (
      <>
        La entrega no significa despedida. NodeX ofrece soporte
        post-lanzamiento para el mantenimiento y la evolución continua,
        garantizando que tu plataforma se mantenga en buen estado y se
        adapte a medida que tu negocio crece y los requisitos cambian.
      </>
    ),
  },
  en: {
    heroH1: (
      <>
        Turnkey Platform &amp; Product Development
      </>
    ),
    homeLabel: "Home",
    crumb: "Platform Engineering",
    introH2: (
      <>
        Turnkey Platform &amp; Product Development
      </>
    ),
    introP: (
      <>
        NodeX takes full technical ownership of your project — from initial
        design through to production deployment. We build digital
        platforms, bespoke tech products, enterprise applications, internal
        and external apps, SaaS solutions, and custom technology systems
        tailored to your exact needs.
      </>
    ),
    ctaLabel: <>Let&apos;s Talk</>,
    article1H3a: "Built for the companies that need it most",
    article1Pa: (
      <>
        Whether you&apos;re launching a new platform, creating a proprietary
        technology solution, or developing a critical internal application,
        improvised development is not an option. Strategic projects and new
        digital business lines require a partner that brings structure and
        accountability from day one.
      </>
    ),
    article1H3b: "Solid architecture, built to scale",
    article1Pb: (
      <>
        Every project starts with the right architecture — designed for
        growth, not just the immediate requirement. This means fewer
        structural errors down the line, a platform that can evolve with
        your business, and a turnkey delivery you can rely on.
      </>
    ),
    article1Pc: (
      <>
        After delivery, NodeX remains available for ongoing maintenance and
        evolution, ensuring continuity and the ability to adapt as your
        needs change.
      </>
    ),
    article2H3: "How we work",
    article2Pa: (
      <>
        Our delivery process is structured to minimise risk and ensure
        quality at every stage — from the first conversation to production
        and beyond.
      </>
    ),
    article2Pb: (
      <>
        We begin with a thorough functional and technical definition, then
        move through architecture design, full development, production
        deployment, and ongoing maintenance and evolution.
      </>
    ),
    faqQ1: "What types of projects can you build?",
    faqA1: (
      <>
        We cover the full spectrum: digital platforms, bespoke technology
        products, enterprise applications, internal and external apps, SaaS
        solutions, and custom technology systems. If you need it built
        properly, we can build it.
      </>
    ),
    faqQ2: "Who owns the technical responsibility?",
    faqA2: (
      <>
        NodeX assumes full technical responsibility for the project — from
        architecture design through to production deployment. You retain
        ownership of the product; we take ownership of delivering it
        correctly.
      </>
    ),
    faqQ3: "What does the delivery process look like?",
    faqA3: (
      <>
        We follow five structured phases: functional and technical
        definition, architecture design, full development, production
        deployment, and ongoing maintenance and evolution. Each phase is
        completed before moving to the next, keeping quality and clarity
        throughout.
      </>
    ),
    faqQ4: "What happens after the platform is launched?",
    faqA4: (
      <>
        Delivery doesn&apos;t mean goodbye. NodeX provides post-launch
        support for maintenance and ongoing evolution, ensuring your
        platform stays healthy and adapts as your business grows and
        requirements change.
      </>
    ),
  },
} as const;

export default function ServicePlatformTemplate({ locale }: { locale: Locale }) {
  const routes = ROUTES[locale];
  const t = CONTENT[locale];

  return (
    <>
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <PageHero
        width="wide"
        title={t.heroH1}
        homeHref={routes.home}
        homeLabel={t.homeLabel}
        current={t.crumb}
      />

      <ServiceIntroBand
        image={introImg}
        title={t.introH2}
        text={t.introP}
        ctaLabel={t.ctaLabel}
        ctaHref={routes.contact}
      />

      <ServiceDetails
        leadingGap
        articles={[
          [
            { title: t.article1H3a, paragraphs: [t.article1Pa] },
            {
              title: t.article1H3b,
              paragraphs: [t.article1Pb, t.article1Pc],
            },
          ],
          [{ title: t.article2H3, paragraphs: [t.article2Pa, t.article2Pb] }],
        ]}
        faq={[
          { question: t.faqQ1, answer: t.faqA1 },
          { question: t.faqQ2, answer: t.faqA2 },
          { question: t.faqQ3, answer: t.faqA3 },
          { question: t.faqQ4, answer: t.faqA4 },
        ]}
      />

      <Footer locale={locale} copyrightVariant="hyphen" />
    </>
  );
}
