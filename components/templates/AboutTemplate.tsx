import Image from "next/image";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import aboutImg1 from "@/public/assets/img/about/about-img1.png";
import aboutImg2 from "@/public/assets/img/about/about-img2.png";
import aboutIcon1 from "@/public/assets/img/icons/about3-icon1.png";
import aboutIcon2 from "@/public/assets/img/icons/about3-icon2.png";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    h1: "Nosotros",
    homeLink: "Inicio",
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
    homeLink: "Home",
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

// `.about-page-sec1 .conter-box` (the ".counter" figure is static text).
function CounterBox({
  label,
  className,
}: {
  label: ReactNode;
  className: string;
}) {
  return (
    <div className={cn("rounded-[4px] p-8", className)}>
      <h3 className="text-[44px] leading-[54px] font-bold text-white">
        <span>16</span>+
      </h3>
      <p className="text-lg leading-7 font-medium text-white/80">{label}</p>
    </div>
  );
}

// `.image.overlay-anim`: from 768px up, a white veil sweeps down and fades
// out on hover.
const overlayAnimClass =
  "md:relative md:after:pointer-events-none md:after:absolute md:after:top-0 md:after:left-0 md:after:z-9 md:after:h-0 md:after:w-full md:after:bg-white/30 md:after:opacity-100 md:hover:after:h-full md:hover:after:opacity-0 md:hover:after:transition-all md:hover:after:duration-400 md:hover:after:ease-linear";

// `.about-page-sec1 .about3-icon-box`
function IconBox({
  icon,
  title,
  body,
}: {
  icon: typeof aboutIcon1;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <div className="group/icon mt-8 flex items-start">
      <div>
        <div className="h-[70px] w-[70px] rounded-full bg-mint/25 text-center leading-[70px] transition-all duration-400 group-hover/icon:bg-brand">
          <Image
            src={icon}
            alt=""
            className="transition-all duration-400 [filter:brightness(0)_saturate(100%)_invert(32%)_sepia(40%)_saturate(700%)_hue-rotate(118deg)_brightness(85%)] group-hover/icon:[filter:brightness(0)_invert(1)]"
          />
        </div>
      </div>
      <div className="pl-5">
        <h5 className="text-xl leading-[1.2]">
          <a href="#" className={cn(heading.h4Link, "hover:text-brand")}>
            {title}
          </a>
        </h5>
        <p className={cn(heading.p, "pt-3")}>{body}</p>
      </div>
    </div>
  );
}

export default function AboutTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];

  return (
    <>
      <Header locale={locale} />
      <MobileNav locale={locale} />

      <PageHero
        title={t.h1}
        homeHref={ROUTES[locale].home}
        homeLabel={t.homeLink}
        current={t.breadcrumbCurrent}
      />

      <div className="pt-[50px] pb-[50px] md:pb-25 lg:pt-[30px]">
        <Container>
          <div className="-mx-3 flex flex-wrap items-center">
            <div className="w-full shrink-0 px-3 lg:w-1/2">
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full shrink-0 px-3 max-lg:mb-6 lg:w-1/2">
                  <CounterBox
                    label={t.experienceYears}
                    className="mb-[30px] bg-ink"
                  />
                  <div className={overlayAnimClass}>
                    <Image
                      src={aboutImg1}
                      alt=""
                      className="w-full rounded-[4px]"
                    />
                  </div>
                </div>

                <div className="w-full shrink-0 px-3 lg:w-1/2">
                  <div className={overlayAnimClass}>
                    <Image
                      src={aboutImg2}
                      alt=""
                      className="w-full rounded-[4px]"
                    />
                  </div>
                  <CounterBox
                    label={t.experienceYears}
                    className="mt-[30px] bg-brand"
                  />
                </div>
              </div>
            </div>

            <div className="w-full shrink-0 px-3 lg:w-1/2">
              <div className="lg:pl-[30px]">
                <span className={heading.eyebrow}>{t.span}</span>
                <h2 className={heading.h2}>{t.h2}</h2>
                <div className="h-4" />
                <p className={heading.p}>{t.intro}</p>

                <IconBox
                  icon={aboutIcon1}
                  title={t.icon1Title}
                  body={t.icon1Body}
                />
                <IconBox
                  icon={aboutIcon2}
                  title={t.icon2Title}
                  body={t.icon2Body}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer locale={locale} copyrightVariant="normal" />
    </>
  );
}
