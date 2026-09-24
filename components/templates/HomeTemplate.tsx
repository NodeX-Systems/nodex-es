import Link from "next/link";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import SiteScripts from "@/components/SiteScripts";
import { FORM_ENDPOINTS, CONTACT_EMAIL } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

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

      {/*=====HERO AREA START =======*/}
      <div className="hero-area1">
        <div className="container hero-container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="main-heading">
                <span
                  className="span"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  {content.heroSpan}
                </span>
                <h1 className="text-anime-style-3">{content.heroH1}</h1>
                <div className="space16"></div>
                <p data-aos="fade-right" data-aos-duration="1000">
                  {content.heroP}
                </p>

                <div className="space30"></div>
                <div
                  className="hero1-buttons"
                  data-aos="fade-right"
                  data-aos-duration="1200"
                >
                  <Link className="theme-btn1" href={routes.contact}>
                    {content.heroBtn1}{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                  <Link className="theme-btn2" href={routes.about}>
                    {content.heroBtn2}{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====HERO AREA END=======*/}

      {/*=====HERO SLIDER AREA START=======*/}
      <div className="hero1-slider">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="logo-slider">
                <div className="single-slider">
                  <img src="/assets/img/logo/sliderlogo-auren.png" alt="Logo Auren" />
                </div>
                <div className="single-slider">
                  <img src="/assets/img/logo/sliderlogo-bbva.png" alt="Logo BBVA" />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-dailyplaylists.png"
                    alt="Logo Daily Playlists"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-econocom.png"
                    alt="Logo Econocom"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-igeneris.png"
                    alt="Logo iGeneris"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-impackta.png"
                    alt="Logo Impackta"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-incentro.png"
                    alt="Logo Incentro"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-ioforge.png"
                    alt="Logo ioforge"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-mediapro.png"
                    alt="Logo Mediapro"
                  />
                </div>
                <div className="single-slider">
                  <img
                    src="/assets/img/logo/sliderlogo-shakers.png"
                    alt="Logo Shakers"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====HERO SLIDER AREA END=======*/}

      {/*=====ABOUT AREA START=======*/}
      <div className="chosse1 sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <div className="" data-aos="zoom-in-up" data-aos-duration="900">
                <div className="icon-box">
                  <div className="icon">
                    <img src="/assets/img/icons/choose1-icon2.png" alt="" />
                  </div>
                  <div className="heading1">
                    <h3>
                      <span className="counter">100</span>%
                    </h3>
                    <div className="space10"></div>
                    <p>{content.choose1Stat1}</p>
                  </div>
                </div>
              </div>

              <div
                className=""
                data-aos="zoom-in-up"
                data-aos-duration="1200"
              >
                <div className="icon-box icon-box2">
                  <div className="icon">
                    <img src="/assets/img/icons/choose1-icon3.png" alt="" />
                  </div>
                  <div className="heading1">
                    <h3>&lt;1 week</h3>
                    <div className="space10"></div>
                    <p>{content.choose1Stat2}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="heading1 choose1-heading">
                <span
                  className="span"
                  data-aos="fade-left"
                  data-aos-duration="700"
                >
                  {content.choose1Span}
                </span>
                <h2 className="text-anime-style-3">{content.choose1H2}</h2>
                <div className="space16"></div>
                <p data-aos="fade-left" data-aos-duration="900">
                  {content.choose1P}
                </p>

                <div className="space10"></div>
                <div
                  className="row"
                  data-aos="fade-left"
                  data-aos-duration="800"
                >
                  <div className="col-lg-6">
                    <ul className="icon-list">
                      <li>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>{" "}
                        {content.choose1List1}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="icon-list">
                      <li>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>{" "}
                        {content.choose1List2}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="icon-list">
                      <li>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>{" "}
                        {content.choose1List3}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="icon-list">
                      <li>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>{" "}
                        {content.choose1List4}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="icon-list">
                      <li>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>{" "}
                        {content.choose1List5}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="icon-list">
                      <li>
                        <span>
                          <i className="fa-solid fa-check"></i>
                        </span>{" "}
                        {content.choose1List6}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space30"></div>
                <div
                  className=""
                  data-aos="fade-left"
                  data-aos-duration="1100"
                >
                  <Link className="theme-btn1" href={routes.about}>
                    {content.choose1Btn}{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====ABOUT AREA END=======*/}

      {/*=====SERVICE AREA START=======*/}
      <div className="service1 sp">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto text-center">
              <div className="heading1-w">
                <span
                  className="span"
                  data-aos="zoom-in-left"
                  data-aos-duration="700"
                >
                  {content.serviceSpan}
                </span>
                <h2 className="text-anime-style-3">{content.serviceH2}</h2>
                <div className="space16"></div>
                <p data-aos="fade-left" data-aos-duration="800">
                  {content.serviceP}
                </p>
              </div>
            </div>
          </div>

          <div className="space30"></div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div
                className="service1-box"
                data-aos="zoom-in-up"
                data-aos-duration="700"
              >
                <div className="image overlay-anim">
                  <img src="/assets/img/service/service-img1.png" alt="" />
                </div>
                <div className="hover-area">
                  <div className="icon">
                    <img src="/assets/img/icons/service1-icon1.png" alt="" />
                  </div>
                  <div className="space16"></div>
                  <div className="heading1-w">
                    <h4>
                      <Link href={routes.svcEmbedded}>
                        {content.service1Title}
                      </Link>
                    </h4>
                    <div className="space16"></div>
                    <p>{content.service1P}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div
                className="service1-box"
                data-aos="zoom-in-up"
                data-aos-duration="900"
              >
                <div className="image overlay-anim">
                  <img src="/assets/img/service/service-img2.png" alt="" />
                </div>
                <div className="hover-area">
                  <div className="icon">
                    <img src="/assets/img/icons/service1-icon2.png" alt="" />
                  </div>
                  <div className="space16"></div>
                  <div className="heading1-w">
                    <h4>
                      <Link href={routes.svcPlatform}>
                        {content.service2Title}
                      </Link>
                    </h4>
                    <div className="space16"></div>
                    <p>{content.service2P}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div
                className="service1-box"
                data-aos="zoom-in-up"
                data-aos-duration="1100"
              >
                <div className="image overlay-anim">
                  <img src="/assets/img/service/service-img3.png" alt="" />
                </div>
                <div className="hover-area">
                  <div className="icon">
                    <img src="/assets/img/icons/service1-icon3.png" alt="" />
                  </div>
                  <div className="space16"></div>
                  <div className="heading1-w">
                    <h4>
                      <Link href={routes.svcLeadership}>
                        {content.service3Title}
                      </Link>
                    </h4>
                    <div className="space16"></div>
                    <p>{content.service3P}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space50"></div>
            <div className="col-lg-12">
              <div
                className="text-center"
                data-aos="zoom-in-up"
                data-aos-duration="700"
              >
                <Link className="theme-btn3" href={routes.contact}>
                  {content.serviceBtn}{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====SERVICE AREA END=======*/}

      {/*=====WORK AREA START=======*/}
      <div className="work1 sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="work-img reveal overlay-anim">
                <img src="/assets/img/work/work-image.png" alt="" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="heading1 work1-heading">
                <span
                  className="span"
                  data-aos="zoom-in-left"
                  data-aos-duration="700"
                >
                  {content.workSpan}
                </span>
                <h2 className="text-anime-style-3">{content.workH2}</h2>
                <div className="space16"></div>
                <p data-aos="fade-left" data-aos-duration="900">
                  {content.workP}
                </p>

                <div className="space10"></div>
                <div
                  className=""
                  data-aos="fade-left"
                  data-aos-duration="900"
                >
                  <div className="work1-box">
                    <div className="">
                      <div className="icon">
                        <img
                          src="/assets/img/icons/work1-icon1.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="heading1">
                      <h4>
                        <Link href={routes.contact}>{content.work1Title}</Link>
                      </h4>
                      <p>{content.work1P}</p>
                    </div>
                  </div>
                </div>

                <div
                  className=""
                  data-aos="fade-left"
                  data-aos-duration="700"
                >
                  <div className="work1-box">
                    <div className="">
                      <div className="icon">
                        <img
                          src="/assets/img/icons/work1-icon2.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="heading1">
                      <h4>
                        <Link href={routes.contact}>{content.work2Title}</Link>
                      </h4>
                      <p>{content.work2P}</p>
                    </div>
                  </div>
                </div>

                <div
                  className=""
                  data-aos="fade-left"
                  data-aos-duration="1100"
                >
                  <div className="work1-box">
                    <div className="">
                      <div className="icon">
                        <img
                          src="/assets/img/icons/work1-icon3.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="heading1">
                      <h4>
                        <Link href={routes.contact}>{content.work3Title}</Link>
                      </h4>
                      <p>{content.work3P}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====WORK AREA END=======*/}

      {/*=====CONTACT AREA START=======*/}
      <div className="contact1 sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="heading1-w">
                <span
                  className="span"
                  data-aos="zoom-in-left"
                  data-aos-duration="700"
                >
                  {content.contactSpan}
                </span>
                <h2 className="text-anime-style-3">{content.contactH2}</h2>
                <div className="space16"></div>
                <p data-aos="fade-right" data-aos-duration="900">
                  {content.contactP}
                </p>

                <div
                  className=""
                  data-aos="fade-right"
                  data-aos-duration="1100"
                >
                  <div className="contact1-box">
                    <div className="icon">
                      <img
                        src="/assets/img/icons/contact-icon2.png"
                        alt=""
                      />
                    </div>
                    <div className="heading">
                      <p>{content.contactEmailLabel}</p>
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="contact1-form"
                data-aos="zoom-out"
                data-aos-duration="900"
              >
                <div className="heading1">
                  <h3>{content.formH3}</h3>
                  <div className="space16"></div>
                  <p>{content.formP}</p>
                </div>
                <div className="space10"></div>

                <form action={FORM_ENDPOINTS.contact} method="POST">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-input">
                        <input
                          type="text"
                          name="name"
                          placeholder={content.placeholderName}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="email"
                          name="email"
                          placeholder={content.placeholderEmail}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="number"
                          name="phone"
                          placeholder={content.placeholderPhone}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <textarea
                          name="message"
                          rows={4}
                          placeholder={content.placeholderMessage}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="button">
                        <button
                          type="submit"
                          title="Submit"
                          className="theme-btn1"
                        >
                          {content.formSubmit}{" "}
                          <span>
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====CONTACT AREA END=======*/}

      <Footer locale={locale} copyrightVariant="normal" />
      <SiteScripts hasContactForm={true} />
    </>
  );
}
