"use client";

// "Skip to content": hidden above the viewport until focused, then moves the
// focus to the page's H1 (spec §4.1) and scrolls past the header.
export default function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      onClick={(e) => {
        const target =
          document.querySelector<HTMLElement>("main h1") ??
          document.getElementById("main");
        if (!target) return;
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.focus();
        target.scrollIntoView({ block: "start" });
      }}
      className="absolute -top-[60px] left-4 z-[200] rounded-full bg-ink px-4 py-2 text-[14px] text-canvas transition-[top] duration-200 focus:top-2"
    >
      {label}
    </a>
  );
}
