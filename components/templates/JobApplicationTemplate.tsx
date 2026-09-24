import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import LeadForm from "@/components/forms/LeadForm";
import ContactSection, {
  fieldColClass,
  formRowClass,
  halfFieldColClass,
  inputClass,
  submitColClass,
} from "@/components/pages/ContactSection";
import CvUpload from "@/components/pages/CvUpload";
import { PaperclipIcon } from "@/components/ui/icons";
import PageHero from "@/components/ui/PageHero";
import { FORM_ENDPOINTS } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    heroH1: "Únete a Nuestro Equipo",
    homeLink: "Inicio",
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
        <PaperclipIcon className="text-[15px]" /> Elegir Archivo
      </>
    ),
    noFileChosen: "Ningún archivo seleccionado",
    submit: "Enviar Candidatura",
  },
  en: {
    heroH1: "Join Our Team",
    homeLink: "Home",
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
        <PaperclipIcon className="text-[15px]" /> Choose File
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
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <PageHero
        title={t.heroH1}
        homeHref={routes.home}
        homeLabel={t.homeLink}
        current={t.breadcrumbCurrent}
      />

      <ContactSection
        eyebrow={t.span}
        title={t.h2}
        intro={t.intro}
        formTitle={t.h3}
        formIntro={t.formIntro}
      >
        <LeadForm
          kind="careers"
          endpoint={FORM_ENDPOINTS.careers}
          locale={locale}
          submitLabel={t.submit}
          className={formRowClass}
          submitWrapperClassName={submitColClass}
        >
          <div className={halfFieldColClass}>
            <input
              type="text"
              name="first_name"
              placeholder={t.firstName}
              required
              className={inputClass}
            />
          </div>

          <div className={halfFieldColClass}>
            <input
              type="text"
              name="last_name"
              placeholder={t.lastName}
              required
              className={inputClass}
            />
          </div>

          <div className={fieldColClass}>
            <input
              type="email"
              name="email"
              placeholder={t.email}
              required
              className={inputClass}
            />
          </div>

          <div className={halfFieldColClass}>
            <input
              type="tel"
              name="phone"
              placeholder={t.phone}
              className={inputClass}
            />
          </div>

          <div className={halfFieldColClass}>
            <input
              type="text"
              name="address"
              placeholder={t.address}
              className={inputClass}
            />
          </div>

          <div className={fieldColClass}>
            <input
              type="text"
              name="role"
              placeholder={t.role}
              className={inputClass}
            />
          </div>

          <div className={fieldColClass}>
            <textarea
              name="message"
              rows={3}
              placeholder={t.message}
              className={inputClass}
            ></textarea>
          </div>

          <div className={fieldColClass}>
            <CvUpload chooseLabel={t.chooseFile} noFileLabel={t.noFileChosen} />
          </div>
        </LeadForm>
      </ContactSection>

      <Footer locale={locale} copyrightVariant="normal" />
    </>
  );
}
