import Link from "next/link";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SiteScripts from "@/components/SiteScripts";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    h1: "Nosotros",
    homeLink: "Inicio ",
    breadcrumbCurrent: "Nosotros",
    experienceYears: "Años de experiencia",
    span: "Nosotros",
    h2: "Nuestra Historia Conectando Talento, Impulsando el Éxito",
    intro:
      "Nuestro equipo de expertos del sector se dedica a entender tus necesidades únicas y ofrecer soluciones a medida que impulsan tu negocio hacia adelante.",
    icon1Title: "Un Equipo Técnico que se Integra y Ejecuta",
    icon1Body:
      "Somos el tipo de equipo que se integra para trabajar hacia la máxima eficiencia interna y evitar el sobredimensionamiento de tu organización.",
    icon2Title: "Talento Senior, Impacto Desde el Primer Día",
    icon2Body:
      "Aportamos perfiles senior que entienden el negocio y entregan desde el primer día — no solo manos, sino criterio, velocidad y responsabilidad sobre los resultados.",
  },
  en: {
    h1: "About Us",
    homeLink: "Home ",
    breadcrumbCurrent: "About Us",
    experienceYears: "Years of Experienced",
    span: "About Us",
    h2: "Our Story Connecting Talent, Powering Success",
    intro:
      "Our team of industry experts is dedicated to understanding your unique needs and delivering tailored solutions that propel your business forward.",
    icon1Title: "A Technical Team That Integrates and Executes",
    icon1Body:
      "We are the kind of team that embeds to work towards maximum internal efficiency and avoid oversizing your organisation.",
    icon2Title: "Senior Talent, Impact From Day One",
    icon2Body:
      "We bring senior profiles who understand the business and deliver from the first day — not just hands, but judgement, speed and ownership over results.",
  },
} as const;

export default function AboutTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];

  return (
    <>
      <SiteChrome />
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <div className="common-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto text-center">
              <div className="main-heading">
                <h1>{t.h1}</h1>
                <div className="pages-intro">
                  <Link href={ROUTES[locale].home}>{t.homeLink}</Link>
                  <span>
                    <i className="fa-regular fa-angle-right"></i>
                  </span>
                  <p>{t.breadcrumbCurrent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-page-sec1 sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about3-images">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="conter-box conter-box1">
                      <h3>
                        <span className="counter">16</span>+
                      </h3>
                      <p>{t.experienceYears}</p>
                    </div>
                    <div className="image overlay-anim">
                      <img src="/assets/img/about/about-img1.png" alt="" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="image overlay-anim">
                      <img src="/assets/img/about/about-img2.png" alt="" />
                    </div>
                    <div className="conter-box conter-box2">
                      <h3>
                        <span className="counter">16</span>+
                      </h3>
                      <p>{t.experienceYears}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="heading1 about3-heading">
                <span className="span">{t.span}</span>
                <h2>{t.h2}</h2>
                <div className="space16"></div>
                <p>{t.intro}</p>

                <div className="about3-icon-box">
                  <div className="">
                    <div className="icon">
                      <img
                        src="/assets/img/icons/about3-icon1.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="heading1">
                    <h5>
                      <a href="#">{t.icon1Title}</a>
                    </h5>
                    <p>{t.icon1Body}</p>
                  </div>
                </div>

                <div className="about3-icon-box">
                  <div className="">
                    <div className="icon">
                      <img
                        src="/assets/img/icons/about3-icon2.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="heading1">
                    <h5>
                      <a href="#">{t.icon2Title}</a>
                    </h5>
                    <p>{t.icon2Body}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer locale={locale} copyrightVariant="normal" />
      <SiteScripts hasContactForm={false} />
    </>
  );
}
