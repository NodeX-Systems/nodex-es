"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type PopupState = {
  type: "ok" | "fail";
  title: string;
  message: string;
} | null;

// Result dialog shown after a form submission. Closes on the button, a click
// on the backdrop or Escape; success also auto-closes after 5s. Portalled to
// <body> so no transformed ancestor can clip it.
const subscribe = () => () => {};

export default function FormPopup({
  popup,
  closeLabel,
  onClose,
}: {
  popup: PopupState;
  closeLabel: string;
  onClose: () => void;
}) {
  const open = popup !== null;
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const timer = popup?.type === "ok" ? setTimeout(onClose, 5000) : undefined;
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [open, popup?.type, onClose]);

  if (!isClient) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "fixed inset-0 z-[300] flex items-center justify-center bg-void-dark/60 p-5 transition-[opacity,visibility] duration-250",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div
        className={cn(
          "w-full max-w-[420px] rounded-[20px] border border-line-strong bg-card px-8 pt-10 pb-8 text-center transition-transform duration-250",
          open ? "translate-y-0" : "translate-y-6",
        )}
      >
        <div
          className={cn(
            "mx-auto mb-5 flex size-12 items-center justify-center rounded-full text-[22px] text-white",
            popup?.type === "fail" ? "bg-err" : "bg-brand",
          )}
        >
          {popup?.type === "fail" ? "!" : "✓"}
        </div>
        <h3 className="t-h2s text-[26px]">{popup?.title}</h3>
        <p className="mt-3 mb-7 text-[16px] leading-[1.5] text-body">{popup?.message}</p>
        <Button onClick={onClose} icon={null}>
          {closeLabel}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
