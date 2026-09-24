import Link from "next/link";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SiteScripts from "@/components/SiteScripts";
import { FORM_ENDPOINTS } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    heroH1: "Únete a Nuestro Equipo",
    homeLink: "Inicio ",
    breadcrumbCurrent: "Únete a Nuestro Equipo",
    span: "Únete a Nuestro Equipo",
    h2: "Trabaja con Nosotros",
    intro: (
      <>
        Siempre estamos buscando talento técnico. Si prosperas en entornos
        complejos y quieres ser parte de algo ambicioso — envíanos tu CV y te
        tendremos en mente para próximas oportunidades.
      </>
    ),
    h3: "Envía tu Candidatura",
    formIntro: (
      <>
        Cuéntanos un poco sobre ti y adjunta tu CV — te contactaremos cuando
        haya una buena coincidencia.
      </>
    ),
    firstName: "Nombre",
    lastName: "Apellidos",
    email: "Email",
    phone: "Teléfono",
    address: "Ciudad / Ubicación",
    role: "Rol / Especialidad (ej. Desarrollador Backend)",
    message: "Breve presentación (opcional)",
    chooseFile: (
      <>
        <i className="fa-solid fa-paperclip"></i> Elegir Archivo
      </>
    ),
    noFileChosen: "Ningún archivo seleccionado",
    submit: "Enviar Candidatura",
  },
  en: {
    heroH1: "Join Our Team",
    homeLink: "Home ",
    breadcrumbCurrent: "Join Our Team",
    span: "Join Our Team",
    h2: "Work With Us",
    intro: (
      <>
        We&apos;re always looking for technical talent. If you thrive in
        complex environments and want to be part of something ambitious —
        send us your CV and we&apos;ll keep you in mind for upcoming
        opportunities.
      </>
    ),
    h3: "Send Your Application",
    formIntro: (
      <>
        Tell us a bit about yourself and attach your CV — we&apos;ll reach
        out when there&apos;s a good fit.
      </>
    ),
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    address: "City / Location",
    role: "Role / Speciality (e.g. Backend Engineer)",
    message: "Brief introduction (optional)",
    chooseFile: (
      <>
        <i className="fa-solid fa-paperclip"></i> Choose File
      </>
    ),
    noFileChosen: "No file chosen",
    submit: "Send Application",
  },
} as const;

export default function JobApplicationTemplate({
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
            <div className="col-lg-6 m-auto text-center">
              <div className="main-heading">
                <h1>{t.heroH1}</h1>
                <div className="pages-intro">
                  <Link href={routes.home}>{t.homeLink}</Link>
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

                <form
                  action={FORM_ENDPOINTS.careers}
                  method="POST"
                  encType="multipart/form-data"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="text"
                          name="first_name"
                          placeholder={t.firstName}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="text"
                          name="last_name"
                          placeholder={t.lastName}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <input
                          type="email"
                          name="email"
                          placeholder={t.email}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input type="tel" name="phone" placeholder={t.phone} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input
                          type="text"
                          name="address"
                          placeholder={t.address}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <input
                          type="text"
                          name="role"
                          placeholder={t.role}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <textarea
                          name="message"
                          rows={3}
                          placeholder={t.message}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input cv-upload-wrap">
                        <label htmlFor="cv-upload" className="cv-upload-label">
                          <span className="cv-btn">{t.chooseFile}</span>
                          <span className="cv-filename" id="cv-filename">
                            {t.noFileChosen}
                          </span>
                        </label>
                        <input
                          type="file"
                          id="cv-upload"
                          name="cv"
                          accept=".pdf,.doc,.docx"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="button">
                        <button
                          type="submit"
                          title="Submit"
                          className="theme-btn1"
                        >
                          {t.submit}{" "}
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
