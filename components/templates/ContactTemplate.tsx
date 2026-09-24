import Link from "next/link";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import SiteScripts from "@/components/SiteScripts";
import { FORM_ENDPOINTS } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    h1: "Contáctanos",
    homeLabel: "Inicio ",
    breadcrumbCurrent: "Contacto",
    span: "Contáctanos",
    h2: "Ponte en Contacto. Empecemos a Construir.",
    intro:
      "Si necesitas acelerar el desarrollo, desbloquear un proyecto o reforzar tu equipo con perfiles senior, estamos listos para integrarnos y empezar a ejecutar contigo.",
    h3: "Envíanos un Mensaje",
    formIntro:
      "No dudes en contactarnos con cualquier pregunta o consulta. Nuestro equipo está aquí para ayudarte.",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Email",
    phonePlaceholder: "Teléfono",
    messagePlaceholder: "Mensaje",
    submitLabel: "Enviar",
  },
  en: {
    h1: "Contact Us",
    homeLabel: "Home ",
    breadcrumbCurrent: "Contact",
    span: "Contact Us",
    h2: "Get in Touch. Let's Start Building.",
    intro:
      "If you need to accelerate development, unblock a project, or reinforce your team with senior profiles, we're ready to embed and start executing with you.",
    h3: "Send us a Message",
    formIntro:
      "Feel free to reach out to us with any questions or inquiries you may have. Our experienced team is here to assist you.",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone",
    messagePlaceholder: "Message",
    submitLabel: "Submit Now",
  },
} as const;

export default function ContactTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];

  return (
    <>
      <Header locale={locale} />
      <MobileNav locale={locale} />

      {/* HERO AREA */}
      <div className="common-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto text-center">
              <div className="main-heading">
                <h1>{t.h1}</h1>
                <div className="pages-intro">
                  <Link href={ROUTES[locale].home}>{t.homeLabel}</Link>
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

      {/* CONTACT AREA */}
      <div className="contact-page sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 align-self-start">
              <div className="heading1">
                <span className="span">{t.span}</span>
                <h2>{t.h2}</h2>
                <div className="space16"></div>
                <p>{t.intro}</p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact1-form">
                <div className="heading1">
                  <h3>{t.h3}</h3>
                  <div className="space16"></div>
                  <p>{t.formIntro}</p>
                </div>
                <div className="space10"></div>

                <form action={FORM_ENDPOINTS.contact} method="POST">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-input">
                        <input
                          type="text"
                          name="name"
                          placeholder={t.namePlaceholder}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="email"
                          name="email"
                          placeholder={t.emailPlaceholder}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="number"
                          name="phone"
                          placeholder={t.phonePlaceholder}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <textarea
                          name="message"
                          rows={4}
                          placeholder={t.messagePlaceholder}
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
                          {t.submitLabel}{" "}
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

      <Footer locale={locale} copyrightVariant="normal" />
      <SiteScripts hasContactForm={true} />
    </>
  );
}
