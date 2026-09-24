"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import {
  CircleCheckIcon,
  CircleXmarkIcon,
  XmarkIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type PopupState = {
  type: "ok" | "fail";
  title: string;
  message: string;
} | null;

// Result dialog shown after a form submission (was built imperatively by
// contact-form.js). Closes on the button, a click on the backdrop, or Escape;
// success messages also auto-close after 5s. Portalled to <body> so it's
// never clipped or hidden by a transformed/faded ancestor (the forms sit
// inside scroll-reveal wrappers).
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
    const timer =
      popup?.type === "ok" ? setTimeout(onClose, 5000) : undefined;
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
        "fixed inset-0 z-99999 flex items-center justify-center bg-black/55 p-5 transition-[opacity,visibility] duration-250 ease-in-out",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div
        className={cn(
          "w-full max-w-[420px] rounded-lg bg-white px-10 pt-12 pb-10 text-center transition-transform duration-250 ease-in-out",
          open ? "translate-y-0" : "translate-y-6",
        )}
      >
        <div
          className={cn(
            "mb-5 text-[56px] leading-none",
            popup?.type === "fail" ? "text-[#e55353]" : "text-mint",
          )}
        >
          {popup?.type === "fail" ? <CircleXmarkIcon /> : <CircleCheckIcon />}
        </div>
        <h4 className="mb-3 text-[24px] leading-[1.2] font-bold text-ink">{popup?.title}</h4>
        <p className="mb-7 text-[18px] text-body">{popup?.message}</p>
        <Button onClick={onClose} icon={<XmarkIcon />} className="border-none">
          {closeLabel}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
