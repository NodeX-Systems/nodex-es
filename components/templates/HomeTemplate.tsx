import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import LogoMarquee from "@/components/home/LogoMarquee";
import WhyNodex from "@/components/home/WhyNodex";
import ServicesSection from "@/components/home/ServicesSection";
import HowWeWork from "@/components/home/HowWeWork";
import HomeContact from "@/components/home/HomeContact";
import { ROUTES, type Locale } from "@/lib/routes";
import serviceImg1 from "@/public/assets/img/service/service-img1.png";
import serviceImg2 from "@/public/assets/img/service/service-img2.png";
import serviceImg3 from "@/public/assets/img/service/service-img3.png";
import serviceIcon1 from "@/public/assets/img/icons/service1-icon1.png";
import serviceIcon2 from "@/public/assets/img/icons/service1-icon2.png";
import serviceIcon3 from "@/public/assets/img/icons/service1-icon3.png";
import workIcon1 from "@/public/assets/img/icons/work1-icon1.png";
import workIcon2 from "@/public/assets/img/icons/work1-icon2.png";
import workIcon3 from "@/public/assets/img/icons/work1-icon3.png";

const CONTENT = {
  es: {
    heroSpan: "Equipo IT Senior · Integración Inmediata",
    heroH1: (
      <>
        Escalamos Tecnología con Criterio, Sin Sobredimensionar tu
        Equipo
      </>
    ),
    heroP: (
      <>
        NodeX es un equipo IT senior que se integra en tu negocio de
        forma inmediata, dando soporte tanto al desarrollo operativo
        del día a día como a la construcción de productos y
        plataformas estratégicas.
      </>
    ),
    heroBtn1: "Hablemos",
    heroBtn2: "Quiénes Somos",
    choose1Stat1: "Perfiles Senior",
    choose1Stat2: "Para integrarse",
    choose1Span: "Por qué NodeX",
    choose1H2: "Nos Integramos, Desbloqueamos y Escalamos con tu Negocio",
    choose1P: (
      <>
        Somos el equipo de desarrollo especialista que entra en
        acción cuando necesitas experiencia, capacidad y ejecución
        inmediata.
      </>
    ),
    choose1List1: "Integración sin fricciones",
    choose1List2: "Desbloquea cuellos de botella técnicos",
    choose1List3: "Seniority real desde el primer día",
    choose1List4: "Previene bloqueos técnicos",
    choose1List5: "Escala sin aumentar plantilla",
    choose1List6: "Modelo de equipo flexible y ad hoc",
    choose1Btn: "Quiénes Somos",
    serviceSpan: "Nuestros Productos",
    serviceH2: "Tres Formas en que NodeX Aporta Valor a tu Negocio",
    serviceP: (
      <>
        NodeX estructura su oferta en torno a tres productos
        principales — cada uno diseñado para generar impacto
        inmediato, desde el desarrollo embebido hasta la ingeniería
        de plataformas estratégicas.
      </>
    ),
    service1Title: "Equipo integrado",
    service1P: (
      <>
        Ingenieros senior integrados en tu equipo, entregando
        desde el primer día sin fricción de incorporación.
      </>
    ),
    service2Title: "Producto adhoc",
    service2P: (
      <>
        Arquitectura, diseño y construcción de productos y
        plataformas estratégicas preparadas para escalar.
      </>
    ),
    service3Title: "Consultoria tech",
    service3P: (
      <>
        Leads con experiencia que aportan criterio, dirección y
        supervisión arquitectónica a tus decisiones
        tecnológicas.
      </>
    ),
    serviceBtn: "Habla con Nuestro Equipo",
    workSpan: "Cómo Trabajamos",
    workH2: "Desarrollo Especialista, Criterio y Ejecución Inmediata",
    workP: (
      <>
        Entramos cuando se forman cuellos de botella, cuando las
        decisiones técnicas requieren seniority y cuando la
        velocidad de ejecución importa.
      </>
    ),
    work1Title: "Integración Sin Fricciones",
    work1P: (
      <>
        Nos integramos en tu equipo sin overhead de
        onboarding — output inmediato, sin fricción.
      </>
    ),
    work2Title: "Seniority Real",
    work2P: (
      <>
        Perfiles senior desde el primer día. Criterio
        técnico, visión arquitectónica y experiencia en cada
        proyecto.
      </>
    ),
    work3Title: "Flexible y Ad Hoc",
    work3P: (
      <>
        Contrata un equipo completo o un especialista. Escala
        según tus necesidades reales, sin un contrato fijo.
      </>
    ),
    contactSpan: "Contáctanos",
    contactH2: "Hablemos de tus Retos Tecnológicos",
    contactP: (
      <>
        Si enfrentas cuellos de botella técnicos, necesitas escalar
        tu equipo o quieres construir un producto estratégico — nos
        encantaría entender tu contexto y ayudarte.
      </>
    ),
    contactEmailLabel: "Escríbenos",
    formH3: "Envíanos un Mensaje",
    formP: (
      <>
        Cuéntanos sobre tu proyecto o necesidades de equipo y te
        responderemos pronto.
      </>
    ),
    placeholderName: "Nombre",
    placeholderEmail: "Email",
    placeholderPhone: "Teléfono",
    placeholderMessage: "Mensaje",
    formSubmit: "Enviar",
  },
  en: {
    heroSpan: "Senior IT Team · Immediate Integration",
    heroH1: (
      <>
        We Scale Technology With Criteria, Without Oversizing Your
        Team
      </>
    ),
    heroP: (
      <>
        NodeX is a senior IT team that integrates into your
        business immediately, supporting both day-to-day
        development and the construction of strategic products and
        platforms.
      </>
    ),
    heroBtn1: <>Let&apos;s Talk</>,
    heroBtn2: "About Us",
    choose1Stat1: "Senior Profiles",
    choose1Stat2: "To Integrate",
    choose1Span: "Why NodeX",
    choose1H2: "We Integrate, Unblock and Scale With Your Business",
    choose1P: (
      <>
        We are the specialist development team that steps in when
        you need expertise, capacity and immediate execution.
      </>
    ),
    choose1List1: "Frictionless Integration",
    choose1List2: "Unblocks Tech Bottlenecks",
    choose1List3: "Real Seniority From Day One",
    choose1List4: "Prevents Technical Blockers",
    choose1List5: "Scale Without Growing Headcount",
    choose1List6: <>Flexible &amp; Ad Hoc Team Model</>,
    choose1Btn: "About Us",
    serviceSpan: "Our Products",
    serviceH2: "Three Ways NodeX Delivers Value to Your Business",
    serviceP: (
      <>
        NodeX structures its offering around three core products —
        each designed to deliver immediate impact, from embedded
        development to strategic platform engineering.
      </>
    ),
    service1Title: "Embedded Development",
    service1P: (
      <>
        Senior engineers integrated into your team, delivering
        from day one with no ramp-up friction.
      </>
    ),
    service2Title: "Platform Engineering",
    service2P: (
      <>
        Architecture, design and construction of strategic
        products and platforms built to scale.
      </>
    ),
    service3Title: "Technical Leadership",
    service3P: (
      <>
        Experienced leads who bring criteria, direction and
        architectural oversight to your tech decisions.
      </>
    ),
    serviceBtn: "Talk to Our Team",
    workSpan: "How We Work",
    workH2: <>Specialist Development, Criteria &amp; Immediate Execution</>,
    workP: (
      <>
        We step in when bottlenecks form, when technical decisions
        need seniority, and when speed of execution matters.
      </>
    ),
    work1Title: "Frictionless Integration",
    work1P: (
      <>
        We embed into your team without onboarding overhead —
        immediate output, zero friction.
      </>
    ),
    work2Title: "Real Seniority",
    work2P: (
      <>
        Senior profiles from day one. Technical criteria,
        architectural vision and experience in every
        engagement.
      </>
    ),
    work3Title: <>Flexible &amp; Ad Hoc</>,
    work3P: (
      <>
        Engage us as a full team or a single specialist.
        Scale according to your real needs, not a fixed
        contract.
      </>
    ),
    contactSpan: "Contact Us",
    contactH2: <>Let&apos;s Talk About Your Technology Challenges</>,
    contactP: (
      <>
        Whether you&apos;re facing technical bottlenecks, need to
        scale your team, or want to build a strategic product —
        we&apos;d love to understand your context and help.
      </>
    ),
    contactEmailLabel: "Send me Mail",
    formH3: "Send us a Message",
    formP: (
      <>
        Tell us about your project or team needs and we&apos;ll
        get back to you shortly.
      </>
    ),
    placeholderName: "Name",
    placeholderEmail: "Email",
    placeholderPhone: "Phone",
    placeholderMessage: "Message",
    formSubmit: "Submit Now",
  },
} as const;

export default function HomeTemplate({ locale }: { locale: Locale }) {
  const routes = ROUTES[locale];
  const content = CONTENT[locale];

  return (
    <>
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <HomeHero
        eyebrow={content.heroSpan}
        title={content.heroH1}
        text={content.heroP}
        primary={{ href: routes.contact, label: content.heroBtn1 }}
        secondary={{ href: routes.about, label: content.heroBtn2 }}
      />

      <LogoMarquee />

      <WhyNodex
        stat1={content.choose1Stat1}
        stat2={content.choose1Stat2}
        eyebrow={content.choose1Span}
        title={content.choose1H2}
        text={content.choose1P}
        items={[
          content.choose1List1,
          content.choose1List2,
          content.choose1List3,
          content.choose1List4,
          content.choose1List5,
          content.choose1List6,
        ]}
        button={{ href: routes.about, label: content.choose1Btn }}
      />

      <ServicesSection
        eyebrow={content.serviceSpan}
        title={content.serviceH2}
        text={content.serviceP}
        cards={[
          {
            image: serviceImg1,
            icon: serviceIcon1,
            href: routes.svcEmbedded,
            title: content.service1Title,
            text: content.service1P,
          },
          {
            image: serviceImg2,
            icon: serviceIcon2,
            href: routes.svcPlatform,
            title: content.service2Title,
            text: content.service2P,
          },
          {
            image: serviceImg3,
            icon: serviceIcon3,
            href: routes.svcLeadership,
            title: content.service3Title,
            text: content.service3P,
          },
        ]}
        button={{ href: routes.contact, label: content.serviceBtn }}
      />

      <HowWeWork
        eyebrow={content.workSpan}
        title={content.workH2}
        text={content.workP}
        steps={[
          {
            icon: workIcon1,
            href: routes.contact,
            title: content.work1Title,
            text: content.work1P,
          },
          {
            icon: workIcon2,
            href: routes.contact,
            title: content.work2Title,
            text: content.work2P,
          },
          {
            icon: workIcon3,
            href: routes.contact,
            title: content.work3Title,
            text: content.work3P,
          },
        ]}
      />

      <HomeContact
        locale={locale}
        eyebrow={content.contactSpan}
        title={content.contactH2}
        text={content.contactP}
        emailLabel={content.contactEmailLabel}
        formTitle={content.formH3}
        formText={content.formP}
        placeholders={{
          name: content.placeholderName,
          email: content.placeholderEmail,
          phone: content.placeholderPhone,
          message: content.placeholderMessage,
        }}
        submitLabel={content.formSubmit}
      />

      <Footer locale={locale} copyrightVariant="normal" />
    </>
  );
}
