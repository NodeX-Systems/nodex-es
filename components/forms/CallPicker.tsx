"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { OPTIONAL_ENDPOINTS } from "@/lib/constants";
import type { Locale } from "@/lib/routes";

// Time picker shown after the contact form is sent (spec §4.7): the next five
// business days, four slots a day, Madrid time. It only renders when a
// booking endpoint exists (OPTIONAL_ENDPOINTS.booking + FEATURES.callBooking),
// so it never pretends to book anything.
const TIMES = ["09:30", "11:00", "13:00", "16:30"] as const;

const COPY = {
  en: {
    title: "Pick a time for the call",
    tz: "Madrid time (CET)",
    confirm: "Confirm time",
    confirming: "Confirming…",
    booked: (when: string, email: string) =>
      `Booked: ${when} CET. A calendar invite is on its way to ${email}.`,
    error: "We couldn’t book that slot. Try another one, or reply to our email.",
    day: "Day",
    time: "Time",
  },
  es: {
    title: "Elige una hora para la llamada",
    tz: "Hora de Madrid (CET)",
    confirm: "Confirmar hora",
    confirming: "Confirmando…",
    booked: (when: string, email: string) =>
      `Reservada: ${when} CET. Te llega una invitación de calendario a ${email}.`,
    error: "No hemos podido reservar esa hora. Prueba con otra o responde a nuestro email.",
    day: "Día",
    time: "Hora",
  },
} as const;

function nextBusinessDays(count: number) {
  const days: Date[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
  }
  return days;
}

export default function CallPicker({
  locale,
  email,
  payload,
  onBooked,
}: {
  locale: Locale;
  email: string;
  payload: Record<string, unknown>;
  onBooked?: () => void;
}) {
  const t = COPY[locale];
  const days = useMemo(() => nextBusinessDays(5), []);
  const fmtShort = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" });
  const fmtLong = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" });
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "booked" | "error">("idle");
  const [label, setLabel] = useState("");

  async function confirm() {
    if (day === null || !time || !OPTIONAL_ENDPOINTS.booking) return;
    const date = days[day];
    const when = `${fmtLong.format(date)} · ${time}`;
    setState("sending");
    try {
      const res = await fetch(OPTIONAL_ENDPOINTS.booking, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          date: date.toISOString().slice(0, 10),
          time,
          timezone: "Europe/Madrid",
        }),
      });
      if (!res.ok) throw new Error("booking failed");
      track("call_booked", { when });
      setLabel(when);
      setState("booked");
      onBooked?.();
    } catch {
      setState("error");
    }
  }

  if (state === "booked") {
    return (
      <p role="status" className="mt-6 rounded-xl border border-(--f-border) px-4 py-3 text-[15px] leading-[1.5] text-(--f-text)">
        {t.booked(label, email)}
      </p>
    );
  }

  const pill = (active: boolean) =>
    cn(
      "h-11 rounded-full border px-[18px] text-[15px] font-medium transition-colors duration-200 active:scale-[0.96]",
      active
        ? "border-(--f-text) bg-(--f-text) text-canvas min-[901px]:text-void-dark"
        : "border-(--f-border) text-(--f-text) hover:border-(--f-text)",
    );

  return (
    <div className="mt-6 text-left">
      <p className="text-[15px] font-medium text-(--f-text)">{t.title}</p>
      <p className="t-tag mt-1 text-(--f-muted)">{t.tz}</p>
      <div role="group" aria-label={t.day} className="mt-4 flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button key={i} type="button" aria-pressed={day === i} onClick={() => setDay(i)} className={pill(day === i)}>
            {fmtShort.format(d)}
          </button>
        ))}
      </div>
      <div role="group" aria-label={t.time} className="mt-3 flex flex-wrap gap-2">
        {TIMES.map((slot) => (
          <button key={slot} type="button" aria-pressed={time === slot} onClick={() => setTime(slot)} className={pill(time === slot)}>
            {slot}
          </button>
        ))}
      </div>
      {state === "error" ? (
        <p role="alert" className="mt-3 text-[14px] text-(--f-err)">
          {t.error}
        </p>
      ) : null}
      <div className="mt-5">
        <Button
          disabled={day === null || !time || state === "sending"}
          onClick={confirm}
          className="min-[901px]:bg-paper-dark min-[901px]:text-void-dark"
        >
          {state === "sending" ? t.confirming : t.confirm}
        </Button>
      </div>
    </div>
  );
}
