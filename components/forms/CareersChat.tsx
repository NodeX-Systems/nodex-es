"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  AREAS,
  buildCareersBody,
  EMAIL_RE,
  FILE_ACCEPT,
  fileProblem,
  submitCareers,
  type Profile,
} from "@/components/forms/careers";
import FormPopup, { type PopupState } from "@/components/forms/FormPopup";
import { dictationSupported, useDictation, type DictationError } from "@/components/forms/useDictation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CONTACT_EMAIL } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

// Job application as a chat (spec doc 19 §4.8, animations §3.3): one question
// at a time, fixed questions in a fixed order. Profile and area are buttons (or
// typed), the rest is free text; the email is validated; a summary with an
// "Edit" per answer comes before sending. It posts exactly the same fields as
// the classic CareersForm (see components/forms/careers.ts). The last question
// also takes one optional file (CV, cover letter...) through a paperclip, sent
// as the same single `cv` field. The back arrow returns to the previous
// question with its answer pre-filled; later answers are kept.

type Step =
  | "profile" | "area" | "name" | "sentence" | "email" | "link" | "proud" | "place"
  | "extra" | "summary" | "sent";
type TextKey = "name" | "sentence" | "email" | "link" | "proud" | "place" | "extra";

const TEXT_ORDER: TextKey[] = ["name", "sentence", "email", "link", "proud", "place", "extra"];
const FLOW: Step[] = ["profile", "area", ...TEXT_ORDER, "summary", "sent"];
const isTextStep = (s: Step) => s !== "summary" && s !== "sent";
const isTextKey = (s: Step): s is TextKey => (TEXT_ORDER as readonly string[]).includes(s);

const kb = (n: number) =>
  n >= 1048576 ? `${(n / 1048576).toFixed(1).replace(".0", "")} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

type Answers = {
  profile: Profile | null;
  area: string;
  name: string;
  sentence: string;
  email: string;
  link: string;
  proud: string;
  place: string;
  extra: string;
  cv: File | null;
};
type AnswerKey = keyof Answers;

const EMPTY: Answers = {
  profile: null, area: "", name: "", sentence: "", email: "", link: "",
  proud: "", place: "", extra: "", cv: null,
};

type Ctx = { who: string; profile: Profile };
type Q = { kind: "q"; step: Step; who: string; profile: Profile; typing: boolean };
type A = { kind: "a"; text: string };
type F = { kind: "f"; name: string; size: string };
type NewItem = Q | A | F;
type Item = NewItem & { id: number };
type Meta = { kind: "error" | "info"; text: string } | null;

const b = (s: string) => <b className="font-semibold">{s}</b>;
const nm = (s: string) => <b translate="no" className="font-semibold">{s}</b>;

const COPY = {
  en: {
    technical: "Technical", nontechnical: "Non-technical",
    meta: "A few questions · about 10 min · a person replies by email",
    q: {
      profile: () => <>Hi. {b("Which of these describes your profile?")}</>,
      area: () => <>Perfect. One quick thing so the team can place you: {b("which area is closest to what you do?")}</>,
      name: () => <>Got it. Let’s start easy. {b("What’s your full name?")}</>,
      sentence: (c: Ctx) => <>Thanks, {nm(c.who)}. {b("In one sentence, how would you describe yourself professionally?")}</>,
      email: () => <>Noted. {b("What’s your email?")} It’s how we get back to you, so we need it to keep going.</>,
      link: (c: Ctx) =>
        c.profile === "technical"
          ? <>{b("Where can we see your work?")} LinkedIn, GitHub or a portfolio.</>
          : b("Your LinkedIn, or a link to your work."),
      proud: (c: Ctx) =>
        c.profile === "technical"
          ? <>{b("Tell us about something you put in production that you’re proud of.")} What was your part?</>
          : <>{b("Tell us about a result you’re proud of.")} What was your part?</>,
      place: () => <>{b("Where are you based?")} City and time zone is enough.</>,
      extra: () => <>Last one, optional. {b("Anything else we should know?")} Write it here or attach your CV, a cover letter or any relevant file.</>,
      summary: () => <>That’s everything. {b("Check your answers before sending.")}</>,
      sent: () => null,
    },
    labels: {
      profile: "Profile", area: "Area", name: "Name", sentence: "In one sentence",
      email: "Email", link: "Link", proud: "Proud of", place: "Based in",
      extra: "Anything else", cv: "CV",
    },
    edit: "Edit", skip: "Skip", send: "Send application", sending: "Sending…", again: "Start again",
    nothingElse: "Nothing else",
    attach: "Attach a file (PDF, Word, PowerPoint, PNG or JPG, 10 MB)", removeFile: "Remove file",
    fileType: "Upload a PDF, Word, PowerPoint, PNG or JPG file.",
    fileSize: "That file is over 10 MB. Try a smaller one.",
    fileEmpty: "That file is empty. Pick another one.",
    back: "Back to the previous question", backTitle: "Previous question",
    phPick: "Type or pick above", phAnswer: "Type your answer", phExtra: "Write or attach",
    phEdit: "Type your new answer",
    yourAnswer: "Your answer", sendAnswer: "Send answer", dictate: "Dictate your answer",
    dictateTitle: "Dictate your answer. Uses your browser’s speech service.",
    progress: "Application progress",
    consent: "I agree that Nodex keeps this conversation and any file I attach to consider me for a role.",
    consentKept: "This conversation and any file you attach are kept to consider you for a role at Nodex.",
    privacy: "Privacy policy", deleteIt: "Delete it",
    deleted: `Deleted from this browser. Already sent it? Write to ${CONTACT_EMAIL} and we’ll delete it.`,
    consentStart: "Tick the box below to start.",
    chooseProfile: "Choose Technical or Non-technical.",
    emailBad: "That email doesn’t look right. Check it, like name@domain.com.",
    micInfo: "Dictation uses your browser’s speech service (Google in Chrome). Nodex only receives the text.",
    mic: {
      unsupported: "Voice dictation isn’t available in this browser. Type your answer instead.",
      blocked: "Microphone access is blocked here. Type your answer instead.",
      nospeech: "Couldn’t hear that. Try again or type your answer.",
    },
    okTitle: "Application received.",
    okMsg: (name: string, email: string) => (
      <>
        Thanks, <span translate="no">{name}</span>. Someone from the team will read it and reply to{" "}
        <b className="font-semibold text-ink">{email}</b>.
      </>
    ),
    team: "Meet the team",
    failTitle: "Something went wrong",
    failMsg: `Please try again or email us directly at ${CONTACT_EMAIL}.`,
    close: "Close",
    dictLang: "Dictation language",
  },
  es: {
    technical: "Técnico", nontechnical: "No técnico",
    meta: "Unas pocas preguntas · unos 10 min · una persona responde por email",
    q: {
      profile: () => <>Hola. {b("¿Cuál de estas opciones describe tu perfil?")}</>,
      area: () => <>Perfecto. Una cosa rápida para que el equipo sepa dónde ubicarte: {b("¿qué área se acerca más a lo que haces?")}</>,
      name: () => <>Entendido. Empecemos fácil. {b("¿Cómo te llamas? Nombre completo.")}</>,
      sentence: (c: Ctx) => <>Gracias, {nm(c.who)}. {b("En una frase, ¿cómo te describirías profesionalmente?")}</>,
      email: () => <>Anotado. {b("¿Cuál es tu email?")} Es como te respondemos, así que lo necesitamos para seguir.</>,
      link: (c: Ctx) =>
        c.profile === "technical"
          ? <>{b("¿Dónde podemos ver tu trabajo?")} LinkedIn, GitHub o un portfolio.</>
          : b("Tu LinkedIn o un enlace a tu trabajo."),
      proud: (c: Ctx) =>
        c.profile === "technical"
          ? <>{b("Cuéntanos algo que hayas puesto en producción y de lo que estés orgulloso.")} ¿Cuál fue tu parte?</>
          : <>{b("Cuéntanos un resultado del que estés orgulloso.")} ¿Cuál fue tu parte?</>,
      place: () => <>{b("¿Dónde vives?")} Con la ciudad y la zona horaria basta.</>,
      extra: () => <>La última, opcional. {b("¿Algo más que debamos saber?")} Escríbelo aquí o adjunta tu CV, una carta de presentación o cualquier archivo relevante.</>,
      summary: () => <>Esto es todo. {b("Revisa tus respuestas antes de enviar.")}</>,
      sent: () => null,
    },
    labels: {
      profile: "Perfil", area: "Área", name: "Nombre", sentence: "En una frase",
      email: "Email", link: "Enlace", proud: "Orgulloso de", place: "Ubicación",
      extra: "Algo más", cv: "CV",
    },
    edit: "Editar", skip: "Saltar", send: "Enviar candidatura", sending: "Enviando…", again: "Empezar de nuevo",
    nothingElse: "Nada más",
    attach: "Adjuntar un archivo (PDF, Word, PowerPoint, PNG o JPG, 10 MB)", removeFile: "Quitar archivo",
    fileType: "Sube un archivo PDF, Word, PowerPoint, PNG o JPG.",
    fileSize: "Ese archivo pesa más de 10 MB. Prueba con uno más pequeño.",
    fileEmpty: "Ese archivo está vacío. Elige otro.",
    back: "Volver a la pregunta anterior", backTitle: "Pregunta anterior",
    phPick: "Escribe o elige arriba", phAnswer: "Escribe tu respuesta", phExtra: "Escribe o adjunta",
    phEdit: "Escribe tu nueva respuesta",
    yourAnswer: "Tu respuesta", sendAnswer: "Enviar respuesta", dictate: "Dictar tu respuesta",
    dictateTitle: "Dicta tu respuesta. Usa el servicio de voz de tu navegador.",
    progress: "Progreso de la candidatura",
    consent: "Acepto que Nodex conserve esta conversación y cualquier archivo que adjunte para considerarme para un puesto.",
    consentKept: "Esta conversación y cualquier archivo que adjuntes se conservan para considerarte para un puesto en Nodex.",
    privacy: "Política de privacidad", deleteIt: "Bórrala",
    deleted: `Borrada de este navegador. ¿Ya la enviaste? Escribe a ${CONTACT_EMAIL} y la borramos.`,
    consentStart: "Marca la casilla de abajo para empezar.",
    chooseProfile: "Elige Técnico o No técnico.",
    emailBad: "Ese email no parece correcto. Revísalo, por ejemplo nombre@dominio.com.",
    micInfo: "El dictado usa el servicio de voz de tu navegador (Google en Chrome). Nodex solo recibe el texto.",
    mic: {
      unsupported: "El dictado por voz no está disponible en este navegador. Escribe tu respuesta.",
      blocked: "El acceso al micrófono está bloqueado. Escribe tu respuesta.",
      nospeech: "No te he oído. Inténtalo de nuevo o escribe tu respuesta.",
    },
    okTitle: "Candidatura recibida.",
    okMsg: (name: string, email: string) => (
      <>
        Gracias, <span translate="no">{name}</span>. Alguien del equipo la leerá y te responderá a{" "}
        <b className="font-semibold text-ink">{email}</b>.
      </>
    ),
    team: "Conoce al equipo",
    failTitle: "Algo ha ido mal",
    failMsg: `Inténtalo de nuevo o escríbenos directamente a ${CONTACT_EMAIL}.`,
    close: "Cerrar",
    dictLang: "Idioma del dictado",
  },
} as const;

// The Web Speech API cannot detect the language, so it is chosen by the person
// (defaulting to the page language) and passed to the recognizer.
const DICT_LANGS = { en: { code: "en-US", label: "English" }, es: { code: "es-ES", label: "Español" } } as const;
// Speech support is only known in the browser (false on the server render).
const noSubscribe = () => () => {};

const pill =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-[18px] text-[15px] font-medium text-ink transition-[background-color,color,border-color,transform] duration-200 hover:border-ink hover:bg-ink hover:text-canvas active:scale-[0.96]";

function ClipIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M21 11.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l7.9-7.9" />
    </svg>
  );
}

function FileChip({
  name, size, onRemove, removeLabel, className,
}: {
  name: string; size?: string; onRemove?: () => void; removeLabel?: string; className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-xl border border-line-strong bg-card py-1.5 pr-3 pl-3 text-[14px] text-ink",
        onRemove && "pr-1.5",
        className,
      )}
    >
      <ClipIcon className="size-4 shrink-0 text-brand" />
      <span translate="no" className="min-w-0 truncate">{name}</span>
      {size ? <small className="shrink-0 text-body">{size}</small> : null}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          // 44px target; the negative margins keep the chip as tall as before.
          className="-my-2 grid size-11 shrink-0 place-items-center rounded-lg text-[18px] leading-none text-body hover:bg-line hover:text-ink"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}

// Round icon buttons in the answer box; they shrink to 38px on narrow screens
// so back, clip, mic and send still leave room to type.
const iconBtn =
  "grid size-11 shrink-0 place-items-center rounded-[14px] border transition-[background-color,border-color,transform] duration-200 active:scale-[0.94] max-[520px]:size-[38px]";

export default function CareersChat({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const r = ROUTES[locale];

  const [log, setLog] = useState<Item[]>([
    { id: 0, kind: "q", step: "profile", who: "", profile: "technical", typing: false },
  ]);
  const [epoch, setEpoch] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [step, setStep] = useState<Step>("profile");
  const [editing, setEditing] = useState<TextKey | null>(null);
  // The file as it was when an edit started, so Back can cancel the edit
  // without keeping a file that was attached or removed meanwhile.
  const cvBeforeEdit = useRef<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [text, setText] = useState("");
  const [meta, setMeta] = useState<Meta>(null);
  const [micInfo, setMicInfo] = useState(false);
  const [dictLang, setDictLang] = useState<Locale>(locale);
  const canDictate = useSyncExternalStore(noSubscribe, dictationSupported, () => false);
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const threadRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const attRef = useRef<HTMLButtonElement>(null);
  // Nothing scrolls or takes focus until the person has answered something, so
  // opening the page never pops the keyboard or moves the viewport.
  const started = useRef(false);
  const dictation = useDictation();
  const closePopup = useCallback(() => setPopup(null), []);

  const push = (items: NewItem[]) =>
    setLog((l) => [...l, ...items.map((it, i) => ({ ...it, id: l.length + i }) as Item)]);
  const question = (s: Step, a: Answers, typing = true): Q => ({
    kind: "q", step: s, who: a.name, profile: a.profile ?? "technical", typing,
  });

  function reset(notice?: string) {
    dictation.cancel();
    started.current = false;
    setEpoch((e) => e + 1);
    setLog([{ id: 0, kind: "q", step: "profile", who: "", profile: "technical", typing: false }]);
    setAnswers(EMPTY);
    setStep("profile");
    setEditing(null);
    setConsent(false);
    setDictLang(locale);
    setMicInfo(false);
    setText("");
    setMeta(notice ? { kind: "info", text: notice } : null);
    threadRef.current?.scrollTo({ top: 0 });
  }

  // Stores an answer, shows it, and moves to the next question (or, when an
  // answer is being edited, straight back to the summary).
  function accept<K extends Exclude<Step, "summary" | "sent">>(
    k: K,
    value: Answers[K],
    display: string,
    more: NewItem[] = [],
  ) {
    const a: Answers = { ...answers, [k]: value };
    // A different profile means a different list of areas.
    if (k === "profile" && answers.profile && answers.profile !== value) a.area = "";
    dictation.cancel();
    started.current = true;
    setAnswers(a);
    setMeta(null);
    const items: NewItem[] = display ? [{ kind: "a", text: display }, ...more] : [...more];
    if (editing) {
      setEditing(null);
      setStep("summary");
      setText("");
    } else {
      const next = FLOW[FLOW.indexOf(k) + 1];
      if (next !== "summary") items.push(question(next, a));
      setStep(next);
      // After going back, a question that was already answered comes pre-filled.
      setText(isTextKey(next) ? a[next] : "");
    }
    push(items);
  }

  // Back arrow: rebuilds the thread up to the previous question with its answer
  // in the box. Nothing already answered is discarded.
  function rebuild(target: Step) {
    const upTo = FLOW.indexOf(target);
    const shown = (k: Step) =>
      k === "profile" ? (answers.profile ? t[answers.profile] : "") : isTextKey(k) ? answers[k] : answers.area;
    const items: Item[] = [];
    FLOW.slice(0, upTo + 1).forEach((k, i) => {
      items.push({
        id: items.length, kind: "q", step: k, who: answers.name,
        profile: answers.profile ?? "technical", typing: false,
      });
      if (i < upTo) items.push({ id: items.length, kind: "a", text: shown(k) });
    });
    setLog(items);
    setStep(target);
    setText(isTextKey(target) ? answers[target] : "");
    setMeta(null);
  }

  function goBack() {
    dictation.cancel();
    started.current = true;
    setMeta(null);
    if (editing) {
      setAnswers((a) => ({ ...a, cv: cvBeforeEdit.current }));
      setEditing(null);
      setStep("summary");
      setText("");
      setLog((l) => (l[l.length - 1]?.kind === "q" ? l.slice(0, -1) : l));
      return;
    }
    const i = FLOW.indexOf(step);
    if (i >= 1) rebuild(FLOW[i - 1]);
  }

  // No focus is moved here: on a phone it would open the keyboard over the new
  // chip and the send button, and a file alone is enough to send.
  function pickFile(f: File | undefined) {
    if (!f) return;
    const problem = fileProblem(f);
    if (problem) {
      const text = { type: t.fileType, size: t.fileSize, empty: t.fileEmpty }[problem];
      return setMeta({ kind: "error", text });
    }
    setAnswers((a) => ({ ...a, cv: f }));
    setMeta(null);
  }

  function removeFile() {
    setAnswers((a) => ({ ...a, cv: null }));
    attRef.current?.focus({ preventScroll: true });
  }

  function pickProfile(p: Profile) {
    if (!consent) return setMeta({ kind: "error", text: t.consentStart });
    accept("profile", p, t[p]);
  }

  function matchProfile(v: string): Profile | null {
    const low = v.toLowerCase();
    for (const p of ["technical", "nontechnical"] as const) {
      const label = t[p].toLowerCase();
      if (label === low || (low.length > 2 && label.startsWith(low))) return p;
    }
    if (/non|no t/i.test(v)) return "nontechnical";
    if (/tech|t[eé]cn/i.test(v)) return "technical";
    return null;
  }

  function submitText() {
    const v = text.trim();
    if (!isTextStep(step) || !(v || (step === "extra" && answers.cv))) return;
    dictation.cancel();
    if (step === "extra") {
      const f = answers.cv;
      return accept(
        "extra", v, v || (f ? "" : t.nothingElse),
        f ? [{ kind: "f", name: f.name, size: kb(f.size) }] : [],
      );
    }
    if (step === "profile") {
      if (!consent) return setMeta({ kind: "error", text: t.consentStart });
      const p = matchProfile(v);
      if (!p) return setMeta({ kind: "error", text: t.chooseProfile });
      return accept("profile", p, t[p]);
    }
    if (step === "area") {
      const list: readonly string[] = AREAS[answers.profile ?? "technical"][locale];
      const low = v.toLowerCase();
      const m = list.find((o) => o.toLowerCase() === low || (v.length > 2 && o.toLowerCase().startsWith(low)));
      return accept("area", m ?? v, m ?? v);
    }
    if (step === "email" && !EMAIL_RE.test(v)) return setMeta({ kind: "error", text: t.emailBad });
    accept(step, v, v);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submitText();
    }
  }

  function edit(k: TextKey) {
    dictation.cancel();
    started.current = true;
    cvBeforeEdit.current = answers.cv;
    setEditing(k);
    setStep(k);
    setMeta(null);
    setText(answers[k]);
    push([question(k, answers)]);
  }

  function toggleMic() {
    if (dictation.listening) return dictation.stop();
    setMicInfo(true);
    setMeta(null);
    dictation.start(DICT_LANGS[dictLang].code, text.trim(), setText, (err: DictationError) =>
      setMeta({ kind: "error", text: t.mic[err] }),
    );
  }

  async function send() {
    if (sending) return;
    setSending(true);
    const [first = "", ...rest] = answers.name.trim().split(/\s+/);
    const result = await submitCareers(
      buildCareersBody({
        firstName: first,
        lastName: rest.join(" "),
        email: answers.email,
        address: answers.place,
        profile: answers.profile ?? "technical",
        area: answers.area,
        about: answers.sentence,
        link: answers.link,
        proud: answers.proud,
        extra: answers.extra,
        cv: answers.cv,
      }),
    );
    setSending(false);
    if (result.ok) {
      started.current = true;
      setStep("sent");
    } else {
      setPopup({ type: "fail", title: t.failTitle, message: result.error || t.failMsg });
    }
  }

  // Keep the newest message in view inside the chat's own scroll box.
  useEffect(() => {
    const el = threadRef.current;
    if (!el || !started.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [log.length, step]);

  // Free-text questions take focus; the button-only steps don't, so picking an
  // option on a phone doesn't open the keyboard.
  useEffect(() => {
    if (started.current && !["profile", "area"].includes(step) && isTextStep(step)) {
      taRef.current?.focus({ preventScroll: true });
    }
  }, [step, editing]);

  // Auto-growing textarea (up to 160px).
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [text, step]);

  const lastQ = log.findLastIndex((i) => i.kind === "q");
  const done = step === "summary" || step === "sent";
  const pct = Math.round((FLOW.indexOf(editing ? "summary" : step) / (FLOW.length - 1)) * 100);
  const placeholder =
    editing ? t.phEdit : step === "profile" || step === "area" ? t.phPick : step === "extra" ? t.phExtra : t.phAnswer;
  const areaList: readonly string[] = AREAS[answers.profile ?? "technical"][locale];

  const rows: { key: AnswerKey; value: string; editable: boolean }[] = [
    { key: "profile", value: answers.profile ? t[answers.profile] : "", editable: false },
    { key: "area", value: answers.area, editable: false },
    ...TEXT_ORDER.map((key) => ({ key, value: answers[key], editable: true })),
    { key: "cv", value: answers.cv?.name ?? "", editable: true },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div
          ref={threadRef}
          role="log"
          aria-live="polite"
          className="max-h-[min(60svh,560px)] overflow-y-auto overscroll-contain pr-2.5 pb-7 [scrollbar-width:thin]"
        >
          {log.map((it, i) => {
            const old = done || i < lastQ;
            const key = `${epoch}-${it.id}`;
            if (it.kind === "f") {
              return (
                <div key={key} className={cn("chat-in mt-3 transition-opacity duration-400", old && "opacity-50")}>
                  <FileChip name={it.name} size={it.size} />
                </div>
              );
            }
            if (it.kind === "a") {
              return (
                <p
                  key={key}
                  className={cn(
                    "chat-in mt-8 font-display text-[clamp(24px,calc(var(--cqi)*2.6),34px)] leading-[1.1] font-semibold tracking-[-0.025em] break-words text-brand transition-opacity duration-400",
                    old && "opacity-50",
                  )}
                >
                  {it.text}
                </p>
              );
            }
            return (
              <div
                key={key}
                className={cn(
                  "chat-in mt-5 max-w-[62ch] text-[17px] text-ink transition-opacity duration-400",
                  it.typing && "chat-typing",
                  old && "opacity-50",
                )}
              >
                <p>{t.q[it.step]({ who: it.who, profile: it.profile })}</p>
                {it.step === "profile" && step === "profile" ? (
                  <p className="t-tag mt-2.5 text-body">{t.meta}</p>
                ) : null}
              </div>
            );
          })}

          {step === "profile" || step === "area" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {(step === "profile" ? (["technical", "nontechnical"] as const) : areaList).map((o, i) => {
                // After going back, the option chosen before stays highlighted.
                const was = step === "profile" ? answers.profile === o : answers.area === o;
                return (
                  <button
                    key={o}
                    type="button"
                    aria-current={was || undefined}
                    className={cn(pill, "chat-opt", was && "border-brand text-brand")}
                    style={{ "--i": i } as React.CSSProperties}
                    onClick={() =>
                      step === "profile" ? pickProfile(o as Profile) : accept("area", o, o)
                    }
                  >
                    {step === "profile" ? t[o as Profile] : o}
                  </button>
                );
              })}
            </div>
          ) : null}

          {step === "extra" && !answers.cv ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className={cn(pill, "chat-opt")} onClick={() => accept("extra", "", t.nothingElse)}>
                {t.skip}
              </button>
            </div>
          ) : null}

          {step === "summary" ? (
            <div className="chat-in mt-5 text-[17px] text-ink">
              <p>{t.q.summary()}</p>
              <dl className="mt-5 overflow-hidden rounded-2xl border border-line-strong">
                {rows.map((row) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-[150px_minmax(0,1fr)_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 max-[601px]:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <dt className="text-[13.5px] text-body max-[601px]:col-span-full">{t.labels[row.key]}</dt>
                    <dd className="m-0 text-[16px] break-words">{row.value || "—"}</dd>
                    {row.editable ? (
                      <Button
                        variant="outline"
                        size="mini"
                        icon={null}
                        aria-label={`${t.edit}: ${t.labels[row.key]}`}
                        onClick={() => edit(row.key === "cv" ? "extra" : (row.key as TextKey))}
                      >
                        {t.edit}
                      </Button>
                    ) : (
                      <span />
                    )}
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={send} disabled={sending}>
                  {sending ? t.sending : t.send}
                </Button>
                <Button variant="outline" icon={null} onClick={() => reset()} disabled={sending}>
                  {t.again}
                </Button>
              </div>
            </div>
          ) : null}

          {step === "sent" ? (
            <div className="chat-in mt-8 flex flex-col items-start gap-3.5">
              <div className="flex size-14 motion-safe:animate-[pop_0.4s_cubic-bezier(.2,.7,.2,1.4)] items-center justify-center rounded-full border border-brand text-[24px] text-brand">
                ✓
              </div>
              <h2 className="t-h2s text-[clamp(28px,calc(var(--cqi)*3),40px)]">{t.okTitle}</h2>
              <p className="text-[16px] leading-[1.5] text-body">{t.okMsg(answers.name, answers.email)}</p>
              <ButtonLink href={r.about} variant="outline">
                {t.team}
              </ButtonLink>
            </div>
          ) : null}
        </div>

        {isTextStep(step) ? (
          <div className="sticky bottom-0 z-[5] bg-linear-to-b from-transparent to-canvas to-30% pt-6 pb-3">
            <div
              role="progressbar"
              aria-label={t.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className="mb-2.5 h-0.5 overflow-hidden rounded-full bg-line"
            >
              <i
                className="block h-full bg-brand transition-[width] duration-400 ease-brand"
                style={{ width: `${pct}%` }}
              />
            </div>
            {step === "extra" && answers.cv ? (
              <div className="mb-2">
                <FileChip name={answers.cv.name} onRemove={removeFile} removeLabel={t.removeFile} />
              </div>
            ) : null}
            <div className="flex items-end gap-2.5 rounded-[20px] border border-line-strong bg-card p-2 transition-[border-color,box-shadow] duration-200 focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(30,94,86,0.16)] max-[520px]:gap-1.5 max-[520px]:p-1.5">
              <button
                type="button"
                aria-label={t.back}
                title={t.backTitle}
                disabled={step === "profile" && !editing}
                onClick={goBack}
                className={cn(iconBtn, "border-line-strong text-ink hover:not-disabled:-translate-y-0.5 hover:not-disabled:border-brand disabled:cursor-not-allowed disabled:opacity-35")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <label htmlFor="c-input" className="sr-only">
                {t.yourAnswer}
              </label>
              <textarea
                id="c-input"
                ref={taRef}
                rows={1}
                value={text}
                placeholder={placeholder}
                onChange={(e) => {
                  // Typing takes over from dictation (also from a stopped one
                  // still delivering its last words); otherwise the next
                  // recognized phrase would overwrite what was typed.
                  dictation.cancel();
                  setText(e.target.value);
                  if (meta?.kind === "error") setMeta(null);
                }}
                onKeyDown={onKeyDown}
                className="max-h-40 min-h-11 min-w-0 flex-1 resize-none border-0 bg-transparent px-1 py-[11px] font-sans text-[16px] text-ink outline-none placeholder:text-faint max-[520px]:min-h-[38px] max-[520px]:py-2"
              />
              {step === "extra" ? (
                <>
                  <input
                    ref={fileRef}
                    type="file"
                    accept={FILE_ACCEPT}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.currentTarget.files?.[0];
                      e.currentTarget.value = "";
                      pickFile(f);
                    }}
                  />
                  <button
                    ref={attRef}
                    type="button"
                    aria-label={t.attach}
                    title={t.attach}
                    onClick={() => fileRef.current?.click()}
                    className={cn(
                      iconBtn,
                      "hover:-translate-y-0.5 hover:border-brand",
                      answers.cv ? "border-brand text-brand" : "border-line-strong text-ink",
                    )}
                  >
                    <ClipIcon className="size-[18px]" />
                  </button>
                </>
              ) : null}
              <button
                type="button"
                aria-label={t.dictate}
                title={t.dictateTitle}
                aria-pressed={dictation.listening}
                onClick={toggleMic}
                className={cn(
                  iconBtn,
                  "relative",
                  dictation.listening
                    ? "border-brand bg-brand text-canvas after:absolute after:-inset-[5px] after:animate-mic after:rounded-[18px] after:border-2 after:border-brand after:content-[''] motion-reduce:after:animate-none"
                    : "border-line-strong text-ink hover:-translate-y-0.5 hover:border-brand",
                )}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={t.sendAnswer}
                disabled={!(text.trim() || (step === "extra" && answers.cv))}
                onClick={submitText}
                className="size-11 shrink-0 rounded-[14px] bg-ink text-[18px] max-[520px]:size-[38px] font-bold text-canvas transition-[transform,background-color] duration-150 hover:not-disabled:-translate-y-0.5 active:not-disabled:scale-[0.94] disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-body"
              >
                ↑
              </button>
            </div>

            <div className="mt-2.5 px-2 text-center text-[13.5px] text-body">
              {meta ? (
                <span
                  role={meta.kind === "error" ? "alert" : "status"}
                  className={cn("mb-1.5 block", meta.kind === "error" && "text-err")}
                >
                  {meta.text}
                </span>
              ) : null}
              {micInfo ? (
                <span className="mb-1.5 block text-[13px]">
                  {t.micInfo}{" "}
                  <Link href={r.privacy} className="underline underline-offset-2">
                    {t.privacy}
                  </Link>
                </span>
              ) : null}
              {/* Shown with the dictation notice, once the mic has been pressed, so
                  the sticky footer stays short for people who only type. */}
              {canDictate && micInfo ? (
                <div role="group" aria-label={t.dictLang} className="mb-1.5 flex flex-wrap items-center justify-center gap-x-2">
                  <span className="text-[13px]">{t.dictLang}</span>
                  {(Object.keys(DICT_LANGS) as Locale[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      lang={l}
                      aria-pressed={dictLang === l}
                      onClick={() => {
                        if (dictLang === l) return;
                        dictation.cancel();
                        setDictLang(l);
                      }}
                      className={cn(
                        // 44px target; the negative margin keeps the line compact.
                        "-my-1 inline-flex min-h-11 items-center rounded-full border px-3 text-[13px] transition-colors duration-200",
                        dictLang === l ? "border-brand text-brand" : "border-line-strong text-body hover:border-ink hover:text-ink",
                      )}
                    >
                      {DICT_LANGS[l].label}
                    </button>
                  ))}
                </div>
              ) : null}
              <label className="flex items-start justify-center gap-3 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-[18px] shrink-0 accent-brand"
                />
                {/* Both texts share one grid cell so the label keeps the width of the
                    longer one: ticking the box swaps the text without moving the checkbox. */}
                <span className="grid">
                  <span className={cn("col-start-1 row-start-1", consent && "invisible")}>
                    {t.consent}
                  </span>
                  <span className={cn("col-start-1 row-start-1", !consent && "invisible")}>
                    {t.consentKept}
                  </span>
                </span>
              </label>
              <p className="mt-1">
                <Link href={r.privacy} className="inline-block py-1 underline underline-offset-2">
                  {t.privacy}
                </Link>
                {" · "}
                <button
                  type="button"
                  onClick={() => reset(t.deleted)}
                  className="inline-block py-1 underline underline-offset-2"
                >
                  {t.deleteIt}
                </button>
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <FormPopup popup={popup} closeLabel={t.close} onClose={closePopup} />
    </>
  );
}
