"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useCallback, useState, type FormEvent, type ReactNode } from "react";
import FormPopup, { type PopupState } from "@/components/forms/FormPopup";
import { Button } from "@/components/ui/Button";
import { SpinnerIcon } from "@/components/ui/icons";
import { CONTACT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/lib/routes";

// Submits one of the two n8n webhooks with fetch and reports the result in a
// popup (replaces contact-form.js):
//   kind="contact" -> JSON { name, email, phone, message }
//   kind="careers" -> multipart/form-data (includes the CV file)
// The endpoint answers { status: "ok" } on success.
//
// Render the fields as children; the submit button is rendered after them,
// wrapped in a div with `submitWrapperClassName`.

const MESSAGES = {
  es: {
    sending: "Enviando…",
    close: "Cerrar",
    okTitle: { contact: "¡Mensaje enviado!", careers: "¡Candidatura enviada!" },
    okMsg: {
      contact: "Gracias por escribirnos, te responderemos en breve.",
      careers:
        "Gracias por tu interés, te contactaremos si encaja con lo que buscamos.",
    },
    failTitle: "Algo ha ido mal",
    failMsg: `Inténtalo de nuevo o escríbenos directamente a ${CONTACT_EMAIL}.`,
    connTitle: "Error de conexión",
    connMsg: `No hemos podido contactar con el servidor. Inténtalo de nuevo o escríbenos directamente a ${CONTACT_EMAIL}.`,
    serverError: (status: number) => `El servidor respondió ${status}`,
  },
  en: {
    sending: "Sending…",
    close: "Close",
    okTitle: { contact: "Message sent!", careers: "Application sent!" },
    okMsg: {
      contact: "Thanks for reaching out — we’ll get back to you shortly.",
      careers:
        "Thanks for your interest — we’ll be in touch if there’s a good fit.",
    },
    failTitle: "Something went wrong",
    failMsg: `Please try again or email us directly at ${CONTACT_EMAIL}.`,
    connTitle: "Connection error",
    connMsg: `Could not reach the server. Please try again or email us directly at ${CONTACT_EMAIL}.`,
    serverError: (status: number) => `Server returned ${status}`,
  },
} as const;

export default function LeadForm({
  endpoint,
  kind,
  locale,
  submitLabel,
  className,
  submitWrapperClassName,
  children,
}: {
  endpoint: string;
  kind: "contact" | "careers";
  locale: Locale;
  submitLabel: ReactNode;
  className?: string;
  submitWrapperClassName?: string;
  children: ReactNode;
}) {
  const t = MESSAGES[locale];
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);
  const closePopup = useCallback(() => setPopup(null), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "");

    setSending(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        ...(kind === "careers"
          ? { body: data }
          : {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: field("name"),
                email: field("email"),
                phone: field("phone"),
                message: field("message"),
              }),
            }),
      });
      const json: { status?: string; error?: string } = res.ok
        ? await res.json()
        : { status: "fail", error: t.serverError(res.status) };

      if (json.status === "ok") {
        sendGAEvent(
          "event",
          kind === "careers" ? "job_application_sent" : "contact_form_sent",
        );
        setPopup({ type: "ok", title: t.okTitle[kind], message: t.okMsg[kind] });
        form.reset();
      } else {
        setPopup({
          type: "fail",
          title: t.failTitle,
          message: json.error || t.failMsg,
        });
      }
    } catch {
      setPopup({ type: "fail", title: t.connTitle, message: t.connMsg });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <form
        action={endpoint}
        method="POST"
        encType={kind === "careers" ? "multipart/form-data" : undefined}
        onSubmit={handleSubmit}
        className={className}
      >
        {children}
        <div className={submitWrapperClassName}>
          <Button
            type="submit"
            title="Submit"
            disabled={sending}
            icon={sending ? <SpinnerIcon className="animate-spin" /> : undefined}
          >
            {sending ? t.sending : submitLabel}
          </Button>
        </div>
      </form>
      <FormPopup popup={popup} closeLabel={t.close} onClose={closePopup} />
    </>
  );
}
