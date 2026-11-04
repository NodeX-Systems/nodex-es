# Feature flags

Todas las flags viven en [`lib/features.ts`](lib/features.ts) (objeto `FEATURES`). Está todo construido; lo que está apagado **no se publica**: sin ruta (404), sin entrada de menú, sin entrada en el sitemap y sin enlaces. Cambiar el valor a `true` publica el bloque tal y como está diseñado ("ocultar, no borrar", brief MVP).

Para usar una flag en código: `import { FEATURES } from "@/lib/features"`. Para añadir una, declararla en `lib/features.ts` con un comentario de una línea y añadirla aquí.

## Páginas

Si la flag está apagada la página llama a `notFound()`, desaparece del menú, del pie y de `app/sitemap.ts`, y `scripts/prune-hidden.mjs` borra su carpeta de `out/` tras el build para que el host devuelva un 404 real. Ese script tiene el mapa flag → slug escrito a mano (`pages`): **una flag nueva de página hay que añadirla también allí**.

| Flag | Por defecto | Qué publica | Dónde se usa |
| --- | --- | --- | --- |
| `industries` | `false` | `/industries/` y `/es/industries/` | páginas, `components/site/nav.ts`, `app/sitemap.ts`, `scripts/prune-hidden.mjs` |
| `insights` | `false` | `/insights/` y `/es/insights/`. Apagada, el menú "Insights" apunta a Client stories | páginas, `components/site/nav.ts`, `app/sitemap.ts`, `scripts/prune-hidden.mjs` |
| `news` | `false` | `/news/` y `/es/news/`, y su enlace en el pie y en Insights | páginas, `nav.ts`, `SiteFooter.tsx`, `InsightsTemplate.tsx`, `sitemap.ts`, `prune-hidden.mjs` |
| `partners` | `false` | `/partners/` y `/es/partners/` | páginas, `nav.ts`, `sitemap.ts`, `prune-hidden.mjs` |

## Bloques

| Flag | Por defecto | Qué publica | Dónde se usa |
| --- | --- | --- | --- |
| `clientVideos` | `false` | Home: "Our clients speak for us" | `components/templates/HomeTemplate.tsx` |
| `engineersTeam` | `false` | About: "A senior engineering team" (cifras y caras) | `components/templates/AboutTemplate.tsx` |
| `homeStats` | `true` | Home: cifras. Apagada, queda solo el statement sin números | `components/templates/HomeTemplate.tsx` |
| `onlyApprovedLogos` | `false` | `false` muestra los 16 logos (build provisional); `true` solo los que tienen permiso escrito en `lib/clientLogos.ts` | `components/home/LogoStrip.tsx` |

## Contenido que no debe salir hasta ser real

| Flag | Por defecto | Qué publica | Dónde se usa |
| --- | --- | --- | --- |
| `securityCertifications` | `false` | Fila "Certifications" en Security. Esperar a tener ISO 27001 o ENS | `components/templates/SecurityTemplate.tsx` |
| `clientQuote` | `false` | Citas de cliente en contacto y casos (hoy son placeholders). **Declarada pero aún no leída por ningún componente** | — |
| `formatOnePager` | `false` | "Download the one-pager (PDF)" en Services | `components/templates/ServicesTemplate.tsx` |

## Formularios

| Flag | Por defecto | Qué publica | Dónde se usa |
| --- | --- | --- | --- |
| `callBooking` | `false` | Selector de hora tras el formulario de Contact. Necesita además `OPTIONAL_ENDPOINTS.booking` en `lib/constants.ts` (herramienta de calendario) | `components/forms/ContactWizard.tsx`, `components/forms/CallPicker.tsx` |
| `careersChat` | `false` | Candidatura de `/careers/` y `/es/careers/` como chat (`CareersChat.tsx`). Apagada, se muestra el formulario clásico (`CareersForm.tsx`). Ambos envían los mismos campos al mismo webhook (`components/forms/careers.ts`) | `components/templates/CareersTemplate.tsx` |

## Otros interruptores (fuera de `FEATURES`)

- `OPTIONAL_ENDPOINTS.contactPartial` (`lib/constants.ts`): si se informa, el formulario de Contact guarda el lead tras cada paso.
- `OPTIONAL_ENDPOINTS.booking` (`lib/constants.ts`): endpoint del calendario; solo tiene efecto con `callBooking` encendida.
- `permission` por logo en `lib/clientLogos.ts`: junto con `onlyApprovedLogos` permite retirar un logo concreto.

## Pendiente antes de encender

Ver [`TAREAS_PENDIENTES.md`](TAREAS_PENDIENTES.md). En particular, `careersChat` no debe encenderse hasta validar con legal el consentimiento del chat y el aviso del dictado por voz.
