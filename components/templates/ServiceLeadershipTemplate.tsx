import Link from "next/link";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SiteScripts from "@/components/SiteScripts";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    h1: "Programa de Eficiencia Empresarial y Digitalización",
    home: "Inicio ",
    breadcrumb: "Consultoria tech",
    introHeading: "Programa de Eficiencia Empresarial y Digitalización",
    introText: (
      <>
        Un programa estructurado para identificar y resolver
        ineficiencias internas a través de la tecnología. NodeX es
        el equipo que llega, analiza tus operaciones y construye
        las herramientas que tu negocio necesita para funcionar
        mejor — desde dentro hacia afuera.
      </>
    ),
    talkCta: "Hablemos",
    h3Problems: (
      <>
        Los problemas que la mayoría de las empresas no ven
        desde dentro
      </>
    ),
    pProblems: (
      <>
        Los procesos manuales, las herramientas desconectadas,
        la falta de automatización y la dificultad para
        escalar estructuras erosionan la eficiencia operativa —
        a menudo sin que la organización lo perciba plenamente.
        El resultado es tiempo perdido, costes evitables y
        procesos que bloquean el crecimiento en lugar de
        impulsarlo.
      </>
    ),
    h3Flex: "Haz tu equipo tech adhoc y flexible",
    pFlex1: (
      <>
        Incorpora uno o varios perfiles técnicos según lo que
        necesites en cada momento, con total flexibilidad. Solo
        tienes que decirnos qué skills buscas — nosotros nos
        encargamos de aportarte el talento adecuado desde el
        primer día. Ajusta tu equipo según crece tu proyecto.
        Añade o redefine perfiles cuando lo necesites, con
        total flexibilidad.
      </>
    ),
    pFlex2: (
      <>
        Disponible en tres versiones — Pyme, Empresa y Gran
        Empresa — cada una ajustando el alcance y la
        profundidad al tamaño y la ambición de tu organización.
      </>
    ),
    h3Serious: (
      <>
        Diseñado para organizaciones que se toman la
        tecnología en serio
      </>
    ),
    pSerious1: (
      <>
        Este programa está diseñado para empresas medianas y
        grandes cuyos equipos directivos entienden la
        tecnología como una inversión estructural — no como
        una solución táctica. Organizaciones que buscan
        estabilidad, seniority y orientación estratégica, y
        que no se conforman con proyectos pequeños y de bajo
        impacto.
      </>
    ),
    pSerious2: (
      <>
        NodeX aporta la perspectiva externa necesaria para
        sacar a la luz lo que los equipos internos no pueden
        ver, combinada con la profundidad técnica para actuar
        de inmediato.
      </>
    ),
    faq1Q: "¿Cómo identificáis dónde están las ineficiencias?",
    faq1A: (
      <>
        NodeX comienza cada proyecto con una fase de
        diagnóstico estructurado. Analizamos tus procesos
        actuales, herramientas y flujos de trabajo del
        equipo para mapear dónde se pierden tiempo, coste
        y esfuerzo — sacando a la luz las ineficiencias
        que los equipos internos a menudo no pueden ver
        desde dentro.
      </>
    ),
    faq2Q: "¿Qué tipo de herramientas construye el programa?",
    faq2A: (
      <>
        Construimos herramientas internas a medida
        adaptadas a tus flujos de trabajo específicos —
        desde la automatización de procesos e
        integraciones de sistemas hasta dashboards
        personalizados y aplicaciones internas. Cada
        herramienta se construye para abordar
        directamente una ineficiencia confirmada, no una
        hipotética.
      </>
    ),
    faq3Q: (
      <>
        ¿Cuál es la diferencia entre las versiones Pyme,
        Empresa y Gran Empresa?
      </>
    ),
    faq3A: (
      <>
        Cada versión ajusta el alcance y la profundidad
        del proyecto al tamaño de tu organización. La
        versión Pyme se centra en mejoras específicas de
        alto impacto. Las versiones Empresa y Gran
        Empresa implican un análisis más profundo, una
        cobertura más amplia entre departamentos y
        herramientas y automatización más extensas.
      </>
    ),
    faq4Q: "¿Es este programa adecuado para nuestra empresa?",
    faq4A: (
      <>
        El programa está diseñado para organizaciones
        medianas y grandes cuya dirección entiende la
        tecnología como una inversión estructural. Si
        buscas una solución rápida y de bajo coste e
        impacto, esto no es. Si quieres una mejora
        operativa duradera y una base tecnológica
        escalable, es exactamente lo que hacemos.
      </>
    ),
  },
  en: {
    h1: (
      <>Business Efficiency &amp; Digitalisation Programme</>
    ),
    home: "Home ",
    breadcrumb: "Technical Leadership",
    introHeading: (
      <>Business Efficiency &amp; Digitalisation Programme</>
    ),
    introText: (
      <>
        A structured programme to identify and resolve internal
        inefficiencies through technology. NodeX is the team that
        comes in, analyses your operations, and builds the tools
        needed for your business to work better — from the
        inside out.
      </>
    ),
    talkCta: <>Let&apos;s Talk</>,
    h3Problems: (
      <>The problems most companies don&apos;t see from within</>
    ),
    pProblems: (
      <>
        Manual processes, disconnected tools, lack of
        automation, and difficulty scaling structures all
        erode operational efficiency — often without the
        organisation fully realising it. The result is lost
        time, avoidable costs, and processes that block
        growth rather than enable it.
      </>
    ),
    h3Flex: "Make your tech team ad hoc and flexible",
    pFlex1: (
      <>
        Bring in one or several technical profiles depending
        on what you need at any given moment, with complete
        flexibility. Just tell us what skills you&apos;re
        looking for — we&apos;ll take care of providing the
        right talent from day one. Scale your team as your
        project grows. Add or redefine profiles whenever you
        need to, with total flexibility.
      </>
    ),
    pFlex2: (
      <>
        Available in three versions — SME, Enterprise, and
        Large Enterprise — each adjusting scope and depth to
        match your organisation&apos;s size and ambition.
      </>
    ),
    h3Serious: (
      <>Built for organisations that take technology seriously</>
    ),
    pSerious1: (
      <>
        This programme is designed for medium and large
        companies whose leadership teams understand
        technology as a structural investment — not a
        tactical fix. Organisations seeking stability,
        seniority, and strategic guidance, and those that
        won&apos;t settle for small, low-impact projects.
      </>
    ),
    pSerious2: (
      <>
        NodeX brings the external perspective needed to
        surface what internal teams can&apos;t see, combined
        with the technical depth to act on it immediately.
      </>
    ),
    faq1Q: "How do you identify where the inefficiencies are?",
    faq1A: (
      <>
        NodeX begins every engagement with a structured
        diagnostic phase. We analyse your current
        processes, tools, and team workflows to map where
        time, cost, and effort are being lost —
        surfacing the inefficiencies that internal teams
        often can&apos;t see from the inside.
      </>
    ),
    faq2Q: "What kind of tools does the programme build?",
    faq2A: (
      <>
        We build bespoke internal tools tailored to your
        specific workflows — from process automation and
        system integrations to custom dashboards and
        internal applications. Every tool is built to
        directly address a confirmed inefficiency, not a
        hypothetical one.
      </>
    ),
    faq3Q: (
      <>
        What&apos;s the difference between the SME,
        Enterprise, and Large Enterprise versions?
      </>
    ),
    faq3A: (
      <>
        Each version adjusts the scope and depth of the
        engagement to match your organisation&apos;s
        size. The SME version focuses on high-impact,
        targeted improvements. Enterprise and Large
        Enterprise versions involve deeper analysis,
        broader coverage across departments, and more
        extensive tooling and automation.
      </>
    ),
    faq4Q: "Is this programme right for our company?",
    faq4A: (
      <>
        The programme is built for medium and large
        organisations whose leadership understands
        technology as a structural investment. If
        you&apos;re looking for a low-cost, low-impact
        quick fix, this isn&apos;t it. If you want
        lasting operational improvement and a scalable
        technology base, it&apos;s exactly what we do.
      </>
    ),
  },
} as const;

export default function ServiceLeadershipTemplate({
  locale,
}: {
  locale: Locale;
}) {
  const routes = ROUTES[locale];
  const t = CONTENT[locale];

  return (
    <>
      <SiteChrome />
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <div className="common-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto text-center">
              <div className="main-heading">
                <h1>{t.h1}</h1>
                <div className="pages-intro">
                  <Link href={routes.home}>{t.home}</Link>
                  <span>
                    <i className="fa-regular fa-angle-right"></i>
                  </span>
                  <p>{t.breadcrumb}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="service-intro-band">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="service-intro-image overlay-anim">
                <img src="/assets/img/service/service-details-img3.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading1-w service-intro-content">
                <h2>{t.introHeading}</h2>
                <div className="space16"></div>
                <p>{t.introText}</p>
                <div className="space30"></div>
                <Link className="theme-btn1" href={routes.contact}>
                  {t.talkCta}{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="service-details-all sp">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="service-details-area">
                <article>
                  <div className="heading1">
                    <div className="space30"></div>
                    <h3>{t.h3Problems}</h3>
                    <div className="space16"></div>
                    <p>{t.pProblems}</p>
                    <div className="space30"></div>
                    <h3>{t.h3Flex}</h3>
                    <div className="space16"></div>
                    <p>{t.pFlex1}</p>
                    <div className="space16"></div>
                    <p>{t.pFlex2}</p>
                  </div>
                </article>

                <div className="space30"></div>
                <article>
                  <div className="heading1">
                    <h3>{t.h3Serious}</h3>
                    <div className="space16"></div>
                    <p>{t.pSerious1}</p>
                    <div className="space16"></div>
                    <p>{t.pSerious2}</p>
                  </div>
                </article>

                <div className="space20"></div>

                <div className="faq-all-area">
                  <div
                    className="accordion accordion1 accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item active">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          {t.faq1Q}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">{t.faq1A}</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          {t.faq2Q}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">{t.faq2A}</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="flush-headingThree"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          {t.faq3Q}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">{t.faq3A}</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="flush-headingFour"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseFour"
                          aria-expanded="false"
                          aria-controls="flush-collapseFour"
                        >
                          {t.faq4Q}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingFour"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">{t.faq4A}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer locale={locale} copyrightVariant="hyphen" />
      <SiteScripts hasContactForm={false} />
    </>
  );
}
