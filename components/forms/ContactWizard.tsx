"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactPanelVars, Field, Input, Select, Textarea } from "@/components/forms/fields";
import CallPicker from "@/components/forms/CallPicker";
import { Button } from "@/components/ui/Button";
import { CTA_FROM_KEY, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  CONTACT_EMAIL,
  FORM_ENDPOINTS,
  OPTIONAL_ENDPOINTS,
} from "@/lib/constants";
import { FEATURES } from "@/lib/features";
import { ROUTES, type Locale } from "@/lib/routes";

// Three-step scoping-call request (spec §4.7). Each step is validated before
// advancing; the final step posts to the n8n contact webhook.

type Values = {
  first: string;
  last: string;
  email: string;
  company: string;
  size: string;
  phone: string;
  topic: string;
  source: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  first: "", last: "", email: "", company: "", size: "", phone: "",
  topic: "", source: "", message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const COPY = {
  en: {
    steps: ["About you", "Your company", "Your request"],
    first: "First name", last: "Last name", email: "Work email",
    emailPh: "name@company.com",
    company: "Company", size: "Company size", sizePh: "Select…", phone: "Phone", optional: "(optional)",
    sizes: ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,000+"],
    topic: "I’m reaching out to", topicPh: "Select…",
    topics: ["Book a scoping call", "Discuss a partnership", "Press", "Something else"],
    source: "How did you hear about us?", sourcePh: "Select…",
    sources: ["Referral", "Event or conference", "LinkedIn", "Google search", "Press", "Other"],
    message: "In short", messagePh: "What do you need to solve?",
    next: "Next", back: "Back", send: "Request a scoping call", sending: "Sending…",
    saved: "✓ Saved",
    errFirst: "Tell us your name.", errLast: "Tell us your last name.",
    errEmail: "Enter a valid work email.", errCompany: "Tell us where you work.",
    errSize: "Choose a size.", errTopic: "Choose one.", errMessage: "A sentence or two is enough.",
    network: `We couldn’t send it. Check your connection and try again, or write to ${CONTACT_EMAIL}.`,
    privacy: "We keep what you share at each step only to reply to you.",
    privacyLink: "Privacy policy",
    preferEmail: "Prefer email?", copy: "Copy", copied: "Copied", mail: "Email",
    copyFail: "Select the address to copy it",
    subject: "Nodex · Project enquiry",
    thanksTitle: "Thanks. We’ve got it.",
    thanksText: (email: string) => `We’ll reply to ${email} within one business day.`,
    thanksPick: (email: string) =>
      `Pick a time for the call now, or we’ll reply to ${email} within one business day.`,
    another: "Send another request",
  },
  es: {
    steps: ["Sobre ti", "Tu empresa", "Tu solicitud"],
    first: "Nombre", last: "Apellidos", email: "Email de trabajo",
    emailPh: "nombre@empresa.com",
    company: "Empresa", size: "Tamaño de la empresa", sizePh: "Selecciona…", phone: "Teléfono", optional: "(opcional)",
    sizes: ["1–10", "11–50", "51–200", "201–500", "501–1.000", "1.000+"],
    topic: "Me pongo en contacto para", topicPh: "Selecciona…",
    topics: ["Reservar una llamada de alcance", "Hablar de una colaboración", "Prensa", "Otra cosa"],
    source: "¿Cómo nos conociste?", sourcePh: "Selecciona…",
    sources: ["Recomendación", "Evento o congreso", "LinkedIn", "Búsqueda en Google", "Prensa", "Otro"],
    message: "En breve", messagePh: "¿Qué necesitas resolver?",
    next: "Siguiente", back: "Atrás", send: "Solicitar llamada de alcance", sending: "Enviando…",
    saved: "✓ Guardado",
    errFirst: "Dinos tu nombre.", errLast: "Dinos tus apellidos.",
    errEmail: "Introduce un email de trabajo válido.", errCompany: "Dinos dónde trabajas.",
    errSize: "Elige un tamaño.", errTopic: "Elige una opción.", errMessage: "Con una o dos frases basta.",
    network: `No hemos podido enviarlo. Revisa tu conexión e inténtalo de nuevo, o escribe a ${CONTACT_EMAIL}.`,
    privacy: "Guardamos lo que compartes en cada paso solo para responderte.",
    privacyLink: "Política de privacidad",
    preferEmail: "¿Prefieres email?", copy: "Copiar", copied: "Copiado", mail: "Email",
    copyFail: "Selecciona la dirección para copiarla",
    subject: "Nodex · Consulta de proyecto",
    thanksTitle: "Gracias. Lo tenemos.",
    thanksText: (email: string) => `Te responderemos a ${email} en un día laborable.`,
    thanksPick: (email: string) =>
      `Elige ahora una hora para la llamada, o te responderemos a ${email} en un día laborable.`,
    another: "Enviar otra solicitud",
  },
} as const;

const FORMAT_LABELS: Record<string, string> = {
  "ship-ai": "Ship AI", embed: "Embed", build: "Build", unblock: "Unblock",
  "security-questionnaire": "Security questionnaire",
};

export default function ContactWizard({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const r = ROUTES[locale];
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [netError, setNetError] = useState(false);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const [entry, setEntry] = useState("direct");
  const formRef = useRef<HTMLFormElement>(null);

  // Where the lead came from: a format CTA or the page the CTA sat on.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const format = params.get("format");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (format) {
      setEntry(`format: ${FORMAT_LABELS[format] ?? format}`);
      setV((cur) => ({ ...cur, topic: t.topics[0] }));
    } else {
      // Not from a format: record the page the CTA was clicked on.
      let from = params.get("cta");
      if (!from) {
        try {
          from = sessionStorage.getItem(CTA_FROM_KEY);
        } catch {
          from = null;
        }
      }
      if (from) {
        setEntry(`cta: ${from}`);
        setV((cur) => ({ ...cur, topic: t.topics[0] }));
      }
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [t.topics]);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setV((cur) => ({ ...cur, [key]: e.target.value }));
    setErrors((cur) => (cur[key] ? { ...cur, [key]: undefined } : cur));
  };

  function validate(s: number): Errors {
    const e: Errors = {};
    if (s === 0) {
      if (!v.first.trim()) e.first = t.errFirst;
      if (!v.last.trim()) e.last = t.errLast;
      if (!EMAIL_RE.test(v.email.trim())) e.email = t.errEmail;
    } else if (s === 1) {
      if (!v.company.trim()) e.company = t.errCompany;
      if (!v.size) e.size = t.errSize;
    } else {
      if (!v.topic) e.topic = t.errTopic;
      if (!v.message.trim()) e.message = t.errMessage;
    }
    return e;
  }

  function focusFirstError(e: Errors) {
    const key = Object.keys(e)[0];
    if (key) formRef.current?.querySelector<HTMLElement>(`#c-${key}`)?.focus();
  }

  const payload = () => ({
    name: `${v.first.trim()} ${v.last.trim()}`.trim(),
    first_name: v.first.trim(),
    last_name: v.last.trim(),
    email: v.email.trim(),
    company: v.company.trim(),
    company_size: v.size,
    phone: v.phone.trim(),
    topic: v.topic,
    source: v.source,
    message: v.message.trim(),
    entry,
    locale,
  });

  async function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => focusFirstError(e));
      return;
    }
    track("form_step", { form: "contact", step: step + 1, entry });
    if (OPTIONAL_ENDPOINTS.contactPartial) {
      fetch(OPTIONAL_ENDPOINTS.contactPartial, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload(), step: step + 1, partial: true }),
      }).catch(() => {});
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    setStep((s) => s + 1);
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    if (step < 2) {
      next();
      return;
    }
    const e = validate(2);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => focusFirstError(e));
      return;
    }
    setSending(true);
    setNetError(false);
    try {
      const res = await fetch(FORM_ENDPOINTS.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const json: { status?: string } = res.ok ? await res.json() : {};
      if (json.status !== "ok") throw new Error("bad status");
      track("form_submit", { form: "contact", entry });
      setDone(true);
    } catch {
      setNetError(true);
    } finally {
      setSending(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    setTimeout(() => setCopied("idle"), 1600);
  }

  const showError = (k: keyof Values) => errors[k];
  const canBook = FEATURES.callBooking && Boolean(OPTIONAL_ENDPOINTS.booking);

  return (
    <div
      className={cn(
        "rounded-[20px] bg-panel p-[clamp(20px,calc(var(--cqi)*3),40px)] max-[900px]:border max-[900px]:border-line-strong max-[900px]:bg-card max-[900px]:p-5",
        contactPanelVars,
      )}
    >
      {done ? (
        <div className="py-6 text-center">
          <span className="mx-auto mb-5 flex size-14 animate-[pop_0.4s_cubic-bezier(.2,.7,.2,1.4)] items-center justify-center rounded-full bg-brand text-[26px] text-white min-[901px]:bg-mint min-[901px]:text-void-dark">
            ✓
          </span>
          <h2 className="t-h2s text-ink min-[901px]:text-paper-dark">{t.thanksTitle}</h2>
          <p className="mx-auto mt-3 max-w-[360px] text-[16px] leading-[1.5] text-body min-[901px]:text-mist-dark">
            {canBook ? t.thanksPick(v.email) : t.thanksText(v.email)}
          </p>
          {canBook ? (
            <CallPicker locale={locale} email={v.email} payload={payload()} />
          ) : null}
          {FEATURES.callBooking ? null : (
            <div className="mt-6">
              <Button
                variant="outline"
                size="cta"
                icon={null}
                className="min-[901px]:border-line2-dark min-[901px]:text-paper-dark min-[901px]:before:bg-paper-dark min-[901px]:hover:text-void-dark"
                onClick={() => {
                  setV(EMPTY);
                  setStep(0);
                  setDone(false);
                }}
              >
                {t.another}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} noValidate>
          <div className="mb-6">
            <p className="t-tag text-(--f-text)">
              {step + 1} / 3 · {t.steps[step]}
            </p>
            <div className="mt-3 h-0.5 w-full bg-(--f-border)">
              <i
                className="block h-full bg-(--f-focus) transition-[width] duration-[400ms] ease-brand"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div
            key={step}
            className="grid animate-[step-in_0.35s_cubic-bezier(.2,.7,.2,1)] gap-4"
          >
            {step === 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 max-[299px]:grid-cols-1">
                  <Field label={t.first} htmlFor="c-first" error={showError("first")}>
                    <Input id="c-first" autoComplete="given-name" value={v.first} onChange={set("first")} error={showError("first")} />
                  </Field>
                  <Field label={t.last} htmlFor="c-last" error={showError("last")}>
                    <Input id="c-last" autoComplete="family-name" value={v.last} onChange={set("last")} error={showError("last")} />
                  </Field>
                </div>
                <Field label={t.email} htmlFor="c-email" error={showError("email")}>
                  <Input id="c-email" type="email" autoComplete="email" placeholder={t.emailPh} value={v.email} onChange={set("email")} error={showError("email")} />
                </Field>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <Field label={t.company} htmlFor="c-company" error={showError("company")}>
                  <Input id="c-company" autoComplete="organization" value={v.company} onChange={set("company")} error={showError("company")} />
                </Field>
                <Field label={t.size} htmlFor="c-size" error={showError("size")}>
                  <Select id="c-size" value={v.size} onChange={set("size")} error={showError("size")}>
                    <option value="">{t.sizePh}</option>
                    {t.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <Field label={t.phone} optional={t.optional} htmlFor="c-phone">
                  <Input id="c-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} />
                </Field>
              </>
            ) : null}

            {step === 2 ? (
              <>
                {netError ? (
                  <p role="alert" className="rounded-xl border border-err-line bg-err-bg px-3.5 py-3 text-[14.5px] text-err-text min-[901px]:border-err-dark/30 min-[901px]:bg-err-dark/[0.08] min-[901px]:text-[#ffc2b6]">
                    {t.network}
                  </p>
                ) : null}
                <Field label={t.topic} htmlFor="c-topic" error={showError("topic")}>
                  <Select id="c-topic" value={v.topic} onChange={set("topic")} error={showError("topic")}>
                    <option value="">{t.topicPh}</option>
                    {t.topics.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <Field label={t.source} optional={t.optional} htmlFor="c-source">
                  <Select id="c-source" value={v.source} onChange={set("source")}>
                    <option value="">{t.sourcePh}</option>
                    {t.sources.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <Field label={t.message} htmlFor="c-message" error={showError("message")}>
                  <Textarea id="c-message" rows={4} placeholder={t.messagePh} value={v.message} onChange={set("message")} error={showError("message")} />
                </Field>
              </>
            ) : null}
          </div>

          <div className="mt-6 flex items-center gap-3">
            {step > 0 ? (
              <Button
                variant="outline"
                icon={null}
                onClick={() => setStep((s) => s - 1)}
                className="min-[901px]:border-line2-dark min-[901px]:text-paper-dark min-[901px]:before:bg-paper-dark min-[901px]:hover:text-void-dark"
              >
                ← {t.back}
              </Button>
            ) : null}
            <Button
              type="submit"
              disabled={sending}
              variant="primary"
              className="min-[901px]:bg-paper-dark min-[901px]:text-void-dark min-[901px]:hover:bg-white max-[900px]:hover:bg-[#22343a]"
            >
              {sending ? t.sending : step < 2 ? t.next : t.send}
            </Button>
            <span
              aria-live="polite"
              className={cn(
                "text-[14px] font-medium text-(--f-focus) transition-opacity duration-300",
                saved ? "opacity-100" : "opacity-0",
              )}
            >
              {saved ? t.saved : ""}
            </span>
          </div>

          <p className="mt-5 text-[13px] leading-[1.5] text-body min-[901px]:text-mist-dark">
            {t.privacy}{" "}
            <Link href={r.privacy} className="underline underline-offset-2">
              {t.privacyLink}
            </Link>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-(--f-border) pt-5 text-[14px] text-body min-[901px]:text-mist-dark">
            <span>{t.preferEmail}</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-[13px] text-(--f-text)">
              {CONTACT_EMAIL}
            </a>
            <Button
              size="mini"
              variant="outline"
              icon={null}
              onClick={copyEmail}
              className="min-[901px]:border-line2-dark min-[901px]:text-mist-dark min-[901px]:before:bg-paper-dark min-[901px]:hover:text-void-dark"
            >
              {copied === "ok" ? t.copied : copied === "fail" ? t.copyFail : t.copy}
            </Button>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.subject)}`}
              target="_blank"
              rel="noopener"
              className="inline-flex h-9 items-center rounded-full border border-line-strong px-3.5 text-[13px] font-medium text-body transition-colors hover:border-ink hover:bg-ink hover:text-canvas min-[901px]:border-line2-dark min-[901px]:text-mist-dark min-[901px]:hover:border-paper-dark min-[901px]:hover:bg-paper-dark min-[901px]:hover:text-void-dark"
            >
              {t.mail}
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
