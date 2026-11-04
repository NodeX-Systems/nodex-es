"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { AREAS, buildCareersBody, EMAIL_RE, submitCareers, type Profile } from "@/components/forms/careers";
import FormPopup, { type PopupState } from "@/components/forms/FormPopup";
import { Field, Input, lightFormVars, Select, Textarea } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CONTACT_EMAIL } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

// Job application as a plain form (profile -> area -> a few questions -> an
// optional CV). Posts multipart FormData to the careers webhook; `role`,
// `address` and `message` keep the shape the existing n8n flow expects.

const COPY = {
  en: {
    hi: "Hi.",
    which: "Which of these describes your profile?",
    meta: "A few questions · about 10 min · a person replies by email",
    technical: "Technical", nontechnical: "Non-technical",
    area: "Area", areaPh: "Select…",
    first: "First name", last: "Last name", email: "Email",
    about: "One sentence about you",
    link: { technical: "LinkedIn, GitHub or portfolio", nontechnical: "LinkedIn or portfolio" },
    proud: "Something you’re proud of",
    where: "Where are you based?",
    extra: "Anything else", optional: "(optional)",
    cv: "Attach a CV", cvHint: "PDF · DOC", noFile: "No file chosen",
    consent: "I agree that Nodex keeps this application to consider me for a role.",
    privacy: "Privacy policy",
    delete: `You can ask us to delete it at any time: write to ${CONTACT_EMAIL}.`,
    send: "Send application", sending: "Sending…", close: "Close",
    required: "Required.", emailBad: "That email doesn’t look right. Check it, like name@domain.com.",
    consentNeeded: "Tick the box to send your application.",
    okTitle: "Application received.",
    okMsg: "Thanks. Someone from the team will read it and reply to you by email.",
    failTitle: "Something went wrong",
    failMsg: `Please try again or email us directly at ${CONTACT_EMAIL}.`,
  },
  es: {
    hi: "Hola.",
    which: "¿Cuál de estas opciones describe tu perfil?",
    meta: "Unas pocas preguntas · unos 10 min · una persona responde por email",
    technical: "Técnico", nontechnical: "No técnico",
    area: "Área", areaPh: "Selecciona…",
    first: "Nombre", last: "Apellidos", email: "Email",
    about: "Una frase sobre ti",
    link: { technical: "LinkedIn, GitHub o portfolio", nontechnical: "LinkedIn o portfolio" },
    proud: "Algo de lo que estés orgulloso",
    where: "¿Dónde vives?",
    extra: "Algo más", optional: "(opcional)",
    cv: "Adjuntar un CV", cvHint: "PDF · DOC", noFile: "Ningún archivo",
    consent: "Acepto que Nodex conserve esta candidatura para considerarme para un puesto.",
    privacy: "Política de privacidad",
    delete: `Puedes pedirnos que la borremos cuando quieras: escribe a ${CONTACT_EMAIL}.`,
    send: "Enviar candidatura", sending: "Enviando…", close: "Cerrar",
    required: "Obligatorio.", emailBad: "Ese email no parece correcto. Revísalo, por ejemplo nombre@dominio.com.",
    consentNeeded: "Marca la casilla para enviar tu candidatura.",
    okTitle: "Candidatura recibida.",
    okMsg: "Gracias. Alguien del equipo la leerá y te responderá por email.",
    failTitle: "Algo ha ido mal",
    failMsg: `Inténtalo de nuevo o escríbenos directamente a ${CONTACT_EMAIL}.`,
  },
} as const;

export default function CareersForm({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const r = ROUTES[locale];
  const [profile, setProfile] = useState<Profile>("technical");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const closePopup = useCallback(() => setPopup(null), []);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const e: Record<string, string> = {};
    for (const k of ["first_name", "last_name", "area", "about", "link", "proud", "address"]) {
      if (!get(k)) e[k] = t.required;
    }
    if (!EMAIL_RE.test(get("email"))) e.email = t.emailBad;
    if (!data.get("consent")) e.consent = t.consentNeeded;
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      form.querySelector<HTMLElement>(`#j-${first}`)?.focus();
      return;
    }

    const cv = data.get("cv");
    const body = buildCareersBody({
      firstName: get("first_name"),
      lastName: get("last_name"),
      email: get("email"),
      address: get("address"),
      profile,
      area: get("area"),
      about: get("about"),
      link: get("link"),
      proud: get("proud"),
      extra: get("extra"),
      cv: cv instanceof File ? cv : null,
    });

    setSending(true);
    const result = await submitCareers(body);
    if (result.ok) {
      setPopup({ type: "ok", title: t.okTitle, message: t.okMsg });
      form.reset();
      setFileName(null);
    } else {
      setPopup({ type: "fail", title: t.failTitle, message: result.error || t.failMsg });
    }
    setSending(false);
  }

  const areas = AREAS[profile][locale];

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className={cn("grid gap-5", lightFormVars)}
      >
        <div>
          <p className="text-[19px] text-ink">
            {t.hi} <b className="font-semibold">{t.which}</b>
          </p>
          <p className="t-tag mt-2 text-body">{t.meta}</p>
          <div role="radiogroup" aria-label={t.which} className="mt-4 flex flex-wrap gap-2">
            {(["technical", "nontechnical"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={profile === p}
                onClick={() => setProfile(p)}
                className={cn(
                  "h-11 rounded-full border px-[18px] text-[15px] font-medium transition-colors duration-200",
                  profile === p
                    ? "border-ink bg-ink text-canvas"
                    : "border-line-strong text-ink hover:border-ink",
                )}
              >
                {t[p]}
              </button>
            ))}
          </div>
        </div>

        <Field label={t.area} htmlFor="j-area" error={errors.area}>
          <Select id="j-area" name="area" defaultValue="" error={errors.area} key={profile}>
            <option value="">{t.areaPh}</option>
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </Select>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.first} htmlFor="j-first_name" error={errors.first_name}>
            <Input id="j-first_name" name="first_name" autoComplete="given-name" error={errors.first_name} />
          </Field>
          <Field label={t.last} htmlFor="j-last_name" error={errors.last_name}>
            <Input id="j-last_name" name="last_name" autoComplete="family-name" error={errors.last_name} />
          </Field>
        </div>
        <Field label={t.email} htmlFor="j-email" error={errors.email}>
          <Input id="j-email" name="email" type="email" autoComplete="email" error={errors.email} />
        </Field>
        <Field label={t.about} htmlFor="j-about" error={errors.about}>
          <Input id="j-about" name="about" error={errors.about} />
        </Field>
        <Field label={t.link[profile]} htmlFor="j-link" error={errors.link}>
          <Input id="j-link" name="link" type="url" inputMode="url" placeholder="https://" error={errors.link} />
        </Field>
        <Field label={t.proud} htmlFor="j-proud" error={errors.proud}>
          <Textarea id="j-proud" name="proud" rows={3} error={errors.proud} />
        </Field>
        <Field label={t.where} htmlFor="j-address" error={errors.address}>
          <Input id="j-address" name="address" autoComplete="address-level2" error={errors.address} />
        </Field>
        <Field label={t.extra} optional={t.optional} htmlFor="j-extra">
          <Textarea id="j-extra" name="extra" rows={3} />
        </Field>

        <div>
          <p className="mb-1.5 text-[14px] font-medium text-ink">
            {t.cv} <span className="font-normal text-faint">{t.optional}</span>
          </p>
          <label
            htmlFor="j-cv"
            className="flex h-12 cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-line-strong px-[14px] text-[15px] text-body transition-colors hover:border-brand"
          >
            <span className="shrink-0 rounded-full border border-line-strong px-3 py-1 text-[13px] font-medium text-ink">
              {t.cvHint}
            </span>
            <span className="min-w-0 truncate">{fileName ?? t.noFile}</span>
          </label>
          <input
            id="j-cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? null)}
          />
        </div>

        <div>
          <label className="flex items-start gap-3 text-[14px] leading-[1.5] text-body">
            <input
              id="j-consent"
              name="consent"
              type="checkbox"
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 size-[18px] shrink-0 accent-brand"
            />
            <span>
              {t.consent}{" "}
              <Link href={r.privacy} className="text-ink underline underline-offset-2">
                {t.privacy}
              </Link>
            </span>
          </label>
          {errors.consent ? (
            <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-err">
              {errors.consent}
            </p>
          ) : null}
          <p className="mt-2 pl-[30px] text-[13px] text-faint">{t.delete}</p>
        </div>

        <div>
          <Button type="submit" disabled={sending}>
            {sending ? t.sending : t.send}
          </Button>
        </div>
      </form>
      <FormPopup popup={popup} closeLabel={t.close} onClose={closePopup} />
    </>
  );
}
